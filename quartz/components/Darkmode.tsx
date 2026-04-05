// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const Darkmode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  const label = `${i18n(cfg.locale).components.themeToggle.lightMode} / ${i18n(cfg.locale).components.themeToggle.darkMode}`
  return (
    <button class={classNames(displayClass, "darkmode")} type="button" aria-label={label}>
      <svg
        class="theme-toggle-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="theme-toggle-clip-ul">
            <polygon points="0,0 24,0 0,24" />
          </clipPath>
          <clipPath id="theme-toggle-clip-br">
            <polygon points="24,24 24,0 0,24" />
          </clipPath>
        </defs>
        {/* Full viewBox fills the button; stroke inset 0.5 so 1px border is not clipped */}
        <rect x="0" y="0" width="24" height="24" fill="#000000" clip-path="url(#theme-toggle-clip-ul)" />
        <rect x="0" y="0" width="24" height="24" fill="#ffffff" clip-path="url(#theme-toggle-clip-br)" />
        <rect x="0.5" y="0.5" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1" />
      </svg>
    </button>
  )
}

Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles

export default (() => Darkmode) satisfies QuartzComponentConstructor
