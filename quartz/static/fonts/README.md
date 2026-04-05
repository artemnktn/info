# Fonts

## Body & headings

No bundled `.woff2` for body text. In `quartz.config.ts`, `header` / `body` are set to **`Roboto`** so the stack matches `theme.ts` (Roboto → system-ui → Segoe → …) and **OG images** can fetch **Roboto** from Google Fonts for Satori.

If **Roboto** is not installed locally, the browser uses the next families in that stack (system UI sans).

## Roboto Mono (code)

Loaded from **Google Fonts** via `<link>` in `Head.tsx` when `fontOrigin` is `local` and `cdnCaching` is true.

## Other files

`favorit-font-family/` and Acumin `.otf` files are unused unless you add `@font-face` rules in `custom.scss`.
