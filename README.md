# Usando Playwright com Typescript para testes e2e de uma Web App

## 🚀 Tecnologias

- [Node.js] - plataforma de desenvolvimento
- [Playwright] - framework usado para realizar os testes

## 👨🏻‍💻 Como executar o projeto

[Node.js](https://nodejs.org/) v18 ou superior para executar.

Para liberar o gerenciador de pacotes Yarn:

```
corepack enable
```

Execute os comandos abaixo para instalar das dependências do projeto:

Instalando o Playwright e outras dependências...
```sh
cd playwright-express-mark\
yarn install
```

Subindo a api...

```sh
cd playwright-express-mark\apps\api
yarn install
yarn dev
```

Subindo a interface gráfica...
```sh
cd playwright-express-mark\apps\web
yarn install
yarn dev
```

Executando os testes em modo headless (Default)
```sh
cd playwright-express-mark\
yarn playwright test 
```

Executando os testes visualizando o navegador
```sh
cd playwright-express-mark\
yarn playwright test --headed
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feito por Jefferson Melo 👋 &nbsp;[Meu linkedIn](https://www.linkedin.com/in/jeffersonmelo8/)
