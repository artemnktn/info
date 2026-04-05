// @ts-ignore
import readerModeScript from "./scripts/readermode.inline"
import styles from "./styles/readermode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const ReaderMode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  const label = i18n(cfg.locale).components.readerMode.title
  return (
    <button class={classNames(displayClass, "readermode")} type="button" aria-label={label}>
      <svg
        class="reader-mode-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0.5" y="0.5" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1" />
        <text
          x="12"
          y="12"
          text-anchor="middle"
          dominant-baseline="central"
          fill="currentColor"
          font-size="12"
          font-weight="400"
        >
          R
        </text>
      </svg>
    </button>
  )
}

ReaderMode.beforeDOMLoaded = readerModeScript
ReaderMode.css = styles

export default (() => ReaderMode) satisfies QuartzComponentConstructor
