import { QuartzComponent, QuartzComponentConstructor } from "./types"

interface Options {
  links: Record<string, string>
}
export default ((_opts?: Options) => {
  const Footer: QuartzComponent = () => {
    return null
  }

  return Footer
}) satisfies QuartzComponentConstructor
