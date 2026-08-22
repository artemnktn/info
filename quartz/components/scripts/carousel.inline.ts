function setupCarousel(callout: HTMLElement) {
  if (callout.dataset.carouselReady === "true") return

  const content = callout.querySelector(":scope > .callout-content") as HTMLElement | null
  if (!content) return

  const images = [...content.querySelectorAll("img")]
  if (images.length === 0) return

  callout.dataset.carouselReady = "true"
  callout.querySelector(":scope > .callout-title")?.remove()

  const viewport = document.createElement("div")
  viewport.className = "carousel-viewport"
  const track = document.createElement("div")
  track.className = "carousel-track"
  viewport.appendChild(track)

  images.forEach((img, index) => {
    const slide = document.createElement("div")
    slide.className = "carousel-slide"
    slide.setAttribute("aria-hidden", index === 0 ? "false" : "true")

    const link = img.closest("a")
    if (link && content.contains(link)) {
      slide.appendChild(link)
    } else {
      slide.appendChild(img)
    }
    track.appendChild(slide)
  })

  const controls = document.createElement("div")
  controls.className = "carousel-controls"

  const previous = document.createElement("button")
  previous.type = "button"
  previous.className = "carousel-arrow carousel-previous"
  previous.setAttribute("aria-label", "Previous image")
  previous.textContent = "←"

  const dots = document.createElement("div")
  dots.className = "carousel-dots"
  dots.setAttribute("aria-label", "Choose image")

  const next = document.createElement("button")
  next.type = "button"
  next.className = "carousel-arrow carousel-next"
  next.setAttribute("aria-label", "Next image")
  next.textContent = "→"

  controls.append(previous, dots, next)
  content.replaceChildren(viewport, controls)

  let current = 0
  const slides = [...track.children] as HTMLElement[]
  const dotButtons = slides.map((_, index) => {
    const dot = document.createElement("button")
    dot.type = "button"
    dot.className = "carousel-dot"
    dot.setAttribute("aria-label", `Show image ${index + 1}`)
    dot.addEventListener("click", () => show(index))
    dots.appendChild(dot)
    return dot
  })

  function show(index: number) {
    current = (index + slides.length) % slides.length
    track.style.transform = `translateX(-${current * 100}%)`
    slides.forEach((slide, slideIndex) =>
      slide.setAttribute("aria-hidden", slideIndex === current ? "false" : "true"),
    )
    dotButtons.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === current))
  }

  const showPrevious = () => show(current - 1)
  const showNext = () => show(current + 1)
  previous.addEventListener("click", showPrevious)
  next.addEventListener("click", showNext)

  let touchStartX = 0
  const onTouchStart = (event: TouchEvent) => {
    touchStartX = event.changedTouches[0]?.clientX ?? 0
  }
  const onTouchEnd = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX
    const distance = touchEndX - touchStartX
    if (Math.abs(distance) < 40) return
    distance > 0 ? showPrevious() : showNext()
  }
  viewport.addEventListener("touchstart", onTouchStart, { passive: true })
  viewport.addEventListener("touchend", onTouchEnd, { passive: true })

  if (slides.length < 2) controls.hidden = true
  show(0)
}

document.addEventListener("nav", () => {
  document
    .querySelectorAll<HTMLElement>('.callout[data-callout="carousel"]')
    .forEach(setupCarousel)
})
