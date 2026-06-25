<div align="center">

# 📚 Bookshelf

### Seu diário de leitura — bonito o suficiente pra postar.

_Uma estante virtual e um diário íntimo para quem vive de livros._

</div>

---

Você terminou o livro às 3 da manhã, com o coração na mão. Onde você guarda
**isso**? O book hangover, a citação que te destruiu, o book boyfriend que arruinou
seus padrões, o nível de picância 🌶️🌶️🌶️🌶️ que você jura que valeu cada página?

O Goodreads não entende você. A planilha é fria. O caderninho some.

**O Bookshelf é o seu lugar.** Sua estante, suas resenhas, seus sentimentos — num
app lindo, privado e que cabe no bolso.

## ✨ O que você pode fazer

- 📖 **Montar sua estante** — lidos, lendo e a próxima obsessão (TBR), tudo numa
  grade que dá orgulho de mostrar.
- 💭 **Escrever seu diário de leitura** — resenhas, anotações e aquelas citações que
  você sublinhou. Com aviso de **spoiler** pra não estragar a surpresa de ninguém.
- 🌶️ **Falar a sua língua** — avalie o **spice**, marque **tropes** (enemies to
  lovers, slow burn, found family…), registre seu **mood** e seus
  **book boyfriends**.
- 🪄 **Compartilhar em segundos** — transforme qualquer leitura num **card lindo**,
  pronto pro seu story. Cada print é um convite pra mais uma leitora.
- 🔒 **Sem login, sem servidor, 100% seu** — seus dados ficam só no seu aparelho.
  Funciona **offline** e **instala como app** na tela inicial.
- 🌍 **Em português e inglês.**

## 🚀 Começar

> 🌐 **App online:** `https://chicomcastro.github.io/bookshelf/`
> _(publicado automaticamente a cada atualização)_

Abriu, usou. Sem cadastro. Toque em **＋**, busque um livro, e comece a sua estante.
Quer experimentar antes? Toque em _"Ver estante de exemplo"_.

## 💛 Para quem é

Para leitoras que transformam livros em personalidade. Cultura BookTok, romantasy,
dark romance, fantasia — se você monta TBR e tira foto da estante, isso é pra você.

---

<details>
<summary><b>🛠️ Sob o capô</b> (para quem curte os detalhes técnicos)</summary>

<br>

App web (SPA) **local-first**, instalável como PWA, hospedado no GitHub Pages.
React + Vite + TypeScript, Tailwind, IndexedDB (Dexie), Open Library para capas,
i18n PT/EN. Sem backend: privacidade por padrão e custo zero.

A direção do produto, o design system, a arquitetura e as decisões (ADRs) ficam em
[`docs/`](docs/):

| | |
|---|---|
| 🧭 [Visão e diretrizes](docs/01-visao-e-diretrizes.md) | Propósito, público, princípios, métricas |
| 🎨 [Design system](docs/02-design-system.md) | Identidade, tokens, componentes, telas |
| 🏗️ [Arquitetura](docs/03-arquitetura.md) | Stack, modelo de dados, deploy |
| 🗂️ [Backlog](docs/04-backlog.md) | Épicos, histórias, roadmap |
| 📜 [Decision Records](docs/adr/) | Decisões de arquitetura e produto |

**Rodar localmente:**

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
```

</details>

<div align="center">
<sub>Feito com 💛 para quem nunca tem só "mais um capítulo".</sub>
</div>
