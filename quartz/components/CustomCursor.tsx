// @ts-ignore
import customCursorScript from "./scripts/customCursor.inline"
import customCursorStyles from "./styles/customCursor.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CustomCursor: QuartzComponent = (_props: QuartzComponentProps) => {
  return <div id="custom-cursor" class="custom-cursor" aria-hidden="true" />
}

CustomCursor.afterDOMLoaded = customCursorScript
CustomCursor.css = customCursorStyles

export default (() => CustomCursor) satisfies QuartzComponentConstructor
