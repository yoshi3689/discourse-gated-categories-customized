import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  // scroll down to the top of the topic name on load and resize events
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      var elementArray = document.querySelectorAll('.below-site-header-outlet');
      elementArray[elementArray.length - 1].scrollIntoView();
    })
    window.addEventListener("resize", () => {
      elementArray[elementArray.length - 1].scrollIntoView();
    })
  }
  api.onPageChange(() => {
    // add a class to conditionally style gated category related elements
    if (window.location.pathname.includes('/t/')) {
      document.querySelector("#main-outlet").classList.add("with-gated-category");
    } else {
      document.querySelector("#main-outlet").classList.remove("with-gated-category");
    }
  })
})