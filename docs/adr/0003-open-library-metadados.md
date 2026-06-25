# ADR-0003 — Open Library como fonte de metadados/capas

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A usuária precisa buscar livros e obter capa, título, autor, ano e gêneros sem
digitar tudo à mão. Sendo SPA estática sem backend, queremos uma API gratuita,
sem chave e sem necessidade de proxy.

## Decisão

Usar a **Open Library API** (`openlibrary.org/search.json` e
`covers.openlibrary.org`) — gratuita, sem API key, com capas e metadados.

## Alternativas consideradas

- **Google Books API** — cobertura ampla, mas exige chave/quota e gestão de limites
  em uso público a partir do cliente.

## Consequências

- ✅ Sem chave, sem custo, chamável direto do cliente.
- ✅ Privacidade: só chamamos a API quando a usuária busca.
- ⚠️ Cobertura/qualidade de capas irregular → fallback de capa gerada, edição manual
  de metadados e cache local opcional.
- ⚠️ Respeitar rate limits (debounce de busca, cache de resultados, User-Agent).
