const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
document.documentElement.classList.add("js");
menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = [
  ...document.querySelectorAll(
    ".section-heading, .story-copy, blockquote, .mission, .program-hero > div, .ai-literacy, .join-inner > div"
  )
];

if (!reducedMotion && "IntersectionObserver" in window) {
  revealTargets.forEach((element) => element.classList.add("reveal", "reveal-ready"));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -20px" });

  revealTargets.forEach((element) => revealObserver.observe(element));

  // Safety fallback: content can never remain hidden if observation is interrupted.
  window.setTimeout(() => {
    revealTargets.forEach((element) => element.classList.add("visible"));
  }, 1800);
}

const photoMarquee = document.querySelector(".photo-marquee");
const photoTracks = document.querySelectorAll(".photo-track");

photoMarquee?.addEventListener("pointerenter", () => {
  photoTracks.forEach((track) => { track.style.animationPlayState = "paused"; });
});

photoMarquee?.addEventListener("pointerleave", () => {
  photoTracks.forEach((track) => { track.style.animationPlayState = "running"; });
});
