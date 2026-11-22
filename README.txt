AHMED BERRECHACH - PORTFOLIO (static website: HTML + CSS + JS)

FOLDER
  index.html      the page (all text lives here)
  css/style.css   design (colors are at the top, in :root)
  js/main.js      menu, filter, animations, contact form
  privacy.html    Privacy Policy
  terms.html      Terms of Use
  404.html        "page not found" page
  robots.txt      search engine rules
  assets/         put your images here (ahmed.jpg is your photo)
  fonts/          fonts stored locally, nothing to install

RUN IT IN VS CODE
  1. File > Open Folder > choose this folder
  2. Install the extension "Live Server" (Ritwick Dey)
  3. Right-click index.html > Open with Live Server

ADD / EDIT A PROJECT CARD (index.html, section Portfolio)
  - copy a <article class="card"> block, put a screenshot (about 1280x600 jpg) in assets/
  - change the text, tags and badge (Coming soon / Live)

CHANGE COLORS
  css/style.css, top of the file: --yellow, --ink, --paper

CONTACT FORM (sends messages to ahmed.berrechach1@gmail.com)
  - Uses the free FormSubmit service. It needs a web server (http/https): it will NOT send from file:// or
    the first time you open it without Live Server.
  - ONE-TIME ACTIVATION: after publishing the site, send a first test message from the form.
    FormSubmit emails you an "Activate Form" link. Click it once. After that every message lands in your inbox
    (also check Spam/Promotions the first time).

WHEN YOU HAVE A DOMAIN
  - Add <link rel="canonical"> and an og:image / sitemap.xml with your real address.
