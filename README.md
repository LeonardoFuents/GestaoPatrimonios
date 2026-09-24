# Gestão de Patrimônios — Front-end

Interface web para **controle de patrimônios** de uma instituição: consulta de itens por ambiente, detalhes de cada patrimônio e **solicitação de transferência** entre locais.

> A API está em [SistemaPatrimonio](https://github.com/LeonardoFuents/SistemaPatrimonio).

## Telas

- **Login** com NIF e senha (JWT)
- **Locais**: lista de ambientes com área e responsável, com busca
- **Patrimônios**: listagem geral com filtro por local e pesquisa
- **Detalhes do patrimônio**: número, denominação, local e status
- **Modais**: transferir patrimônio (destino + motivo), justificativa e importação de itens

## Tecnologias

- **Next.js 16** (Pages Router) + **React 19** + **TypeScript**
- **Axios** para consumir a API
- **jwt-decode** para ler o token e o perfil do usuário
- **react-toastify** para notificações
- CSS Modules

## Estrutura

```
src/
  components/   # header, modalImportar, modalJustificativa, modalTransferir
  pages/
    login/  listaAmbientes/  todosPatrimonios/  detalhesPatrimonio/
    api/        # api.ts (Axios) + serviços: auth, ambiente, patrimônio, detalhe
  utils/        # auth (token), toast
```

## Como rodar

Pré-requisitos: Node.js 18+ e a [API](https://github.com/LeonardoFuents/SistemaPatrimonio) rodando.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. A URL da API fica em `src/pages/api/api.ts`.

## Autor

**Leonardo Fuentes** — [GitHub](https://github.com/LeonardoFuents)
