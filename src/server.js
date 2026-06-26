require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '5521999999999';

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

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Arquivos estáticos servidos de: public/`);
});

module.exports = app;
