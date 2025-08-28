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

gsap.registerPlugin(ScrambleTextPlugin);

document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline();

  tl.to(".hero-title", {
    duration: 2,
    scrambleText: {
      text: "Your Name",
      chars: "upperCase",
      speed: 0.3,
    },
  }).to(".hero-description", {
    duration: 3,
    scrambleText: {
      text: "I am a passionate web developer with a love for creating beautiful and functional websites.",
      chars: "lowerCase",
      speed: 0.1,
    },
  }, "-=1.5");
});
