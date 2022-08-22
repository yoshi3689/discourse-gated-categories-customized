import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    let elementArray;
    document.addEventListener("load", () => {
      elementArray = document.querySelectorAll('.below-site-header-outlet');
      elementArray[elementArray.length - 1].scrollIntoView();
    })
    window.addEventListener("resize", () => {
      elementArray[elementArray.length - 1].scrollIntoView();
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