# ADR-0020 — Busca via Google Books (opcional, ativada por API key no build)

- **Status:** Aceito
- **Data:** 2026-06-28

## Contexto

A Open Library tem cobertura irregular, sobretudo em português. A Google Books é
bem melhor para PT, mas **sem chave** retorna `429` (cota anônima esgotada) — não
serve a partir de um app estático. Com chave, funciona, mas a chave fica no bundle
do cliente (natureza de SPA estática).

## Decisão

Camada de busca (`data/search.ts`) que **orquestra provedores**:
- **Google Books** (`data/googleBooks.ts`) é a **fonte principal quando há key**,
  lida de `import.meta.env.VITE_GOOGLE_BOOKS_KEY` (injetada no build).
- **Open Library** (`data/openLibrary.ts`) é **sempre** consultada como base/fallback
  (keyless), preservando o comportamento atual.
- Resultados mesclados e **deduplicados por título+autor** (mesma obra em fontes
  diferentes). Cada resultado carrega um `id` qualificado por fonte
  (`OL...W` ou `gb:<id>`), usado para deduplicar ao adicionar.

A key entra por **secret do GitHub Actions** (`GOOGLE_BOOKS_API_KEY` →
`VITE_GOOGLE_BOOKS_KEY`) nos workflows de CI e deploy. **Sem o secret, tudo funciona
com a Open Library** — a integração "liga" sozinha quando a key existir, sem novo
deploy de código. Passo a passo em [`docs/SETUP-GOOGLE-BOOKS.md`](../SETUP-GOOGLE-BOOKS.md).

Revisita parcialmente o [ADR-0003](0003-open-library-metadados.md) (OL deixa de ser
a única fonte, mas continua o default keyless).

## Consequências

- ✅ Busca PT muito melhor quando a key está presente; degradação graciosa sem ela.
- ✅ Sem acoplar o código à existência da key (decisão em runtime via env do build).
- ⚠️ A key fica embutida no cliente → mitigar com **restrição por HTTP referrer** e
  por API (orientado no SETUP).
- ⚠️ Capas do Google (books.google.com) podem não permitir `fetch`→blob (CORS); nesse
  caso o cache local de capas (ADR-0018) faz fallback para a URL remota direta.
