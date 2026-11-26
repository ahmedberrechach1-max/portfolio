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
// ---------- Theme + Language ----------
;(() => {
  const root = document.documentElement;
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  // Theme
  const themeBtn = document.getElementById("theme-btn");
  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === "dark" ? "☀" : "☾";
    save("theme", t);
  }
  themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
  setTheme(load("theme") || "light");

  // Language (English is read from the HTML)
  const year = new Date().getFullYear();
  const T = {
    ".skip": { fr: ["Aller au contenu"], ar: ["انتقل إلى المحتوى"] },
    ".nav a": {
      fr: ["<i></i>Accueil", "<i></i>À propos", "<i></i>Compétences", "<i></i>Portfolio", "<i></i>Contact"],
      ar: ["<i></i>الرئيسية", "<i></i>من أنا", "<i></i>المهارات", "<i></i>أعمالي", "<i></i>تواصل معي"]
    },
      ".status": { fr: ["<b></b> Ouvert aux opportunités"], ar: ["<b></b> متاح لفرص جديدة"] },
    ".hi": { fr: ["Bonjour !"], ar: ["مرحباً!"] },
    ".hero h1": { fr: ["Je suis <em>Ahmed</em>"], ar: ["أنا <em>أحمد</em>"] },
    ".role": { fr: ["Développeur Web"], ar: ["مطور ويب"] },
    ".lead": {
      fr: ["Je crée des landing pages et des sites web pour les restaurants, cafés, boutiques et entreprises, et je corrige les bugs qui cassent votre site. Basé à Beni Mellal, au Maroc, je travaille avec des clients du monde entier."],
      ar: ["أصمم صفحات هبوط ومواقع للمطاعم والمقاهي والمتاجر والشركات، وأصلح الأخطاء التي تعطل موقعك. مقيم في بني ملال بالمغرب، وأعمل مع عملاء من جميع أنحاء العالم."]
    },
    ".actions .btn": { fr: ["Voir mes projets", "Me contacter"], ar: ["شاهد أعمالي", "تواصل معي"] },
    ".chip-c": { fr: ["Correction de bugs"], ar: ["إصلاح الأخطاء"] },

    "#about .eyebrow": { fr: ["01 / À propos"], ar: ["01 / من أنا"] },
    "#about h2": { fr: ["À propos de moi"], ar: ["نبذة عني"] },
    ".about-copy p": {
      fr: [
        "Je suis <strong>Ahmed Berrechach</strong>, un développeur web qui crée des pages qui présentent clairement une entreprise et attirent des clients.",
        "Je travaille avec HTML, CSS, JavaScript, PHP et MySQL. Je me concentre sur les landing pages et les sites vitrines pour les restaurants, cafés, boutiques et entreprises, ainsi que les sites de commande en ligne.",
        "Je suis aussi la personne à appeler quand quelque chose ne marche plus. J'aime trouver la vraie cause d'un bug et la corriger correctement. Avec mon expérience en service client et support informatique, je réponds vite et j'explique simplement."
      ],
      ar: [
        "أنا <strong>أحمد برشاش</strong>، مطور ويب أبني صفحات تقدم نشاطك التجاري بوضوح وتجلب لك الزبائن.",
        "أشتغل بـ HTML وCSS وJavaScript وPHP وMySQL. أركز على صفحات الهبوط والمواقع التعريفية للمطاعم والمقاهي والمتاجر والشركات، بالإضافة إلى مواقع استقبال الطلبات.",
        "وأنا أيضاً من تتصل به عندما يتعطل شيء ما. أستمتع بإيجاد السبب الحقيقي للخطأ وإصلاحه بشكل صحيح. بفضل خبرتي في خدمة العملاء والدعم التقني، أرد بسرعة وأشرح بكلمات بسيطة."
      ]
    },
    ".stats span": {
      fr: ["Diplôme en<br />développement informatique", "Stages<br />effectués", "Technologies<br />web de base", "Niveau<br />d'anglais"],
      ar: ["دبلوم في<br />التطوير المعلوماتي", "تداريب<br />مكتملة", "تقنيات ويب<br />أساسية", "مستوى<br />الإنجليزية"]
    },
    "h3.sub": { fr: ["Mes services"], ar: ["ماذا أقدم"] },
    ".service h4": {
      fr: ["Landing pages et sites d'entreprise", "Sites pour restaurants, cafés et boutiques", "Sites de commande en ligne", "Correction de bugs"],
      ar: ["صفحات الهبوط ومواقع الشركات", "مواقع المطاعم والمقاهي والمتاجر", "مواقع الطلب عبر الإنترنت", "إصلاح الأخطاء"]
    },
    ".service p": {
      fr: [
        "Des pages de présentation claires : un premier écran percutant, des éléments de confiance et des boutons de contact.",
        "Menu ou produits, horaires, carte et bouton WhatsApp pour vous contacter en un clic.",
        "Pages de commande et de réservation : le client choisit, envoie ses coordonnées et vous recevez la commande.",
        "Mise en page cassée sur mobile, formulaires qui n'envoient pas, erreurs JavaScript, pages lentes. Je trouve la cause et je la corrige."
      ],
      ar: [
        "صفحات تعريفية واضحة: واجهة أولى قوية، عناصر تبني الثقة وأزرار للتواصل.",
        "قائمة الطعام أو المنتجات، أوقات العمل، الخريطة وزر واتساب ليصل إليك الزبون بنقرة واحدة.",
        "صفحات للطلب والحجز: يختار الزبون ما يريد ويرسل معلوماته فيصلك الطلب.",
        "تصميم مختل على الهاتف، نماذج لا ترسل، أخطاء JavaScript وصفحات بطيئة. أجد السبب وأصلحه."
      ]
    },

    "#skills .eyebrow": { fr: ["02 / Compétences"], ar: ["02 / المهارات"] },
    "#skills .tags li:nth-child(n+7)": { fr: ["Design responsive", "Débogage"], ar: ["تصميم متجاوب", "تصحيح الأخطاء"] },

    "#portfolio .eyebrow": { fr: ["03 / Portfolio"], ar: ["03 / أعمالي"] },
    "#portfolio h2": { fr: ["Portfolio"], ar: ["أعمالي"] },
    ".filters button": {
      fr: ["Tout", "Pages pro", "Commande", "Applications web"],
      ar: ["الكل", "صفحات تجارية", "الطلبات", "تطبيقات الويب"]
    },
    ".card .badge": {
      fr: ["Bientôt", "Bientôt", "Bientôt", "Bientôt", "Bientôt", "Bientôt", "Projet de fin d'études"],
      ar: ["قريباً", "قريباً", "قريباً", "قريباً", "قريباً", "قريباً", "مشروع التخرج"]
    },
    ".card h4": {
      fr: ["Restaurant Dar Zitoun", "Landing page Atlas Solar", "Site de clinique médicale", "Salon de coiffure Fade Studio", "Commande de café Brew & Bean", "Boutique gaming Level Up", "Plateforme clients-artisans Swbly"],
      ar: ["مطعم دار الزيتون", "صفحة هبوط Atlas Solar", "موقع عيادة طبية", "صالون الحلاقة Fade Studio", "طلب القهوة Brew & Bean", "متجر الألعاب Level Up", "منصة Swbly للزبائن والحرفيين"]
    },
    ".card p": {
      fr: [
        "Site de restaurant en français, anglais et arabe avec menu, horaires, carte et réservation de table.",
        "Landing page pour une société d'installation solaire : offre claire, avantages et demande de devis.",
        "Site vitrine pour une clinique ophtalmologique : services, horaires, contact et prise de rendez-vous.",
        "Page orientée réservation pour un barbier, avec un choix rapide du créneau.",
        "Le client choisit boissons et pâtisseries, remplit le panier et confirme sur WhatsApp.",
        "Boutique de consoles, jeux et accessoires avec recherche, panier et confirmation sur WhatsApp.",
        "Application web dynamique qui met en relation clients et artisans : inscription, connexion et recherche par métier."
      ],
      ar: [
        "موقع مطعم بالفرنسية والإنجليزية والعربية مع قائمة الطعام وأوقات العمل والخريطة وحجز الطاولات.",
        "صفحة هبوط لشركة تركيب الطاقة الشمسية: عرض واضح ومزايا وأزرار طلب عرض السعر.",
        "موقع تعريفي لعيادة عيون مع الخدمات وأوقات العمل ومعلومات الاتصال وأزرار المواعيد.",
        "صفحة تركز على الحجز لصالون حلاقة رجالي، مع اختيار سريع للموعد.",
        "يختار الزبون المشروبات والحلويات ويملأ السلة ثم يؤكد الطلب عبر واتساب.",
        "متجر للأجهزة والألعاب والإكسسوارات مع البحث والسلة وتأكيد الطلب عبر واتساب.",
        "تطبيق ويب ديناميكي يربط الزبائن بالحرفيين، مع التسجيل وتسجيل الدخول والبحث حسب الحرفة."
      ]
    },

    "#contact .eyebrow": { fr: ["04 / Contact"], ar: ["04 / تواصل معي"] },
    "#contact h2": { fr: ["Travaillons ensemble"], ar: ["لنعمل معاً"] },
    ".contact-grid .big": {
      fr: ["Besoin d'une landing page, d'un site pour votre entreprise ou d'une correction de bug ? Expliquez-moi votre besoin et je vous répondrai avec un plan et un prix clairs."],
      ar: ["تحتاج صفحة هبوط أو موقعاً لنشاطك أو إصلاح خطأ؟ أخبرني بما تحتاجه وسأرد عليك بخطة وسعر واضحين."]
    },
    ".contact-list span": { fr: ["E-mail", "WhatsApp", "LinkedIn"], ar: ["البريد", "واتساب", "لينكدإن"] },
    ".contact-list li:nth-child(4)": { fr: ["<span>Ville</span>Beni Mellal, Maroc"], ar: ["<span>الموقع</span>بني ملال، المغرب"] },
    ".contact-list li:nth-child(5)": { fr: ["<span>Langues</span>Anglais, arabe"], ar: ["<span>اللغات</span>الإنجليزية، العربية"] },
    ".form label": {
      fr: ["Votre nom", "Votre e-mail", "Votre besoin"],
      ar: ["اسمك", "بريدك الإلكتروني", "ماذا تحتاج؟"]
    },
    ".consent": {
      fr: ['En envoyant ce message, vous acceptez la <a href="privacy.html">Politique de confidentialité</a>.'],
      ar: ['بإرسال هذه الرسالة فأنت توافق على <a href="privacy.html">سياسة الخصوصية</a>.']
    },
    ".form button": { fr: ["Envoyer"], ar: ["إرسال الرسالة"] },
    ".foot > p": {
      fr: [`© ${year} Ahmed Berrechach. Tous droits réservés.`],
      ar: [`© ${year} أحمد برشاش. جميع الحقوق محفوظة.`]
    },
    ".foot-links a": { fr: ["Confidentialité", "Conditions d'utilisation"], ar: ["سياسة الخصوصية", "شروط الاستخدام"] }
  };

  // Form messages
  const MSG = {
    "Thank you! Your message has been sent.": {
      fr: "Merci ! Votre message a été envoyé.", ar: "شكراً! تم إرسال رسالتك." },
    "Please wait a few seconds before sending another message.": {
      fr: "Veuillez patienter quelques secondes avant un nouvel envoi.", ar: "المرجو الانتظار بضع ثوان قبل إرسال رسالة أخرى." },
    "Thank you! Your message has been sent. I'll reply as soon as possible.": {
      fr: "Merci ! Votre message a été envoyé. Je vous répondrai dès que possible.", ar: "شكراً! تم إرسال رسالتك. سأرد عليك في أقرب وقت." },
    "Sorry, the message could not be sent. Please email me directly at ahmed.berrechach1@gmail.com or message me on WhatsApp.": {
      fr: "Désolé, l'envoi a échoué. Écrivez-moi à ahmed.berrechach1@gmail.com ou sur WhatsApp.", ar: "عذراً، تعذر إرسال الرسالة. راسلني على ahmed.berrechach1@gmail.com أو عبر واتساب." }
  };

  // Save the original English content
  const items = Object.keys(T).map((sel) => {
    const isLabel = sel === ".form label";
    const els = [...document.querySelectorAll(sel)];
    const en = els.map((el) => (isLabel ? el.firstChild.nodeValue : el.innerHTML));
    return { sel, isLabel, els, en };
  });
  const enTitle = document.title;
  const titles = { en: enTitle, fr: "Ahmed Berrechach | Développeur Web", ar: "أحمد برشاش | مطور ويب" };
  let lang = "en";

  function setLang(l) {
    lang = titles[l] ? l : "en";
    items.forEach(({ sel, isLabel, els, en }) => {
      const values = lang === "en" ? en : T[sel][lang];
      els.forEach((el, i) => {
        if (values[i] === undefined) return;
        if (isLabel) el.firstChild.nodeValue = values[i];
        else el.innerHTML = values[i];
      });
    });
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = titles[lang];
    document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    setStatus("", "");
    save("lang", lang);
  }

  const originalSetStatus = setStatus;
  setStatus = (text, type) => originalSetStatus(MSG[text]?.[lang] || text, type);

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    const btn = e.target.querySelector("button[type=submit]");
    if (btn.disabled && lang !== "en") btn.textContent = lang === "ar" ? "جاري الإرسال..." : "Envoi...";
  });

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  setLang(load("lang") || "en");
})();