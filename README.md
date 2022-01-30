# Star product

## Features

- Adicionar autehnticação OTP com keycloak
- Adicionar cache nos endpoints de listagem
- Adicionar testes de integração
- Melhorar e adicionar exemplos de respostas no Postman


## O que é ?
Está é uma API para favoritar produtos a partir de uma lista de produtos já existentes

## Autenticação
Para esse projeto foi utilizado o modelo de autenticação passwordless, esse modelo consiste em enviar um token (Utilizei uuid apenas para fins de desenvolvimento) para um endereço de e-mail gerando um "Magick link", para assim finalmente gerar as credenciais de acesso.
Utilizei a criação de um "token" e um "refresh token" para que o fluxo "passwordless" seja utilizado APENAS quando perder o prazo de validade da autenticação.
 - O token criado tanto para autenticação quanto para renovação é um JWT
 - Para que possa testar o fluxo sugiro criar uma caixa de email no [Ethereal](ethereal.email) (Para fins de desenvolvimento foi utilizado o node-mailer)

## Installation

```sh
npm i
make dev
"Deve-se criar o banco no postgres com o nome de: star-product-database"
npm run migrate
```

## Postman (Exemplo)
 - [Drive com postman](https://drive.google.com/file/d/1VJt-B7VdufJ0V1Pc9E06dCnId1fCr3oE/view?usp=sharing)

**Free Software!**
