console.log('====================================');
console.log('SERVER.JS FOI CARREGADO');
console.log('WHATSAPP_NUMBER:', process.env.WHATSAPP_NUMBER);
console.log('====================================');

require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { EmailService } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3001;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;
const emailService = new EmailService();

console.log('WHATSAPP_NUMBER ====>', process.env.WHATSAPP_NUMBER);

app.use(express.json());

// Middleware para injetar variáveis de ambiente no HTML
app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
  // Injeta a variável WHATSAPP_NUMBER no script
  html = html.replace(
    'const WHATSAPP = \'5521999999999\';',
    `const WHATSAPP = '${WHATSAPP_NUMBER}';`
  );
  res.send(html);
});

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota de health check (opcional)
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Servidor rodando normalmente' });
});

app.post('/api/reseller-interest', async (req, res) => {
  try {
    const { name, phone, email, city, channel, message } = req.body || {};

    if (!name || !phone || !email || !city || !channel) {
      return res.status(400).json({ success: false, message: 'Preencha todos os campos obrigatórios.' });
    }

    const result = await emailService.sendResellerInterestEmail({
      name,
      phone,
      email,
      city,
      channel,
      message
    });

    if (!result.ok) {
      return res.status(202).json({ success: true, message: 'Interesse recebido, mas o e-mail não foi enviado por falta de configuração SMTP.' });
    }

    return res.json({ success: true, message: 'Interesse enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar interesse:', error);
    return res.status(500).json({ success: false, message: 'Não foi possível enviar o interesse no momento.' });
  }
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});



// Executa o servidor apenas localmente
if (require.main === module) {
  app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Arquivos estáticos servidos de: public/`);
  });
}


module.exports = app;
