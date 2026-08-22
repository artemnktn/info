import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/contentProperties.scss"

const SKIP_KEYS = new Set([
  "title",
  "tags",
  "draft",
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

function formatValue(value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No"
  if (value instanceof Date) return value.toLocaleDateString()
  return String(value)
}

function renderValue(value: unknown) {
  const text = formatValue(value)
  if (!/^https?:\/\//.test(text)) return text
  return (
    <a href={text} class="external" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  )
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
                  ? value.map((item, i) => (
                      <>
                        {i > 0 ? ", " : null}
                        {renderValue(item)}
                      </>
                    ))
                  : renderValue(value)}
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
