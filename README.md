# Aplicação Webchat
## Programação para web II 2025.1

## Sumário

- [Equipe](#equipe)
- [Descrição da Atividade](#descrição-da-atividade)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Executando o projeto](#executando-o-projeto)
- [Documentação](#documentacao)

## Equipe

- [Gabriella](https://github.com/gabs44)
- [Maria Clara](https://github.com/marysclair)
- [Maurício](https://github.com/maueici0)

## Descrição da Atividade

Este repositório contém o backend da aplicação WebChat, desenvolvida como parte da disciplina de Programação para Web II, com o objetivo de demonstrar na prática os principais conceitos estudados. O frontend dessa aplicação pode ser acessado [aqui](https://github.com/g4ma/Frontend-Chat-PWII)

## Tecnologias Utilizadas

O projeto foi desenvolvido usando o framework express, a linguagem escolhida foi o TypeScript, que oferece tipagem estática e maior segurança no desenvolvimento em comparação ao JavaScript puro. A funcionalidade pricipal de chat foi desenvolvida baseada no protocolo WebSocket, tendo sido utilizada a biblioteca socket.io para abstrair a implementação. Para a funcionalidade de Push Notifications foi utilizada a biblioteca web-push. Para o gerenciamento eficiente das inscrições de notificações, optou-se pelo uso do Redis, banco de dados em memória que garante alta performance e escalabilidade. Para a execução do serviço do Redis foi utilizado o Docker, para facilitar ainda mais a utilização do banco. Por fim, foi utilizado o ORM Prisma para o gerenciamento do banco de dados sqlite.


## Executando o projeto

Para executar este projeto, execute os seguintes passos:

1. Baixa as depêndencias node com `npm i`
1. Dê o comando `npx prisma migrate dev --name init` para iniciar o banco com o prisma
1. Em seguida, execute o Docker Compose:

    ```docker compose up --build```
1. Por fim, execute `npm run dev` para iniciar o servidor

## Documentação

### User

| URL                    | Método | Descrição                                                                                                 |
| ---------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| /users/register/       | POST   | Recurso de criação de usuário enviando como corpo da requisição os campos "name", "username" e "password" |
| /users/login/          | POST   | Recurso de login de usuário enviando como corpo da requisição os campos "username" e "password"           |
| /users/newChat/:userId | GET    | Recurso que busca todos os usuários que você ainda não conversou, enviando como param o id do seu usário  |

### Message

| URL                          | Método | Descrição                                                                                                                                                                        |
| ---------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /messages/                   | POST   | Recurso de envio de mensagem de um usuário para outro enviando como corpo da requisição os campos "senderId", "receiverId" e "text"                                              |
| /messages/:userId/:contactId | GET    | Recurso para buscar histórico de mensagens entre dois usuários, enviando como param o id do seu usuário que está pedindo o histórico e o id do usuário do outro lado da conversa |
| /messages/contacts/:userId   | GET    | Recurso para listar contatos com quem você já conversou, enviando como param o id do seu usuário                                                                                 |
