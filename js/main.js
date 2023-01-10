// import = module 이므로,
// 사용하려면 최상단 html에 type="module"을 추가해야한다.
// <script defer type="module" src="./js/main.js"></script>
import ipads from "../data/ipads.js";

/* Drop Down Menu */
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

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

/* 요쇼의 가시성 관찰 */
// 화면에서 요소가 안보이면 이벤트는 발생하지 않으나
// 보이기 시작하면 show 클래스를 추가한다.
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});

const infoEls = document.querySelectorAll(".info");
infoEls.forEach((el) => {
  io.observe(el); // 관찰의 대상
});

/* 비디오 컨트롤 */

const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", () => {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});
pauseBtn.addEventListener("click", () => {
  video.pause();
  playBtn.classList.remove("hide");
  pauseBtn.classList.add("hide");
});

/* JS import하여 내용 출력하기 & Comment tagged templates 확장 프로그램 */
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach((ipad) => {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach((color) => {
    colorList += `<li style="background-color:${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail"> 
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
`;

  itemsEl.append(itemEl);
});
