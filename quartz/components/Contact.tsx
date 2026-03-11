import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const buildDate = new Date()
const formattedDate = buildDate.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

const Contact: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "contact-sidebar")}>
      revised: {formattedDate}
    </div>
  )
}

Contact.css = `
.contact-sidebar {
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.85rem;
  color: var(--secondary);
}
`

export default (() => Contact) satisfies QuartzComponentConstructor
