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

// ---------- Contact form (sends to Ahmed's email via FormSubmit) ----------
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const ENDPOINT = "https://formsubmit.co/ajax/ahmed.berrechach1@gmail.com";
const MIN_GAP_MS = 30000; // anti-spam: one message every 30 seconds
let lastSent = 0;

function setStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = "form-status " + (type || "");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Bots fill the hidden field: pretend success and stop
  if (form.elements["_honey"].value) { setStatus("Thank you! Your message has been sent.", "ok"); form.reset(); return; }

  if (!form.checkValidity()) { form.reportValidity(); return; }

  if (Date.now() - lastSent < MIN_GAP_MS) {
    setStatus("Please wait a few seconds before sending another message.", "err");
    return;
  }

  const btn = form.querySelector("button[type=submit]");
  const label = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Sending...";
  setStatus("", "");

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: form.elements["name"].value.trim(),
        email: form.elements["email"].value.trim(),
        message: form.elements["message"].value.trim(),
        _subject: form.elements["_subject"].value,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) throw new Error("send failed");

    lastSent = Date.now();
    form.reset();
    setStatus("Thank you! Your message has been sent. I'll reply as soon as possible.", "ok");
  } catch (err) {
    setStatus("Sorry, the message could not be sent. Please email me directly at ahmed.berrechach1@gmail.com or message me on WhatsApp.", "err");
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
});
