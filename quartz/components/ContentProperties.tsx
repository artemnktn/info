import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/contentProperties.scss"

const SKIP_KEYS = new Set([
  "title",
  "tags",
  "draft",
  "date",
  "created",
  "modified",
  "published",
  "description",
  "socialDescription",
  "socialImage",
  "publish",
  "aliases",
  "lang",
  "enableToc",
  "cssclasses",
  "comments",
  "hide",
  "project",
])

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

export default (() => {
  function ContentProperties({ fileData, displayClass }: QuartzComponentProps) {
    const frontmatter = fileData.frontmatter
    if (!frontmatter) return null

    const entries = Object.entries(frontmatter).filter(
      ([key, value]) =>
        !SKIP_KEYS.has(key) &&
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0),
    )
    if (entries.length === 0) return null

    return (
      <div class={classNames(displayClass, "content-properties")}>
        <dl class="properties-list">
          {entries.map(([key, value]) => (
            <>
              <dt class="property-key">{formatKey(key)}</dt>
              <dd class="property-value">
                {Array.isArray(value)
                  ? value.join(", ")
                  : typeof value === "boolean"
                    ? value
                      ? "Yes"
                      : "No"
                    : value instanceof Date
                      ? value.toLocaleDateString()
                      : String(value)}
              </dd>
            </>
          ))}
        </dl>
      </div>
    )
  }

  ContentProperties.css = style
  return ContentProperties
}) satisfies QuartzComponentConstructor
