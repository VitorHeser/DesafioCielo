Esse Projeto foi gerado com [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.30.

## FrontEnd

Em um terminal, execute o comando `npm start` na raiz do projeto, o qual iniciará o `ng serve` para rodar o servidor do frontend e o  `json-server` no arquivo de database. 

Navegue até `http://localhost:4200/` para acessar o frontend.

## Backend

Navegue até `http://localhost:3000/` para acessar o backend proveniente do arquivo `.\assets\databases\lancamento-conta-legado.json`.

Caso tenha que ser alterado a origin do backend, deve ser alterado dentro do arquivo `.\app\app.api.ts` a variável API_CONFIG que atualmente está direcionada ao endereço `http://localhost:3000/`

## Base de Dados

Para que pudesse ser utilizado a lib json-server, foi necessário a retirada dos atributos de pageable do arquivo json original.

Foi inserido alguns dados no .json original para que pudesse criar alguns insights nos dashboards principais.

![alt text](https://github.com/VitorHeser/DesafioCielo/src/assets/demo/images/exemplo/exemplo.PNG?raw=true)

## Testes Unitários

execute o comando `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).


## Ajuda

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

