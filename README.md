# API Movies - Projeto de Teste QA

![Badges em breve](https://img.shields.io/badge/status-em%20desenvolvimento-green)
![Badges em breve](https://img.shields.io/badge/versão-1.0.0-blue)

## 📝 Sobre o Projeto

Este projeto é uma suíte de testes de Qualidade para a API [nestjs-cinema](https://github.com/juniorschmitz/nestjs-cinema), desenvolvida como parte do desafio final do Programa de Bolsas Compass UOL na área de QA. O projeto original foi desenvolvido por Jacques Schmitz Junior e esta versão apresenta adaptações e melhorias nos testes.

### 🎯 Objetivos do Projeto
- Implementar testes abrangentes da API utilizando diversas tecnologias e abordagens
- Solucionar e corrigir problemas críticos, como a funcionalidade de busca na rota de Tickets
- Aplicar conhecimentos e habilidades adquiridos durante a Sprint
- Fornecer cobertura completa de testes para o sistema de reservas de cinema

### 🛠️ Tecnologias Utilizadas

- **Mocha**: Framework de testes unitários
- **Cypress**: Framework de testes end-to-end
- **Playwright**: Framework moderno de testes web
- **NestJS**: Framework backend
- **Swagger**: Documentação da API
- **Node.js**: Ambiente de execução
- **TypeScript**: Linguagem de programação

## 🚀 Começando

### Pré-requisitos
```json
{
    "Node.js": ">=14.x",
    "npm": ">=6.x",
    "git": "última versão"
}
```

### ⚙️ Instalação

1. Clone o repositório:
```bash
git clone [url-do-seu-repositório]
cd api-movies-qa
```

2. Instale as dependências:
```bash
npm install
```

### 🔄 Executando a Aplicação

```bash
npm run start  # Inicia a aplicação
```
> A aplicação estará disponível em: http://localhost:3000

### 🧪 Executando os Testes

```bash
# Testes Mocha
npm run test:mocha

# Testes Cypress
npx cypress open

# Testes Playwright
npx playwright test
```

## 📚 Documentação

### API Swagger
📍 Acesse a documentação em: http://localhost:3000/api/docs

### User Stories
O projeto contém duas categorias de User Stories no diretório `UserStories/`:
1. User Stories originais do autor
2. User Stories modificadas e atualizadas:
   - [US01 Movies](./UserStories/US01Movies.md) - Cenários de teste para filmes
   - [US02 Tickets](./UserStories/US02Tickets.md) - Cenários de teste para ingressos

## 📁 Estrutura dos Testes
```
project-root/
│
├── cypress/                         # Testes Cypress
│   ├── e2e/                        
│   │   ├── fedextour.cy.ts
│   │   └── moneytour.cy.ts
│   ├── fixtures/                   # Dados de teste
│   └── support/                    # Configurações
│
├── mocha/                          # Testes Mocha
│   ├── movies.controller.duplicate.spec.ts
│   ├── tickets.controller.duplicate.spec.ts
│   └── tickets.controller.findOne.spec.ts
│
├── playwright/                     # Testes Playwright
│   ├── tests/
│   │   ├── backalleytour.spec.ts
│   │   └── garbage.spec.ts
│   └── playwright.config.ts
│
├── UserStories/                    # Documentação
│   ├── US01Movies.md
│   ├── US02Tickets.md
│   └── UserStories Antigas
│
└── src/                           # Código fonte
```

## 👥 Autores

### 🎯 Projeto Original
**Jacques Schmitz Junior**
- 💻 QA Automation Developer
- 🔧 IoT Solutions Developer
- 🎮 Horror Games Lover
- 📍 Pelotas - RS
- 📧 juniorschmitz9@gmail.com
- 🏢 Compasso UOL

### 🔍 Adaptação e Testes
**Marcus Vinícius Molina Freitas**
- 📚 Estudante de Engenharia de Software - UTFPR Cornélio Procópio
- 🏢 Estagiário QA na Compass UOL
- 🌟 Foco em Qualidade e Automação de Testes

## 📌 Recursos Adicionais

Para mais informações sobre a estratégia de testes e detalhes de implementação, visite o [repositório principal de testes](https://gitlab.com/compass.uol3/testeapimovies).

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---
*Desenvolvido como parte do Programa de Bolsas Compass UOL em Quality Assurance, 2024.*