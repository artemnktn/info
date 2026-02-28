import { normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

const htmlParser = new DOMParser()

export async function showContentModal(targetUrl: URL) {
  const existingCount = document.querySelectorAll(".graph-content-preview").length
  const cascadeOffset = existingCount * 24

  const overlay = document.createElement("div")
  overlay.className = "graph-content-preview"
  const inner = document.createElement("div")
  inner.className = "graph-content-inner"

  const dragHandle = document.createElement("div")
  dragHandle.className = "graph-content-drag-handle"

  const openLink = document.createElement("a")
  openLink.href = targetUrl.toString()
  openLink.className = "internal graph-content-open-link"
  openLink.setAttribute("aria-label", "Open page")
  openLink.dataset.routerIgnore = ""
  openLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`
  openLink.onclick = () => close()

  const closeBtn = document.createElement("button")
  closeBtn.className = "graph-content-close"
  closeBtn.setAttribute("aria-label", "Close")
  closeBtn.innerHTML = "×"
  closeBtn.type = "button"

  dragHandle.appendChild(openLink)
  dragHandle.appendChild(closeBtn)

  let posX = 0,
    posY = 0
  let dragStartX = 0,
    dragStartY = 0,
    innerStartX = 0,
    innerStartY = 0

  function initPosition() {
    const rect = inner.getBoundingClientRect()
    posX = rect.left + rect.width / 2 - window.innerWidth / 2
    posY = rect.top + rect.height / 2 - window.innerHeight / 2
  }

  function startDrag(clientX: number, clientY: number) {
    initPosition()
    dragStartX = clientX
    dragStartY = clientY
    innerStartX = posX
    innerStartY = posY

    function onMove(cx: number, cy: number) {
      posX = innerStartX + cx - dragStartX
      posY = innerStartY + cy - dragStartY
      inner.style.left = `calc(50% + ${posX}px)`
      inner.style.top = `calc(50% + ${posY}px)`
    }
    function onEnd() {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("touchmove", onTouchMove, { capture: true })
      document.removeEventListener("touchend", onTouchEnd)
      document.body.style.userSelect = ""
    }
    function onMouseMove(e: MouseEvent) {
      onMove(e.clientX, e.clientY)
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        e.preventDefault()
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    function onTouchEnd() {
      onEnd()
    }
    document.body.style.userSelect = "none"
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onEnd)
    document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })
    document.addEventListener("touchend", onTouchEnd)
  }

  dragHandle.onmousedown = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return
    e.preventDefault()
    startDrag(e.clientX, e.clientY)
  }
  dragHandle.ontouchstart = (e: TouchEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return
    if (e.touches.length > 0) {
      e.preventDefault()
      startDrag(e.touches[0].clientX, e.touches[0].clientY)
    }
  }

  function close() {
    overlay.classList.remove("active")
    overlay.addEventListener("transitionend", () => overlay.remove(), { once: true })
    document.removeEventListener("keydown", onEsc)
  }

  closeBtn.onclick = () => close()

  const onEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }
  document.addEventListener("keydown", onEsc)

  const contentWrap = document.createElement("div")
  contentWrap.className = "graph-content-body"

  try {
    const res = await fetchCanonical(targetUrl)
    const contentType = res.headers.get("Content-Type") ?? ""
    if (!contentType.startsWith("text/html")) {
      contentWrap.innerHTML = `<p>Cannot preview this content.</p>`
    } else {
      const html = htmlParser.parseFromString(await res.text(), "text/html")
      normalizeRelativeURLs(html, targetUrl)
      const elts = [...html.getElementsByClassName("popover-hint")]
      if (elts.length > 0) {
        elts.forEach((elt) => contentWrap.appendChild(elt.cloneNode(true)))
      } else {
        contentWrap.innerHTML = `<p>Preview not available.</p>`
      }
    }
  } catch {
    contentWrap.innerHTML = `<p>Failed to load content.</p>`
  }

  const MIN_W = 280
  const MIN_H = 200
  function setupResize(
    el: HTMLElement,
    corner: "se" | "sw" | "ne" | "nw",
    setPos?: (x: number, y: number) => void,
  ) {
    const handle = document.createElement("div")
    handle.className = `graph-window-resize-handle graph-window-resize-${corner}`
    handle.setAttribute("aria-label", "Resize")

    function startResize(clientX: number, clientY: number) {
      const rect = el.getBoundingClientRect()
      const startW = rect.width
      const startH = rect.height
      const startX = clientX
      const startY = clientY
      const startPosX = rect.left + rect.width / 2 - window.innerWidth / 2
      const startPosY = rect.top + rect.height / 2 - window.innerHeight / 2

      function update(cx: number, cy: number) {
        let w: number
        let h: number
        let dX = 0
        let dY = 0
        if (corner === "se") {
          w = Math.max(MIN_W, startW + cx - startX)
          h = Math.max(MIN_H, startH + cy - startY)
        } else if (corner === "sw") {
          w = Math.max(MIN_W, startW + startX - cx)
          h = Math.max(MIN_H, startH + cy - startY)
          dX = -(w - startW) / 2
        } else if (corner === "ne") {
          w = Math.max(MIN_W, startW + cx - startX)
          h = Math.max(MIN_H, startH + startY - cy)
          dY = -(h - startH) / 2
        } else {
          w = Math.max(MIN_W, startW + startX - cx)
          h = Math.max(MIN_H, startH + startY - cy)
          dX = -(w - startW) / 2
          dY = -(h - startH) / 2
        }
        el.style.width = `${w}px`
        el.style.maxWidth = "none"
        el.style.height = `${h}px`
        el.style.maxHeight = "none"
        if (setPos) setPos(startPosX + dX, startPosY + dY)
      }
      function onEnd() {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
        document.removeEventListener("touchmove", onTouchMove, { capture: true })
        document.removeEventListener("touchend", onTouchEnd)
        document.body.style.userSelect = ""
      }
      const onMouseMove = (ev: MouseEvent) => update(ev.clientX, ev.clientY)
      const onTouchMove = (ev: TouchEvent) => {
        if (ev.touches.length > 0) {
          ev.preventDefault()
          update(ev.touches[0].clientX, ev.touches[0].clientY)
        }
      }
      const onTouchEnd = () => onEnd()
      document.body.style.userSelect = "none"
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseup", onMouseUp)
      document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })
      document.addEventListener("touchend", onTouchEnd)
    }

    handle.onmousedown = (e: MouseEvent) => {
      e.preventDefault()
      startResize(e.clientX, e.clientY)
    }
    handle.ontouchstart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        startResize(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    return handle
  }

  const setInnerPos = (x: number, y: number) => {
    inner.style.left = `calc(50% + ${x}px)`
    inner.style.top = `calc(50% + ${y}px)`
  }
  ;(["se", "sw", "ne", "nw"] as const).forEach((corner) => {
    inner.appendChild(setupResize(inner, corner, setInnerPos))
  })

  inner.appendChild(dragHandle)
  inner.appendChild(contentWrap)
  overlay.appendChild(inner)
  document.body.appendChild(overlay)
  overlay.classList.add("active")

  if (cascadeOffset) {
    setInnerPos(cascadeOffset, cascadeOffset)
  }
}
