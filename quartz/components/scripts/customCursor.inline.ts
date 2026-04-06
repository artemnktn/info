document.addEventListener("nav", () => {
  const cursor = document.getElementById("custom-cursor")
  if (!cursor) return

  const isTouch = window.matchMedia("(pointer: coarse)").matches
  if (isTouch) {
    cursor.style.display = "none"
    document.body.classList.remove("custom-cursor-active")
    return
  }

  document.body.classList.add("custom-cursor-active")

  const move = (e: MouseEvent) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }

  // Keep mousemove during graph drag.
  window.addEventListener("mousemove", move, true)
  window.addCleanup(() => {
    window.removeEventListener("mousemove", move, true)
    document.body.classList.remove("custom-cursor-active")
  })
})
