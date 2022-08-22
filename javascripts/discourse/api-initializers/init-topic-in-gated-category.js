import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      let elementArray = document.querySelectorAll('.below-site-header-outlet');
      elementArray[elementArray.length - 1].scrollIntoView();
      // window.scrollBy(0, -100);
      // let styleSheet = document.createElement("style");
      // styleSheet.innerHTML = ".topic-in-gated-category { }"
      // document.body.appendChild(styleSheet);
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