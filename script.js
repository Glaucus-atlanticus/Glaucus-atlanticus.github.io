const headerMenu = document.querySelector(".header");
const burgerMenu = headerMenu.querySelector(".burger");
const headerBackdrop = headerMenu.querySelector(".header-backdrop");
const closeMenu = headerMenu.querySelector(".close-menu");

if (headerMenu && burgerMenu) {
  burgerMenu.addEventListener("click", function () {
    burgerMenu.classList.toggle("is-active");
    headerMenu.classList.toggle("menu-is-active");
    document.body.classList.toggle("overflow-hidden");
    document.body.setAttribute("data-lenis-prevent","");
  });

headerBackdrop.addEventListener("click", function () {
  burgerMenu.classList.remove("is-active");
  headerMenu.classList.remove("menu-is-active");
  document.body.classList.remove("overflow-hidden");
  document.body.removeAttribute("data-lenis-prevent");
});

closeMenu.addEventListener("click", function (){
  burgerMenu.classList.remove("is-active");
  headerMenu.classList.remove("menu-is-active");
  document.body.classList.remove("overflow-hidden");
  document.body.removeAttribute("data-lenis-prevent");
});
}

winder.addEventListener("scroll", funtion () {
  if (
    this.scrollY >=
    document.querySelector(".hero-section").offsetHeight / 2
    ) {
    headerMenu.classList.add("on-scroll");
  } else {
    headerMenu.classList.remove("on-scroll");
  }
});
