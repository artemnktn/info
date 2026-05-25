import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: { },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // Component.ContentMeta(),
    Component.TagList(),
    Component.ContentProperties(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      gap: "0.25rem",
      components: [
        { Component: Component.Search() },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(Component.Contact()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.DesktopOnly(Component.HongKongTime()),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle() /*, Component.ContentMeta()*/],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      gap: "0.25rem",
      components: [
        { Component: Component.Search() },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(Component.Contact()),
  ],
  right: [
    Component.DesktopOnly(Component.HongKongTime()),
  ],
}
