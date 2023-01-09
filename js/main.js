const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

/* Drop Down Menu */

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

basketStarterEl.addEventListener("click", (event) => {
  event.stopPropagation();
  if (basketEl.classList.contains("show")) {
    // remove show
    hideBasket();
  } else {
    // add show
    showBasket();
  }
});

basketEl.addEventListener("click", (event) => {
  event.stopPropagation();
});
window.addEventListener("click", () => {
  hideBasket();
});
