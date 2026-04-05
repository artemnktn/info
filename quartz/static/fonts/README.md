# Fonts

## Unica77 LL (body & headings)

From [Lineto](https://www.lineto.com/). The CSS family name in the files is **`Unica77 LL`**.

Current file:

- `Unica77LL-Regular.woff2` — Regular (400)

If you add more **`.woff2`** cuts (Medium, Bold, Italic, …), add matching `@font-face` blocks in `quartz/styles/custom.scss` and map weights (page title uses **500** via `.page-title`).

## Roboto Mono (code)

Loaded from **Google Fonts** via `<link>` in `Head.tsx` when `fontOrigin` is `local` and `cdnCaching` is true.

## Other files

`favorit-font-family/` and Acumin `.otf` files are unused by the site CSS unless you wire them in `custom.scss`.
