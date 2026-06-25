# 03 — Arquitetura Técnica

> Stack, decisões arquiteturais (ADRs), modelo de dados e deploy. Otimizado para
> uma SPA local-first hospedada no GitHub Pages, com sensação near-native (PWA).

---

## 1. Visão geral

```
┌─────────────────────────────────────────────┐
│                  Navegador                    │
│  ┌─────────────────────────────────────────┐ │
│  │  SPA (React + Vite + TS)                 │ │
│  │   UI ── Estado (Zustand) ── i18n         │ │
│  │            │                              │ │
│  │   ┌────────┴─────────┐                    │ │
│  │   │ Camada de dados  │  IndexedDB (Dexie) │ │
│  │   │ (repositórios)   │  + export/import   │ │
│  │   └────────┬─────────┘                    │ │
│  │            │ (online)                      │ │
│  └────────────┼──────────────────────────────┘ │
│         Service Worker (PWA, cache)             │
└──────────────┼──────────────────────────────────┘
               │ HTTPS
        ┌──────▼───────┐
        │ Open Library │  busca + capas (sem chave)
        └──────────────┘
```

Sem backend próprio no MVP. Toda persistência é no dispositivo; a única rede é a
busca de metadados na Open Library.

## 2. Stack recomendada

| Camada | Escolha | Por quê |
|--------|---------|---------|
| Linguagem | **TypeScript** | segurança de tipos no modelo de dados, DX |
| Build/SPA | **Vite** | rápido, ótimo p/ GitHub Pages, suporte PWA maduro |
| UI | **React 18** | maior ecossistema, fácil contratar/colaborar |
| Estilo | **Tailwind CSS** + CSS vars (tokens) | velocidade + design tokens do DS |
| Estado | **Zustand** | leve, sem boilerplate, ótimo p/ local-first |
| Dados locais | **Dexie** (IndexedDB) | capas/listas grandes, queries, migrations |
| Roteamento | **React Router** (hash ou `404.html`) | ver ADR-005 |
| i18n | **react-i18next** | maduro, lazy-load de locales |
| PWA | **vite-plugin-pwa** (Workbox) | manifest + service worker prontos |
| Ícones | **lucide-react** | leve, tree-shake |
| Gráficos (v1.1+) | **Recharts** ou **visx** | dashboard/budget |
| Testes | **Vitest** + **Testing Library** + **Playwright** | unidade/componente + e2e |
| Qualidade | **ESLint** + **Prettier** + **TypeScript strict** | consistência |
| CI/CD | **GitHub Actions** → **GitHub Pages** | deploy automático |

> Alternativa considerada: **Svelte/SvelteKit** (menor bundle, ótimo DX). React
> venceu por ecossistema e familiaridade. Registrado em ADR-001.

## 3. Estrutura de pastas (proposta)

```
src/
  app/            # bootstrap, providers, router
  features/
    shelf/        # estante: grid, filtros, status
    book/         # detalhe do livro, anotações
    search/       # busca Open Library
    dashboard/    # stats (v1.1)
    settings/     # idioma, tema, backup
  components/     # componentes do design system (BookCover, etc.)
  data/
    db.ts         # Dexie schema + migrations
    repositories/ # books, notes, settings
    openlibrary/  # client da API + mapeamento
  i18n/           # config + locales/pt-BR.json, en.json
  styles/         # tokens, tailwind base
  lib/            # utils (export/import, hooks)
public/           # manifest, ícones, 404.html
docs/             # esta documentação
```

## 4. Modelo de dados (local)

```ts
type ReadingStatus = 'want_to_read' | 'reading' | 'read';

interface Book {
  id: string;                 // uuid local
  olWorkId?: string;          // Open Library work key (ex.: "OL12345W")
  olEditionId?: string;
  title: string;
  authors: string[];
  coverUrl?: string;          // url Open Library
  coverBlobId?: string;       // cache local opcional (offline)
  pageCount?: number;
  publishedYear?: number;
  categories: string[];       // gêneros/tags
  status: ReadingStatus;
  rating?: number;            // 0..5 (meias permitidas)
  isFavorite: boolean;
  startedAt?: string;         // ISO
  finishedAt?: string;        // ISO
  createdAt: string;
  updatedAt: string;
}

interface Note {
  id: string;
  bookId: string;
  type: 'review' | 'note' | 'quote';
  body: string;               // markdown leve
  page?: number;
  isSpoiler: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AppSettings {
  locale: 'pt-BR' | 'en';
  theme: 'dark' | 'light' | 'system';
  schemaVersion: number;      // p/ migrations e export
}
```

**Export/Import:** um JSON único `{ schemaVersion, exportedAt, books[], notes[], settings }`.
Botão de export gera download; import valida `schemaVersion` e faz merge/replace.

## 5. Integração Open Library

- **Busca:** `https://openlibrary.org/search.json?q={query}&limit=20&fields=key,title,author_name,cover_i,first_publish_year,subject`
- **Capa:** `https://covers.openlibrary.org/b/id/{cover_i}-{S|M|L}.jpg`
- **Sem API key.** Respeitar _rate limits_ (debounce de busca ≥ 300ms; cache de
  resultados; `User-Agent` adequado).
- **Resiliência:** _fallback_ de capa (placeholder gerado com título), edição manual
  de metadados, e estado offline tratado.
- **Privacidade:** só chamamos a API quando a usuária busca; nenhum dado pessoal sai
  do dispositivo.

## 6. PWA / near-native

- `manifest.webmanifest`: nome, ícones (maskable), `display: standalone`,
  `theme_color` (preto), `background_color`.
- Service worker (Workbox): _app shell_ em cache, _stale-while-revalidate_ para
  capas, fallback offline.
- Splash/ícones para iOS; meta tags `apple-mobile-web-app-*`.
- Suporte a `safe-area-inset` e gestos; sensação de app instalado.

## 7. Decisões arquiteturais (ADRs resumidos)

- **ADR-001 — React + Vite:** ecossistema e DX sobre menor bundle (Svelte).
- **ADR-002 — Local-first com IndexedDB/Dexie:** privacidade, custo zero, offline;
  trade-off = sem sync (mitigado por export/import e roadmap de sync).
- **ADR-003 — Open Library:** gratuita e sem chave vs. cobertura irregular do Google
  Books com gestão de quota.
- **ADR-004 — i18n desde o início (react-i18next):** evita retrabalho; PT-BR default,
  EN em paralelo; chaves de tradução obrigatórias (lint contra strings cruas).
- **ADR-005 — Roteamento no GitHub Pages:** usar **hash routing** (mais simples e
  robusto) _ou_ `BrowserRouter` + `404.html` que reescreve para `index.html`.
  Decisão default: **hash routing** no MVP para zero dor de _deep link_/refresh.
- **ADR-006 — Sem analytics que rastreiam:** se necessário, _privacy-friendly_ e
  opt-in (Plausible/Umami). Coerente com o princípio de privacidade.

## 8. CI/CD e deploy

- **GitHub Actions:** em push na branch principal → `lint` + `test` + `build` →
  publish em **GitHub Pages** (artefato `dist/`).
- `vite.config` com `base` apontando para o subpath do Pages (ex.: `/bookshelf/`).
- _Preview_ por PR (opcional) e _branch protection_ na main.
- **SessionStart hook** (Claude Code na web): instalar deps e rodar testes/lint —
  ver skill `session-start-hook` quando o código começar.

## 9. Qualidade & convenções

- TypeScript `strict`; sem `any` implícito.
- Commits convencionais (`feat:`, `fix:`, `docs:`...).
- Testes: repositórios e mapeamento da Open Library cobertos por unidade; fluxos
  críticos (adicionar livro, escrever nota, export/import) por e2e.
- Acessibilidade validada no CI (axe) quando houver UI.

## 10. Pendências técnicas a decidir no protótipo

- Estratégia final de roteamento (confirmar hash vs. 404.html).
- Cache de capas offline (blob no IndexedDB) — custo de espaço vs. benefício.
- Biblioteca de gráficos para v1.1 (Recharts vs. visx).
- Necessidade real de analytics e qual ferramenta.
