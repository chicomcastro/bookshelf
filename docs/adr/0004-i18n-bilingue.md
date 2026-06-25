# ADR-0004 — Bilíngue (PT-BR + EN) com i18n desde o início

- **Status:** Aceito
- **Data:** 2026-06-25

## Contexto

O público inicial é de leitoras brasileiras (PT-BR), mas a cultura BookTok/romantasy
é global e em inglês, e o crescimento viral externo (ADR-0008) pode atrair
audiência internacional.

## Decisão

Estruturar **internacionalização desde o início** com **react-i18next**. Idioma
default por `navigator.language`, começando com **PT-BR** completo e **EN** em
paralelo. Proibir strings cruas no código (lint/revisão garante chaves de tradução).

## Consequências

- ✅ Evita retrabalho de extrair strings depois; abre porta pro mercado global.
- ✅ Locales com lazy-load não pesam o bundle inicial.
- ⚠️ Custo inicial: toda string nova precisa entrar em PT-BR e EN (parte da
  Definição de Pronto).
