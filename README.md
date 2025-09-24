# Mini Payments API
**Stack**: Node.js · Express · Sequelize · MariaDB · JWT

Uma API de pagamentos desenvolvida como projeto de portfólio, simulando o fluxo real de um sistema financeiro.

## 🚀 Principais funcionalidades
- 👤 **Autenticação segura** com JWT + refresh token e hash de senhas com bcrypt.  
- 🔑 **Controle de acesso por papéis** (admin vs cliente).  
- 🛒 **Gerenciamento de pedidos** (criação, atualização e finalização).  
- 💳 **Transações financeiras** ligadas a pedidos e usuários, com múltiplos status (`pending`, `approved`, `rejected`).  
- 🔎 **Consulta de histórico de transações** com restrição por usuário (clientes veem apenas suas próprias, admins veem todas).  
- 🗄️ **Banco relacional** (MariaDB) com Sequelize, incluindo relacionamentos entre entidades.

## 📦 Extras implementados
- Middleware de autenticação para proteger rotas sensíveis.  
- Estrutura modularizada de rotas, middlewares e models.  
- Uso do Sequelize para sincronizar models com o banco de forma automática.  

## 🔮 Possíveis melhorias futuras
- Filtros e paginação nas consultas.  
- Testes automatizados (Jest).  
- Documentação da API com Swagger.  
- Deploy em ambiente cloud (Heroku, Render, Railway).