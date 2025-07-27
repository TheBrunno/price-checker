# Price Checker 📊

Um sistema de monitoramento de preços de notebooks desenvolvido para fins de estudo e aprendizado. O projeto permite cadastrar produtos para monitoramento, executar verificações periódicas de preços e receber notificações quando os valores atingem um preço desejado.

## ⚠️ Disclaimer

**Este projeto foi desenvolvido exclusivamente para fins educacionais e de estudo.** O objetivo é aprender sobre desenvolvimento web, web scraping, APIs e bancos de dados. O projeto não visa violar os termos de uso de nenhuma loja online ou implementar técnicas anti-CAPTCHA. Todas as práticas utilizadas são para fins de aprendizado e demonstração de conceitos de programação.

## 🏗️ Arquitetura do Projeto

O projeto está dividido em três componentes principais:

- **Scraper** (`/scraper`): Script Python responsável por fazer as verificações de preços
- **Backend** (`/server`): API REST em Node.js para gerenciar dados e comunicação
- **Frontend** (`/web`): Interface web em React para cadastro e visualização de produtos

## 🛠️ Tecnologias Utilizadas

### Backend (Server)
- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Linguagem tipada
- **Drizzle ORM** - ORM para MySQL
- **MySQL2** - Driver MySQL
- **Zod** - Validação de schemas
- **CORS** - Middleware para requisições cross-origin

### Frontend (Web)
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **TanStack Query** - Gerenciamento de estado e cache
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones
- **Day.js** - Manipulação de datas

### Scraper
- **Python** - Linguagem principal
- **Requests** - Biblioteca HTTP
- **BeautifulSoup4** - Parser HTML
- **MySQL Connector** - Conexão com banco de dados
- **Python-dotenv** - Gerenciamento de variáveis de ambiente

### Banco de Dados
- **MySQL** - Sistema de gerenciamento de banco de dados

### Outras Ferramentas
- **Telegram Bot API** - Notificações
- **Git** - Controle de versão

## 📋 Pré-requisitos

- Node.js 18+ 
- Python 3.8+
- MySQL 8.0+
- Git

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/theBrunno/price-checker.git
cd price-checker
```

### 2. Configure o banco de dados
```bash
# Acesse o MySQL e crie o banco de dados
mysql -u root -p
CREATE DATABASE price_checker;
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
# Database
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=price_checker
DATABASE_URL=mysql://seu_usuario:sua_senha@localhost:3306/price_checker

# Telegram Bot (opcional)
TELEGRAM_BOT_TOKEN=seu_token_do_bot
TELEGRAM_CHAT_ID=seu_chat_id
```

### 4. Instale as dependências do Backend
```bash
cd server
npm install
```

### 5. Execute as migrações do banco de dados
```bash
npm run db:generate
npm run db:migrate
```

### 6. Instale as dependências do Frontend
```bash
cd ../web
npm install
```

### 7. Instale as dependências do Python
```bash
cd ../scraper
pip install requests beautifulsoup4 mysql-connector-python python-dotenv
```

## 🏃‍♂️ Como Executar

### 1. Inicie o Backend
```bash
cd server
npm run dev
```
O servidor estará disponível em `http://localhost:3000`

### 2. Inicie o Frontend
```bash
cd web
npm run dev
```
A aplicação estará disponível em `http://localhost:5173`

### 3. Execute o Scraper
```bash
cd scraper
python monitor.py
```

## 📱 Funcionalidades

- **Cadastro de Produtos**: Adicione notebooks para monitoramento
- **Monitoramento Automático**: Verificação periódica de preços
- **Notificações**: Alertas via Telegram quando o preço atinge o valor desejado
- **Histórico**: Visualização do histórico de preços (Ainda não implementada)
- **Interface Responsiva**: Interface web moderna e responsiva (Ainda não implementada)

## 🔧 Configuração do Telegram Bot (Opcional)

Para receber notificações via Telegram:

1. Crie um bot no Telegram através do @BotFather
2. Obtenha o token do bot
3. Adicione o token no arquivo `.env`
4. Obtenha seu Chat ID e adicione no `.env`

## 📁 Estrutura do Projeto

```
price-checker/
├── server/          # Backend Node.js + Fastify
├── web/            # Frontend React + Vite
├── scraper/        # Script Python de monitoramento
├── db/             # Scripts de banco de dados
└── README.md
```

**Desenvolvido com ❤️ para fins de estudo e aprendizado**