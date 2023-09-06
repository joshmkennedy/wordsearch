import "./tailwind.css";
import App from "./App.svelte";

let app;
const targetEl = document.getElementById("app");
if (targetEl) {
  app = new App({
    target: targetEl,
  });
}
function preventBrowserHistorySwipeGestures() {
  function touchStart(ev) {
    if (ev.touches.length === 1) {
      const touch = ev.touches[0];
      if (
        (touch.clientX < window.innerWidth * 0.1 ||
        touch.clientX > window.innerWidth * 0.9) && ev.target.tagName !="BUTTON"
      ) {
        ev.preventDefault();
      }
    }
  }

  // Safari defaults to passive: true for the touchstart event, so we need  to explicitly specify false
  // See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  const options= { passive: false };

  window.addEventListener("touchstart", touchStart, options);

  return () => window.removeEventListener("touchstart", touchStart, options);
}

preventBrowserHistorySwipeGestures()
export default app;
