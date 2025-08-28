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

document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".hero-description");
  const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const range = weights[weights.length - 1] - weights[0];

  function updateWeight(event) {
    const x = Math.round(event.pageX * range / window.innerWidth);
    const weight = Math.round(x / 100) * 100 + 100;

    gsap.to(heroTitle, { '--wght': weight });
    gsap.to(heroDescription, { '--wght': weight });
  }

  document.body.addEventListener('mousemove', updateWeight);
});
