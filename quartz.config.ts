import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Artem Nikitin",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "artemnktn.github.io/info",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "local",
      cdnCaching: true,
      typography: {
        header: "Acumin Pro",
        body: "Acumin Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#DFDFDF",
          lightgray: "#8C00FF",
          gray: "#5A5A5A",
          darkgray: "#333333",
          dark: "#000000",
          secondary: "#9D9D9D",
          tertiary: "#8c00ff",
          highlight: "rgba(208, 208, 208, .4)",
          textHighlight: "#ffd60a88",
        },
        darkMode: {
          light: "#000000",
          lightgray: "#8C00FF",
          gray: "#5E129D",
          darkgray: "#e0e0e0",
          dark: "#ffffff",
          secondary: "#3B3B3B",
          tertiary: "#8c00ff",
          highlight: "rgba(140, 0, 255,.2)",
          textHighlight: "#ffd60a88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time (requires fonts; disable when using local Acumin Pro)
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
