# Architecture & Product Decision Records (ADRs)

Registro das decisões significativas do Bookshelf — arquiteturais e de produto.
Cada ADR é imutável depois de aceito; mudanças viram um novo ADR que _supersede_ o
anterior.

**Formato:** [MADR](https://adr.github.io/madr/) enxuto — Contexto · Decisão ·
Consequências. **Status:** `Proposto` · `Aceito` · `Substituído por ADR-XXXX`.

| # | Decisão | Status |
|---|---------|--------|
| [0001](0001-local-first-sem-backend.md) | Local-first com IndexedDB, sem backend no MVP | Aceito |
| [0002](0002-stack-react-vite.md) | Stack React + Vite + TypeScript | Aceito |
| [0003](0003-open-library-metadados.md) | Open Library como fonte de metadados/capas | Aceito |
| [0004](0004-i18n-bilingue.md) | Bilíngue (PT-BR + EN) com i18n desde o início | Aceito |
| [0005](0005-roteamento-hash-github-pages.md) | Hash routing no GitHub Pages | Aceito |
| [0006](0006-diario-first.md) | Diário-first como modelo conceitual central | Aceito |
| [0007](0007-nicho-booktok.md) | Nichar em BookTok/romantasy (spice, tropes, personagens, mood) | Aceito |
| [0008](0008-crescimento-viral-externo.md) | Crescimento viral externo, sem rede social no app | Aceito |
| [0009](0009-compartilhar-card-resenha.md) | Compartilhamento via card de resenha (imagem) no MVP | Aceito |
| [0010](0010-formato-diario-hibrido.md) | Formato de diário híbrido (prompts + texto livre) | Aceito |
| [0011](0011-ci-cd-github-actions.md) | CI por PR + CD para GitHub Pages via Actions | Aceito |
| [0012](0012-bibliotecas-de-experiencia.md) | Bibliotecas de experiência (motion, ícones, fontes) | Aceito |
| [0013](0013-card-via-html-to-image.md) | Geração do card de resenha via html-to-image | Aceito |
| [0014](0014-dashboard-stats-e-meta.md) | Dashboard com stats derivadas e meta de leitura local | Aceito |
| [0015](0015-tema-claro-e-token-on-accent.md) | Tema claro e token `on-accent` | Aceito |
| [0016](0016-haptics.md) | Feedback tátil (haptics) nas ações-chave | Aceito |
| [0017](0017-colecoes-tbr.md) | Coleções / TBR temáticos (schema v2 + índice olWorkId) | Aceito |
| [0018](0018-cache-de-capas-blob.md) | Cache de capas como blob no IndexedDB (schema v3) | Aceito |
| [0019](0019-edicao-e-upload-de-capa.md) | Edição de livro e upload de capa (Google Books opcional) | Aceito |

## Como criar um novo ADR

1. Copie o cabeçalho de um ADR existente, incremente o número.
2. Preencha Contexto / Decisão / Consequências de forma objetiva.
3. Se substitui outro, marque o antigo como `Substituído por ADR-XXXX` e
   atualize esta tabela.
