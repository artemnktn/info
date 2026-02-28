import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const Contact: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "contact-sidebar")}>
      <a href="mailto:hello@artemnikitin.info" class="internal">
        hello@artemnikitin.info
      </a>
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

.contact-sidebar a {
  text-decoration: none;
}

.contact-sidebar a:hover {
  color: var(--tertiary);
}
`

export default (() => Contact) satisfies QuartzComponentConstructor
