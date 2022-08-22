import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelector("#main-outlet").scrollIntoView();
      // scrollBy(0, 100);
    })
    window.addEventListener("resize", () => {
      if (document.querySelector(".topic-in-gated-category"))
      document.querySelector("#main-outlet").scrollIntoView();
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