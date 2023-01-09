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
window.addEventListener("click", hideBasket);

/* Search */
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]; // 전개 연산자
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")]; // 전개 연산자

// 검색 아이콘 클릭 => 검색창 나타남
function showSearch() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed"); // htmlElement add class "fixed"

  // 기본메뉴의 애니메이션
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });

  // 검색창의 애니메이션
  searchDelayEls.forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });

  // 검색창의 포커스
  setTimeout(() => {
    searchInputEl.focus();
  }, 800); //0.8s
}

// 검색 영역 제외 클릭 => 검색창 닫힘
function hideSearch() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");

  // 기본메뉴의 애니메이션
  headerMenuEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });

  // 검색창의 애니메이션
  searchDelayEls.reverse().forEach((el, index) => {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  // 뒤집어진 배열 재정렬
  searchDelayEls.reverse();

  // 검색창 닫고나면 내용 초기화
  searchInputEl.value = "";
}

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", hideSearch);
searchShadowEl.addEventListener("click", hideSearch);
