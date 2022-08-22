import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  if (window.location.pathname.includes('/t/')) {
    document.addEventListener("DOMContentLoaded", () => {
      let element = document.querySelector('#main-outlet');
      let headerOffset = 100;
    let elementPosition = element.getBoundingClientRect().top;
    let offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
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