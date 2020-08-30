## Documentação

Olá, tudo bem? :smile:

Para rodar este projeto, primeiramente precisamos instalar o Node.
Basta acessar: [https://nodejs.org/en/](https://nodejs.org/en/) e baixar a versão LTS porque é a versão mais segura e livre de bugs.

No terminal digite este comando:
```
  node -v
  // v12.18.3
```
Se o comando não funcionar, verifique se nas suas variáveis de ambiente consta o caminho para o node, se sim e ainda persistir o erro, reinicie o computador.

Como utilizamos o yarn para gerenciar os pacotes do Node.js, precisamos instala-lo, cada sistema operacional tem sua maneira, então siga o guia no site oficial do Yarn: [https://classic.yarnpkg.com/pt-BR/docs/install](https://classic.yarnpkg.com/pt-BR/docs/install).

Finalizando a instalação, verifique se foi instalado corretamente com o comando:
```
  yarn -v
  v1.22.5
```

Ok, com o Yarn instalado, podemos instalar agora as nossas dependências utlizadas no projeto de modo fácil e rápido. :zap:

Clone este repositório usando este comando:
```
  git clone https://github.com/miguelaugl/mind-dashboard.git
```

E siga as instruções abaixo na sequência:

## Backend :wrench:

Para iniciar o backend, basta rodar os seguintes comandos nessa ordem:
```
  cd server
  // comando change directory, usamos para acessar a pasta server
  yarn
  // para instalar as depêndencias utilizadas no backend
  yarn dev
  // para iniciar o servidor em modo de desenvolvimento na porta 3333
```

Não se preocupe com rodar comandos de seed ou popular o banco de dados, só com os comandos acima o projeto já está pronto para ser testado. :blush:

## Frontend :art:

Para iniciar o frontend, basta rodar os seguintes comandos nessa ordem:
```
  cd ../web
  // para voltarmos uma pasta e entrarmos na pasta web
  yarn
  // para instalar as depêndencias utilizadas no frontend
  yarn start
  // para iniciar o nosso projeto em modo de desenvolvimento
```

Feito isso, para visualizar o projeto acesse pelo seguinte link: [http://localhost:3000/login](http://localhost:3000/login)

Para realizar o login como admin, use as seguintes credenciais:
```
  {
    fullName: 'Miguel Augusto',
    email: 'miguelaugl@outlook.com',
    cpf: '123.456.789-20',
    password: '12345,
  }
```
