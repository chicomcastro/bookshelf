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
| [`docs/adr/`](docs/adr/) | Decision Records — decisões de arquitetura e produto |

## Pitch

> Um **diário de leitura íntimo** para a cultura BookTok, onde cada livro vira uma
> página linda o suficiente pra postar.

## Decisões fundadoras (ver [ADRs](docs/adr/))

- **Diário-first** — a entrada de diário é o coração; a estante é a vitrine.
- **Nicho BookTok** — spice 🌶️, tropes, book boyfriends e mood já no MVP.
- **Compartilhável** — cada resenha gera um card _story-ready_ (motor de crescimento).
- **Viral por fora, privado por dentro** — sem rede social no app; a comunidade
  cresce nas redes que a usuária já usa.
- **Local-first** — dados no dispositivo (IndexedDB), backup por export/import JSON.
- **Open Library API** — metadados e capas, gratuita e sem chave.
- **Bilíngue** — i18n desde o início (PT-BR + EN).
- **SPA + PWA** — instalável, near-native, hospedável no GitHub Pages.

## Público-alvo

Leitoras jovens (20–35 anos), cultura BookTok/romantasy, que querem um espaço
bonito e pessoal para registrar o que sentiram e curar sua biblioteca.
