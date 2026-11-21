// Mark that JavaScript works (used by the reveal animation in CSS)
document.documentElement.classList.add("js");

// ---------- Mobile menu ----------
const sidebar = document.getElementById("sidebar");
const menuBtn = document.querySelector(".menu-btn");

function setMenu(open) {
  sidebar.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
sidebar.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// ---------- Highlight the current section in the menu ----------
const links = [...document.querySelectorAll(".nav a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && spy.observe(s));

// ---------- Reveal on scroll ----------
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        reveal.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 80 + "ms";
  reveal.observe(el);
});

// ---------- Portfolio filter ----------
const filterBtns = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    const f = btn.dataset.filter;
    cards.forEach((c) => c.classList.toggle("hide", f !== "all" && c.dataset.cat !== f));
  });
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
