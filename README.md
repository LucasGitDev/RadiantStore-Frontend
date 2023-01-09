<p align="center">
  <img src="./public/logo.svg" width="200" alt="" />
</p>
<br>

<h1 align="center">Radiant Store</h1>

Radiant Store se trata de um catálogo de skins para o jogo Valorant. Inicialmente, há apenas um mostruário de skins, mas há a possibilidade de incluir novas funcionalidade no sistema, de modo que novas demandas sejam atendidas.
## Funcionalidades

- [X]  Login administrativo
- [X]  Criação de novas Skins
- [X]  Autenticação JWT para rotas privadas
- [X]  Cadastro e login de usuários comuns
- [X]  Validação de email
- [X]  Listagem de Skins
- [X]  Ordenação de Skins (por atributo)
- [X]  Validação dos formulários
- [X]  Upload de imagem para Skins
- [ ]  Carrinho de compras
- [ ]  Fechamento de pedido (conclusão de compra)
- [ ]  Painel administrativo (visualição dos pedidos/compras)
## Instalação

Clone o projeto em uma pasta no mesmo nível do backend com o nome frontend (Ou reconfigure docker-compose.yaml no Backend)

```bash
  git clone https://github.com/LucasGitDev/RadiantStore-Frontend.git frontend
```

Instale as dependências

```bash
  yarn
```

Para facilitar o desenvolvimento, algumas variáveis de ambiente já foram adicinadas à um arquivo .env no repositório.

```bash
  yarn dev
```
## Stack utilizada

**Front-end:** ReactTs, Vite, Material UI

**Back-end:** NestJs, Postgres


## Melhorias

As possíveis melhorias se baseiam em questões visuais.

Alguns formulários, possuem cores que não contrastam. Os componentes que possuem dropdown, possuem um fundo escuro e texto escuro. Ao alterar a propriedade de cor do texto, o fundo também é alterado.
Possivelmente, alterações no tema geral ou melhores configurações dos componentes podem resolver.

Todo o desenvolvimento presa pela responsividade da plataforma em diversas telas. Há algumas telas que necessitam de aprimoramento nesse ponto. 
## Autores

- [@LucasGitDev](https://www.github.com/LucasGitDev)

