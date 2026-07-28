const test = require('node:test');
const assert = require('node:assert/strict');
const { EmailService } = require('./emailService');

test('envia e-mail de interesse com os dados do revendedor', async () => {
  const sent = [];
  const service = new EmailService({
    transporter: {
      sendMail: async (options) => {
        sent.push(options);
        return { messageId: 'test-id' };
      }
    }
  });

  await service.sendResellerInterestEmail({
    name: 'Ana Souza',
    phone: '(21) 99999-0000',
    email: 'ana@example.com',
    city: 'Rio de Janeiro - RJ',
    channel: 'Loja física',
    message: 'Quero conhecer o catálogo.'
  });

  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'contato@ferroealma.com.br');
  assert.equal(sent[0].replyTo, 'ana@example.com');
  assert.match(sent[0].subject, /Novo interesse de revendedor/i);
  assert.match(sent[0].text, /Ana Souza/);
  assert.match(sent[0].html, /Quero conhecer o catálogo\./);
});
