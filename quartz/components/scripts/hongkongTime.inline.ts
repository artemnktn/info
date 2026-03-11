function formatHKTime(): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Hong_Kong",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

function updateTimes() {
  document.querySelectorAll(".hongkong-time").forEach((el) => {
    el.textContent = formatHKTime()
  })
}

function init() {
  updateTimes()
  const id = setInterval(updateTimes, 1000)
  window.addCleanup?.(() => clearInterval(id))
}

document.addEventListener("nav", init)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}
