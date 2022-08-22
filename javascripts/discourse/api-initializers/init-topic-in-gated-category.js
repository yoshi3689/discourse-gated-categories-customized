import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelector(".fancy-title").scrollIntoView();
      scrollBy(0, -60);
    })
    window.addEventListener("resize", () => {
      if (document.querySelector(".topic-in-gated-category"))
      document.querySelector(".fancy-title").scrollIntoView();
      scrollBy(0, -60);
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