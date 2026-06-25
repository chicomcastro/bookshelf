# ADR-0008 — Crescimento viral externo, sem rede social no app

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

O objetivo de produto é **crescer comunidade** (ver visão). Porém o app é
local-first sem backend (ADR-0001). Uma rede social interna (perfis, seguir, feed,
comentários) exigiria backend, autenticação e moderação — colidindo com a
arquitetura e a promessa de privacidade.

## Decisão

Crescer por um **loop viral externo**, não por rede social interna:

> A usuária cria conteúdo lindo no app (cards de resenha — ADR-0009) → posta nas
> redes que já usa (Instagram/TikTok) → atrai novas leitoras → que instalam o app.

O app é a **fábrica de conteúdo**; a comunidade vive nas redes externas. **Não há
rede social dentro do app no MVP nem no roadmap próximo.**

## Consequências

- ✅ Coerente com local-first, privacidade e custo zero.
- ✅ Cada print é marketing orgânico; o produto se vende pela beleza.
- ⚠️ Sem efeitos de rede internos; o crescimento depende da qualidade/partilhabilidade
  dos cards e de presença orgânica nas redes.
- 🔮 Rede social interna só seria reconsiderada se/quando houver backend opcional
  (sync), em um ADR futuro que _superseda_ parte deste.
