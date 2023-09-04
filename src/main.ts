import "./tailwind.css";
import App from "./App.svelte";

let app;
const targetEl = document.getElementById("app");
if (targetEl) {
  app = new App({
    target: targetEl,
  });
}

export default app;
