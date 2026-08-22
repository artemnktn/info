import { GlobalConfiguration } from "../cfg"
import { ValidLocale } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"

interface Props {
  date: Date
  locale?: ValidLocale
  range?: string
}

export type ValidDateType = keyof Required<QuartzPluginData>["dates"]

export function getDate(cfg: GlobalConfiguration, data: QuartzPluginData): Date | undefined {
  if (!cfg.defaultDateType) {
    throw new Error(
      `Field 'defaultDateType' was not set in the configuration object of quartz.config.ts. See https://quartz.jzhao.xyz/configuration#general-configuration for more details.`,
    )
  }
  return data.dates?.[cfg.defaultDateType]
}

export function formatDate(d: Date, locale: ValidLocale = "en-US"): string {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}

export function getDateRange(data: QuartzPluginData): string | undefined {
  const raw = data.frontmatter?.date
  if (typeof raw !== "string") return undefined
  const match = raw.match(/^(\d{4})\s*[-–—]\s*(\d{4})$/)
  return match ? `${match[1]}–${match[2]}` : undefined
}

export function Date({ date, locale, range }: Props) {
  return <time datetime={date.toISOString()}>{range ?? formatDate(date, locale)}</time>
}
