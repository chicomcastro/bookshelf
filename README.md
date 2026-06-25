# 📚 Bookshelf

> Estante virtual e livro de anotações para leitoras. Uma SPA local-first, instalável como app, com estética _dark academia_.

**Status:** 🌱 Concepção — documentação de diretriz e backlog (entregável 1).

Bookshelf é um web app (SPA) onde leitoras organizam sua estante virtual (lidos,
lendo, quero ler), registram anotações e resenhas por livro, e acompanham sua
jornada de leitura — tudo offline-first, sem login, hospedado no GitHub Pages.

## Documentação

| Documento | Conteúdo |
|-----------|----------|
| [`docs/01-visao-e-diretrizes.md`](docs/01-visao-e-diretrizes.md) | Visão de produto, público-alvo, princípios, posicionamento, métricas |
| [`docs/02-design-system.md`](docs/02-design-system.md) | Identidade visual, cores, tipografia, componentes, telas |
| [`docs/03-arquitetura.md`](docs/03-arquitetura.md) | Stack técnica, decisões (ADRs), modelo de dados, deploy |
| [`docs/04-backlog.md`](docs/04-backlog.md) | Épicos, histórias de usuário, priorização MoSCoW, roadmap |

## Decisões fundadoras

- **Local-first** — dados no dispositivo (IndexedDB), backup por export/import JSON. Sync na nuvem fica no roadmap.
- **Open Library API** — metadados e capas de livros, gratuita e sem chave.
- **MVP enxuto** — Estante + Anotações são o coração da v1.
- **Bilíngue** — i18n desde o início, começando por PT-BR.
- **SPA + PWA** — instalável, near-native, hospedável estaticamente no GitHub Pages.

## Público-alvo

Leitoras jovens (20–35 anos), cultura BookTok/romantasy, que querem um espaço
bonito e pessoal para curar sua biblioteca e suas impressões de leitura.
