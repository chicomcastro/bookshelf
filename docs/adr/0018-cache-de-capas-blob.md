# ADR-0018 — Cache de capas como blob no IndexedDB

- **Status:** Aceito
- **Data:** 2026-06-26

## Contexto

As capas ficavam "recarregando" a cada troca de aba / reabertura do app. Causa:
a Open Library serve as capas com **HTTP 302** e `cache-control: public` **sem
`max-age`**, e a imagem real vem de **outro host** após o redirect. Resultado:
- o cache HTTP do navegador revalida/refaz a cada montagem;
- o `runtimeCaching` do service worker (regrado só para `covers.openlibrary.org`)
  não pega a imagem final (host diferente).

Como a grade remonta ao trocar de aba, cada capa pisca/recarrega.

## Decisão

Cachear as capas **como blob no IndexedDB** (tabela `covers`, schema v3):
- 1ª vez: mostra a URL remota e baixa o blob via `fetch` (CORS liberado —
  `access-control-allow-origin: *`), guardando em `covers`.
- Próximas: serve de um **object URL** local — instantâneo, sem flash e **offline**.
- Hook `useCachedCover` cuida do ciclo de vida (revoga o object URL no unmount).

Cache derivado: **fora do backup** (export/import) e limpo no "apagar tudo".

## Consequências

- ✅ Sem recarregar capas ao navegar; funciona offline; coerente com local-first.
- ✅ Degradação graciosa: sem rede/CORS, mantém a URL remota.
- ⚠️ Uso de armazenamento cresce com a estante (capas ~5–15KB cada) — aceitável;
  se necessário, podar por `savedAt`/LRU no futuro.
- ⚠️ Blobs órfãos ao remover livros não são limpos automaticamente (impacto
  pequeno; limpeza pode ser adicionada depois).
