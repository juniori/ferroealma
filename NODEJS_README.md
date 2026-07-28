# Ferro & Alma — Decoração Artesanal

Projeto Node.js com Express.js para servir o site da Ferro & Alma.

## 📋 Requisitos

- Node.js (versão 14.0.0 ou superior)
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd ferroealma
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```
O servidor estará disponível em `http://localhost:3000`

### Modo Produção
```bash
npm start
```


## 📦 Dependências

- **express**: Framework web para Node.js
- **nodemon** (dev): Ferramenta para auto-reload durante desenvolvimento

## 🔧 Configuração

As variáveis de ambiente podem ser configuradas no arquivo `.env`:

```env
PORT=3000
NODE_ENV=development
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor em modo produção
- `npm run dev` - Inicia o servidor em modo desenvolvimento com nodemon

## 🌐 Endpoints Disponíveis

- `GET /` - Página principal do site
- `GET /health` - Health check do servidor

## 🚀 Deploy

Para fazer deploy, certifique-se de:

1. Instalar as dependências: `npm install`
2. Configurar as variáveis de ambiente
3. Iniciar o servidor: `npm start`

## 📞 Contato

Para mais informações sobre Ferro & Alma, acesse o site ou envie uma mensagem via WhatsApp.

## 📄 Publicar no vercel
cd ~/Pessoal/git/ferroealma
rm package-lock.json
git add .
git commit -a -m "comentério xxxx"
git push

