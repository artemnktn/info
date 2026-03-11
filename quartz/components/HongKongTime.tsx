import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import hongkongTimeScript from "./scripts/hongkongTime.inline"

const HongKongTime: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "hongkong-time-wrapper")}>
      <div class="hongkong-time-row">
        <span class="hongkong-time-label">HK</span>
        <span class="hongkong-time" data-timezone="Asia/Hong_Kong">—</span>
      </div>
    </div>
  )
}

HongKongTime.css = `
.hongkong-time-wrapper {
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.85rem;
  color: var(--secondary);
  text-align: right;
}
.hongkong-time-row {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
}
.hongkong-time-label {
  font-size: 0.75rem;
  opacity: 0.8;
}
`

HongKongTime.afterDOMLoaded = hongkongTimeScript

export default (() => HongKongTime) satisfies QuartzComponentConstructor
