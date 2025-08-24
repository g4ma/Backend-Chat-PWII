## Executando o projeto

Para executar o backend desse projeto (este repositório), execute os seguintes passos:

1. Baixa as depêndencias node com `npm i`
2. Crie o arquivo `.env` e configure com:

```
DATABASE_URL="file:./dev.db"
PORT=3000
```

3. Dê o comando `npx prisma migrate dev --name init` para iniciar o banco com o prisma
4. Por fim, rode `npm run dev` para iniciar o servidor

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
