import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      let element = document.querySelector('#main-outlet');
      element.scrollIntoView();
      window.scrollBy(0, 64);
      let styleSheet = document.createElement("style");
      styleSheet.innerHTML = ".topic-in-gated-category {overflow-y: hidden; }"

    })
  }
  api.onPageChange(() => {
    if (window.location.pathname.includes('/t/')) {
      document.querySelector("#main-outlet").classList.add("with-gated-category");
    } else {
      document.querySelector("#main-outlet").classList.remove("with-gated-category");
    }
  })
})