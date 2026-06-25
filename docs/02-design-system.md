# 02 — Design System

> Tradução da estética das referências (dark academia / BookTok) em um sistema
> reutilizável. Tokens, componentes e telas. Base para o protótipo em código.

---

## 1. Direção visual

**Mood:** _dark academia_ aconchegante — biblioteca à meia-luz, lombadas douradas,
veludo. Premium, feminino sem ser infantil, misterioso, "instagramável".

**Inspiração direta das referências:**
- Fundo quase preto com superfícies elevadas levemente mais claras.
- Acento **dourado/âmbar** (botões, destaques, números) — a assinatura da marca.
- Toques **rosé/lavanda** para dados/gráficos e estados afetivos.
- Capas dos livros como protagonistas: a cor vem dos livros, a UI é o palco escuro.
- Cantos arredondados generosos, painéis com leve _glass_, sombras suaves.

**Palavras-chave:** elegante · acolhedor · curado · noturno · tátil.

## 2. Tokens de cor

Tema escuro é o padrão (default). Tema claro vem no roadmap (v1.1+).

```css
:root[data-theme="dark"] {
  /* Superfícies */
  --bg-base:        #0E0E10; /* fundo do app */
  --bg-surface:     #16161A; /* cards, painéis */
  --bg-elevated:    #1F1F25; /* modais, menus, hover */
  --bg-glass:       rgba(31, 31, 37, 0.72); /* barras com blur */

  /* Acentos */
  --accent-gold:    #C9A24B; /* primário — botões, destaques, números */
  --accent-gold-hi: #E3C46E; /* hover/realce do dourado */
  --accent-rose:    #D98CA0; /* secundário afetivo / gráficos */
  --accent-lavender:#A99BD4; /* terciário / gráficos */

  /* Texto */
  --text-primary:   #F4F1EA; /* off-white quente */
  --text-secondary: #B5B2AA;
  --text-muted:     #6F6C66;

  /* Semânticos */
  --success:        #6FBF8B;
  --warning:        #E0A458;
  --danger:         #D9706A;

  /* Linhas / bordas */
  --border-subtle:  rgba(244, 241, 234, 0.08);
  --border-strong:  rgba(244, 241, 234, 0.16);
}
```

> Cores definidas como tokens semânticos (não hex soltos no código). Implementar
> via CSS custom properties + Tailwind theme estendido. Tema claro = sobrescrever
> `:root[data-theme="light"]`.

### Cores das prateleiras / lombadas
Paleta suave para a visualização de estante (IMG_0917): derivar das capas quando
disponível; quando não, sortear de uma paleta pastel curada (sálvia, terracota,
mostarda, poeira-de-rosa, índigo claro, creme).

## 3. Tipografia

| Uso | Família | Peso | Observação |
|-----|---------|------|------------|
| Títulos / display | **Fraunces** ou **Playfair Display** (serifada) | 500–700 | dá o ar "literário"/academia |
| Corpo / UI | **Inter** (sans) | 400–600 | legível, neutra, ótima em tela |
| Números/stats | Inter _tabular-nums_ | 600 | alinhamento de dígitos no dashboard |

- Escala (rem): 0.75 / 0.875 / 1 / 1.125 / 1.375 / 1.75 / 2.25 / 3.
- Fontes via `@fontsource` (self-host) para não depender de CDN e funcionar offline.

## 4. Espaçamento, raios e elevação

- **Grid base:** 4px. Espaçamentos: 4, 8, 12, 16, 24, 32, 48, 64.
- **Raios:** `sm 8px` · `md 12px` · `lg 16px` · `xl 24px` · `full 9999px` (pills).
- **Sombras:** suaves e difusas (sem sombra dura). Ex.: `0 8px 24px rgba(0,0,0,.4)`.
- **Blur de vidro:** `backdrop-filter: blur(16px)` em barras fixas.

## 5. Iconografia & motion

- **Ícones:** Lucide (traço fino, consistente, tree-shakeable).
- **Motion:** transições 150–250ms, _ease-out_; entrada de cards com _fade+rise_ de
  8px; troca de aba com _shared layout_; respeitar `prefers-reduced-motion`.
- **Tátil:** _haptics_ via Vibration API em ações-chave (marcar como lido, favoritar)
  quando suportado.

## 6. Componentes-núcleo

| Componente | Notas |
|-----------|-------|
| `BookCover` | imagem com _aspect-ratio_ 2:3, _skeleton_ no load, fallback gerado (título sobre cor) |
| `BookCard` | capa + título + autor + rating; usado na grade da estante |
| `BookGrid` | grade responsiva (2 col mobile → 3–6 desktop), _virtualizada_ se grande |
| `ShelfRow` | prateleira com lombadas (visualização IMG_0917) |
| `RatingStars` | 0–5, meia-estrela, dourado |
| `StatusChip` | pill: _Lido_ · _Lendo_ · _Quero ler_ |
| `FilterBar` | chips de categoria roláveis horizontalmente (IMG_0916) |
| `SearchSheet` | busca Open Library com resultados e "adicionar à estante" |
| `NoteEditor` | editor de anotação/resenha; toggle _spoiler_; markdown leve |
| `StatCard` | número grande + label (dashboard v1.1) |
| `BottomNav` | navegação inferior fixa (mobile), estilo app nativo |
| `EmptyState` | ilustração + texto acolhedor + CTA |
| `Toast` | confirmações discretas (ex.: "Adicionado à estante") |

## 7. Telas (mapa derivado das referências)

1. **Home / Estante** (IMG_0916, IMG_0919) — saudação, `FilterBar`, `BookGrid` por
   estado; FAB/busca para adicionar. _É a tela inicial do MVP._
2. **Detalhe do livro** — capa grande, metadados, `RatingStars`, `StatusChip`,
   `NoteEditor` (resenha + anotações + citações), datas de leitura.
3. **Busca / Adicionar** (`SearchSheet`) — Open Library, resultados, ação rápida de
   adicionar com escolha de estado.
4. **Dashboard "Good afternoon, Reader"** (IMG_0917) — `StatCard`s + visualização de
   estante com lombadas + progresso de metas. _v1.1._
5. **Budget Overview** (IMG_0918) — gastos com livros, donut/bar charts. _v1.2+._
6. **Ajustes** — idioma (PT/EN), tema, export/import, sobre/privacidade.

## 8. Layout & navegação

- **Mobile-first**, _safe areas_ respeitadas, `BottomNav` com 3–5 itens
  (Estante · Buscar · Dashboard · Ajustes).
- **Desktop:** mesma base, navegação migra para barra lateral; grade ganha colunas.
- Sensação _app-like_: sem scroll horizontal acidental, _pull-to-refresh_ desativado
  onde não faz sentido, transições de rota animadas.

## 9. Acessibilidade

- Contraste mínimo AA (texto sobre fundo escuro ≥ 4.5:1) — validar o dourado em
  textos pequenos (usar `--accent-gold-hi` quando necessário).
- Navegação por teclado e _focus rings_ visíveis.
- `alt` em capas (título + autor); `aria-label` em ícones-botão.
- Respeitar `prefers-reduced-motion` e `prefers-color-scheme`.
- Alvos de toque ≥ 44×44px.

## 10. Estados vazios (exemplos de tom)

- Estante vazia: _"Sua estante está esperando o primeiro tomo. Que história começa hoje?"_ + CTA Buscar.
- Sem anotações: _"Nenhuma anotação ainda. O que esse livro te fez sentir?"_
- Offline: _"Você está offline — sua estante continua aqui. A busca de novos livros volta com a internet."_
