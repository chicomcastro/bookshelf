# ADR-0001 — Local-first com IndexedDB, sem backend no MVP

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

A app é uma SPA hospedada no GitHub Pages (estático, sem servidor). Os dados são
pessoais e sensíveis (anotações, sentimentos). Queremos zero fricção (sem
cadastro), privacidade forte e custo operacional nulo.

## Decisão

Persistir todos os dados da usuária **no dispositivo**, via **IndexedDB**
(biblioteca Dexie), sem backend próprio no MVP. Backup e portabilidade via
**export/import de JSON**. Sincronização na nuvem fica como decisão futura
(ver ADR-0008).

## Consequências

- ✅ Privacidade por padrão; custo zero; funciona offline; sem login.
- ✅ Simplicidade operacional (nada a manter além do site estático).
- ⚠️ Risco de perda de dados ao limpar o navegador → mitigado por export/import
  proeminente, PWA instalável e lembretes de backup.
- ⚠️ Sem sincronização entre dispositivos no MVP.
- ⚠️ Métricas de produto dependem de analytics _privacy-friendly_/opt-in ou de
  pesquisa qualitativa.
