let nodemailer;

try {
  nodemailer = require('nodemailer');
} catch (error) {
  nodemailer = null;
}

class EmailService {
  constructor({ transporter = null, fromAddress = null, toAddress = null, replyToAddress = null } = {}) {
    this.transporter = transporter ?? this.createTransporter();
    this.fromAddress = fromAddress || process.env.EMAIL_FROM || 'contato@ferroealma.com.br';
    this.toAddress = toAddress || process.env.EMAIL_TO || 'contato@ferroealma.com.br';
    this.replyToAddress = replyToAddress || process.env.EMAIL_REPLY_TO || this.fromAddress;
  }

  createTransporter() {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_REQUIRE_TLS
    } = process.env;

    if (!nodemailer || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return null;
    }

    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === 'true',
      requireTLS: SMTP_REQUIRE_TLS !== 'false',
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
  }

  buildHtml({ name, phone, email, city, channel, message }) {
    return `
      <div style="font-family: Arial, sans-serif; color: #1C1A17; line-height: 1.6;">
        <h2 style="color: #B8955A; margin-bottom: 12px;">Novo interesse de revendedor</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>WhatsApp:</strong> ${phone}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Cidade:</strong> ${city}</p>
        <p><strong>Canal:</strong> ${channel}</p>
        <p><strong>Mensagem:</strong> ${message || '—'}</p>
      </div>
    `;
  }
 
  async sendResellerInterestEmail({ name, phone, email, city, channel, message }) {
    if (!this.transporter) {
      console.warn('SMTP não configurado. O e-mail não foi enviado.');
      return { ok: false, skipped: true, reason: 'SMTP not configured' };
    }

    const result = await this.transporter.sendMail({
      from: this.fromAddress,
      to: this.toAddress,
      replyTo: this.replyToAddress === this.fromAddress ? email : this.replyToAddress,
      subject: `Novo interesse de revendedor - ${name}`,
      text: [
        `Novo interesse de revendedor`,
        `Nome: ${name}`,
        `WhatsApp: ${phone}`,
        `E-mail: ${email}`,
        `Cidade: ${city}`,
        `Canal: ${channel}`,
        `Mensagem: ${message || '—'}`
      ].join('\n'),
      html: this.buildHtml({ name, phone, email, city, channel, message })
    });

    return { ok: true, messageId: result.messageId };
  }
}

module.exports = { EmailService };
