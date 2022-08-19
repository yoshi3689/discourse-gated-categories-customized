import {
  apiInitializer
} from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  api.onPageChange(() => {
    if (window.location.pathname.includes('/t/')) {
      document.querySelector(".fancy-title").scrollIntoView();
    }
  })
})