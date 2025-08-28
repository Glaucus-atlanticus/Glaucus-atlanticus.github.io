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
  // Variable font proximity effect
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".hero-description");
  if (heroTitle && heroDescription) {
    const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    const range = weights[weights.length - 1] - weights[0];

    function updateWeight(event) {
      const x = Math.round(event.pageX * range / window.innerWidth);
      const weight = Math.round(x / 100) * 100 + 100;

      gsap.to(heroTitle, { '--wght': weight });
      gsap.to(heroDescription, { '--wght': weight });
    }

    document.body.addEventListener('mousemove', updateWeight);
  }

  // Profile card tilt effect
  const wrapRef = document.querySelector(".pc-card-wrapper");
  const cardRef = document.querySelector(".pc-card");

  if (wrapRef && cardRef) {
    let rafId = null;

    const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
    const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
    const adjust = (value, fromMin, fromMax, toMin, toMax) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    const easeInOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const updateCardTransform = (offsetX, offsetY) => {
      const width = cardRef.clientWidth;
      const height = cardRef.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
        "--rotate-x": `${round(-(centerY / 4))}deg`,
        "--rotate-y": `${round(centerX / 5)}deg`,
      };

      Object.entries(properties).forEach(([property, value]) => {
        wrapRef.style.setProperty(property, value);
      });
    };

    const createSmoothAnimation = (duration, startX, startY) => {
      const startTime = performance.now();
      const targetX = wrapRef.clientWidth / 2;
      const targetY = wrapRef.clientHeight / 2;

      const animationLoop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);
        updateCardTransform(currentX, currentY);
        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        }
      };
      rafId = requestAnimationFrame(animationLoop);
    };

    const cancelAnimation = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handlePointerMove = (event) => {
      const rect = cardRef.getBoundingClientRect();
      updateCardTransform(event.clientX - rect.left, event.clientY - rect.top);
    };

    const handlePointerEnter = () => {
      cancelAnimation();
      wrapRef.classList.add("active");
      cardRef.classList.add("active");
    };

    const handlePointerLeave = (event) => {
      createSmoothAnimation(600, event.offsetX, event.offsetY);
      wrapRef.classList.remove("active");
      cardRef.classList.remove("active");
    };

    cardRef.addEventListener("pointerenter", handlePointerEnter);
    cardRef.addEventListener("pointermove", handlePointerMove);
    cardRef.addEventListener("pointerleave", handlePointerLeave);

    // Initial animation
    const initialX = wrapRef.clientWidth - 70;
    const initialY = 60;
    updateCardTransform(initialX, initialY);
    createSmoothAnimation(1500, initialX, initialY);
  }
});
