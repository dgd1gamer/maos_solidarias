# 🤝 Mãos Solidárias: Eventos e ONGs sobre Desastres Naturais

> **Aplicação Web voltada a centralizar informações, eventos, notícias e ONGs relacionados à prevenção e resposta a desastres naturais.**

[![Tecnologias](https://img.shields.io/badge/Tecnologias-React%2C%20Node.js%2C%20MongoDB-blue)](TECNOLOGIAS)
[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](link_para_kanban_ou_issues)

---

## 💡 Contexto do Projeto

Este projeto está sendo desenvolvido no âmbito do:

* **CURSO:** Técnico em Desenvolvimento de Sistemas - IFPI.
* **DISCIPLINA:** Projeto: Aplicações Web.
* **SEMESTRE:** 02/2025

### 🎯 Propósito e Problema

O **Mãos Solidárias** busca atuar como um *hub* de informações cruciais para a comunidade. Nossa missão é facilitar o acesso rápido e organizado a recursos vitais em momentos de necessidade, além de promover a prevenção e o apoio contínuo.

O projeto resolve o desafio de **dispersão de informações** ao centralizar:

* **Notícias e Alertas:** Informações em tempo real sobre ocorrências e desastres naturais.
* **Eventos:** Divulgação de campanhas de arrecadação, treinamentos de prevenção e ações voluntárias.
* **Organizações (ONGs):** Cadastro e localização de entidades confiáveis que oferecem apoio e recebem doações ou voluntários.

---

## 💻 Tecnologias Utilizadas

O desenvolvimento desta aplicação Full Stack utiliza as seguintes ferramentas:

* **Frontend:** **React** (para interfaces dinâmicas), HTML5, CSS3 e JavaScript (ES6+).
* **Backend:** **Node.js** com **Express** (para a API Restful).
* **Banco de Dados:** **MongoDB** (NoSQL).
* **Controle de Versão:** Git e GitHub.

---

## 👥 Equipe e Orientação

### Integrante(s)

* **Celso Nunes Soares** - (https://github.com/celsonunessoares)

### Orientador

* **Professor:** Francisco Eduardo Pires de Morais

---

## 🚀 Como Rodar o Projeto (Instruções de Utilização)

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

* **Node.js** (v18+ recomendado)
* **npm** (ou **Yarn**)
* Acesso a uma instância do **MongoDB**.

### ⚙️ Configuração e Execução

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/celsonunessoares/maos_solidarias.git](https://github.com/celsonunessoares/maos_solidarias.git)
    cd maos_solidarias
    ```

2.  **Configuração de Variáveis de Ambiente:**
    * Crie um arquivo chamado **`.env`** no diretório principal.
    * Adicione sua string de conexão e outras configurações:
        ```env
        PORT=3001
        MONGODB_URI="sua_string_de_conexao_do_mongodb"
        REACT_APP_API_URL="http://localhost:3001"
        ```

3.  **Instale as dependências e Inicie a Aplicação:**
    * **Backend:** (Ajuste o caminho se o servidor estiver em uma pasta específica, como `backend/`)
        ```bash
        npm install 
        npm start # Inicia o servidor Node.js
        ```
    * **Frontend (React):** (Ajuste o caminho se o React estiver em uma pasta específica, como `frontend/`)
        ```bash
        # Se for um monorepo, pode ser necessário rodar em outra pasta
        # cd frontend/
        # npm install
        # npm start # Inicia a aplicação React (geralmente em http://localhost:3000)
        ```

---

## 📚 Documentação e Contribuição

### Documentação

A documentação ainda não está completa, mas será eventualmente enviada à este repositório. Ela incluirá diagramas de arquitetura, modelos de dados e guias de API.

### Como Contribuir

Contribuições são bem-vindas! Se deseja colaborar, siga nosso fluxo padrão: Fork, Branch, Commit e Pull Request.

---