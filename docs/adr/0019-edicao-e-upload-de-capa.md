# ADR-0019 — Edição de livro e upload de capa (e Google Books como opção)

- **Status:** Aceito
- **Data:** 2026-06-26

## Contexto

A busca da Open Library tem cobertura irregular (sobretudo PT). Avaliamos a
**Google Books API** como fonte principal, mas **sem chave** ela retorna `429`
(cota anônima esgotada) — inviável a partir de um app estático no GitHub Pages sem
uma API key gerenciada. Como o produto é keyless/local-first, a estratégia passa a
ser tornar **adicionar e editar livros** rápido e independente de API.

## Decisão

- **Editar livro depois de adicionado** (título, autoras, ano, capa) via um
  formulário unificado `BookFormSheet` (modos `create` e `edit`), reaproveitado na
  busca e na página do livro.
- **Upload de imagem de capa**: o arquivo é comprimido no cliente (canvas, lado
  máx. ~480px, JPEG) e salvo como **data URL** em `book.coverUrl`. Auto-contido:
  entra no backup e funciona offline. `useCachedCover` ignora `data:`/`blob:`.
- **Busca**: mantém Open Library mesclada (global + idioma do locale) e adiciona
  atalho por **ISBN**.
- **Google Books**: documentado como **upgrade opcional** — só com API key
  configurada no build (secret) e restrição de referrer. Fora do escopo keyless.

## Consequências

- ✅ Adicionar/editar deixa de depender da qualidade da busca; capa por upload.
- ✅ Capas enviadas sobrevivem a backup/restore (data URL no próprio registro).
- ⚠️ Data URLs aumentam o tamanho do registro/backup (mitigado pela compressão).
- 🔮 Se a busca PT for crítica, adotar Google Books com key (novo ADR que revisita
  o ADR-0003).
