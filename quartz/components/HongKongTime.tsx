import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import hongkongTimeScript from "./scripts/hongkongTime.inline"

const HongKongTime: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "hongkong-time-wrapper")}>
      HK time now: <span class="hongkong-time" data-timezone="Asia/Hong_Kong">—</span>
    </div>
  )
}

HongKongTime.css = `
.hongkong-time-wrapper {
  flex-shrink: 0;
  padding-top: 0;
  font-size: 0.85rem;
  color: var(--secondary);
  text-align: right;
}
`

HongKongTime.afterDOMLoaded = hongkongTimeScript

export default (() => HongKongTime) satisfies QuartzComponentConstructor
