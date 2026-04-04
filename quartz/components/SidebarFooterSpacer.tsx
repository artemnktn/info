import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

/**
 * Fills remaining vertical space in a sidebar flex column so the footer
 * (Contact / HK time) sits on the same baseline as the opposite sidebar.
 */
export default (() => {
  const SidebarFooterSpacer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return <div class={classNames(displayClass, "sidebar-footer-spacer")} aria-hidden="true" />
  }

  SidebarFooterSpacer.css = `
.sidebar-footer-spacer {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  align-self: stretch;
}
`

  return SidebarFooterSpacer
}) satisfies QuartzComponentConstructor
