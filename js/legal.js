// Footer year
document.querySelectorAll("#year").forEach((el) => (el.textContent = new Date().getFullYear()));

;(() => {
  const root = document.documentElement;
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const load = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  // Theme
  if (load("theme") === "dark") root.dataset.theme = "dark";

  const page = document.querySelector(".notfound") ? "notfound" : document.title.startsWith("Terms") ? "terms" : "privacy";
  const mail = '<a href="mailto:ahmed.berrechach1@gmail.com">ahmed.berrechach1@gmail.com</a>';

  const T = {
    privacy: {
      fr: {
        title: "Politique de confidentialité | Ahmed Berrechach",
        body: `
<h1>Politique de confidentialité</h1>
<p class="updated">Dernière mise à jour : 26 novembre 2026. En cas de différence, la version anglaise fait foi.</p>
<h2>1. Qui suis-je</h2>
<p>Ce site est le portfolio personnel d'<strong>Ahmed Berrechach</strong>, développeur web freelance basé à Beni Mellal, au Maroc. Je suis responsable des données personnelles décrites sur cette page.</p>
<p>Contact : ${mail}</p>
<h2>2. Les données que je collecte</h2>
<p>Je collecte uniquement les informations que vous choisissez de m'envoyer lorsque vous me contactez par e-mail, WhatsApp ou LinkedIn :</p>
<ul><li>votre nom</li><li>votre adresse e-mail</li><li>le contenu de votre message</li></ul>
<p>Si vous me contactez par WhatsApp, LinkedIn ou e-mail, je reçois les informations que ces services partagent avec moi, comme votre nom, numéro de téléphone ou profil.</p>
<h2>3. Pourquoi je les utilise</h2>
<p>J'utilise vos données uniquement pour lire votre message, vous répondre et préparer un devis ou réaliser un projet que vous demandez. Je ne les utilise pas pour la publicité, je ne les vends pas et je ne les partage avec personne à des fins marketing.</p>
<p>La base légale est votre consentement (vous envoyez vous-même le message) et, si nous travaillons ensemble, les démarches nécessaires avant et pendant un contrat.</p>
<h2>4. Comment me contacter</h2>
<p>Le site n'a ni base de données ni formulaire de contact actif. Si vous m'écrivez par e-mail, je reçois votre message dans ma boîte (Gmail). Si vous utilisez WhatsApp ou LinkedIn, votre message passe par ces services, selon leurs propres politiques de confidentialité.</p>
<h2>5. Cookies, statistiques et suivi</h2>
<p>Ce site n'utilise <strong>pas</strong> de cookies, de traceurs publicitaires ni d'outils d'analyse. Les polices sont hébergées sur le site, aucune requête n'est donc envoyée à des fournisseurs de polices lors de votre visite.</p>
<p>Vos choix de langue et de thème sont enregistrés uniquement dans votre navigateur (stockage local), pour que le site s'en souvienne à votre prochaine visite.</p>
<h2>6. Liens externes</h2>
<p>Le site contient des liens vers LinkedIn et WhatsApp. En cliquant dessus, vous quittez ce site et leurs propres politiques de confidentialité s'appliquent.</p>
<h2>7. Durée de conservation</h2>
<p>Les messages sont conservés aussi longtemps que nécessaire pour vous répondre et, si nous travaillons ensemble, pendant la durée du projet et la période requise pour conserver les documents professionnels. Vous pouvez demander leur suppression à tout moment.</p>
<h2>8. Vos droits</h2>
<p>Vous pouvez à tout moment demander l'accès, la correction ou la suppression de vos données, en limiter l'utilisation ou retirer votre consentement. Écrivez à ${mail} et je répondrai dès que possible.</p>
<p>Si vous vivez au Maroc, vous bénéficiez aussi des droits prévus par la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, et vous pouvez contacter la CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Si vous vivez dans l'Union européenne, vous pouvez contacter votre autorité locale de protection des données.</p>
<h2>9. Sécurité</h2>
<p>Je prends des mesures raisonnables pour protéger vos informations. Aucune transmission sur Internet n'étant sûre à 100 %, n'envoyez pas de mots de passe ni de données sensibles dans vos messages.</p>
<h2>10. Enfants</h2>
<p>Ce site ne s'adresse pas aux enfants de moins de 16 ans et je ne collecte pas sciemment leurs données.</p>
<h2>11. Modifications</h2>
<p>Je peux mettre à jour cette politique. La date en haut de la page indique la dernière version.</p>`
      },
      ar: {
        title: "سياسة الخصوصية | أحمد برشاش",
        body: `
<h1>سياسة الخصوصية</h1>
<p class="updated">آخر تحديث: 26 نونبر 2026. في حالة أي اختلاف، تعتمد النسخة الإنجليزية.</p>
<h2>1. من أنا</h2>
<p>هذا الموقع هو المعرض الشخصي لـ <strong>أحمد برشاش</strong>، مطور ويب مستقل مقيم في بني ملال بالمغرب. أنا المسؤول عن المعطيات الشخصية الموصوفة في هذه الصفحة.</p>
<p>للتواصل: ${mail}</p>
<h2>2. المعطيات التي أجمعها</h2>
<p>أجمع فقط المعلومات التي تختار إرسالها إلي عند التواصل معي عبر البريد الإلكتروني أو واتساب أو لينكدإن:</p>
<ul><li>اسمك</li><li>بريدك الإلكتروني</li><li>محتوى رسالتك</li></ul>
<p>إذا تواصلت معي عبر واتساب أو لينكدإن أو البريد الإلكتروني، أتوصل بالمعلومات التي تشاركها معي هذه الخدمات، مثل اسمك أو رقم هاتفك أو ملفك الشخصي.</p>
<h2>3. لماذا أستعملها</h2>
<p>أستعمل معطياتك فقط لقراءة رسالتك والرد عليك وإعداد عرض سعر أو إنجاز مشروع تطلبه. لا أستعملها للإشهار، ولا أبيعها، ولا أشاركها مع أي أحد لأغراض تسويقية.</p>
<p>الأساس القانوني هو موافقتك (أنت من يرسل الرسالة)، وإذا اشتغلنا معاً، الإجراءات اللازمة قبل العقد وأثناءه.</p>
<h2>4. كيف تتواصل معي</h2>
<p>لا يتوفر الموقع على قاعدة بيانات ولا على نموذج اتصال مفعل. إذا راسلتني بالبريد الإلكتروني، تصلني رسالتك في بريدي (Gmail). وإذا استعملت واتساب أو لينكدإن، تمر رسالتك عبر هذه الخدمات وفق سياسات الخصوصية الخاصة بها.</p>
<h2>5. ملفات الكوكيز والتتبع</h2>
<p>هذا الموقع <strong>لا</strong> يستعمل ملفات الكوكيز ولا أدوات التتبع الإشهاري أو التحليلات. الخطوط مستضافة داخل الموقع، لذلك لا يرسل أي طلب إلى مزودي الخطوط عند زيارتك.</p>
<p>يتم حفظ اختيارك للغة والمظهر في متصفحك فقط (التخزين المحلي)، حتى يتذكرها الموقع في زيارتك القادمة.</p>
<h2>6. الروابط الخارجية</h2>
<p>يتضمن الموقع روابط إلى لينكدإن وواتساب. عند النقر عليها تغادر هذا الموقع وتطبق سياسات الخصوصية الخاصة بها.</p>
<h2>7. مدة الاحتفاظ بالمعطيات</h2>
<p>يتم الاحتفاظ بالرسائل طالما كان ذلك لازماً للرد عليك، وإذا اشتغلنا معاً، طيلة مدة المشروع والفترة اللازمة لحفظ الوثائق المهنية. يمكنك أن تطلب حذف رسائلك في أي وقت.</p>
<h2>8. حقوقك</h2>
<p>يمكنك في أي وقت طلب الاطلاع على معطياتك أو تصحيحها أو حذفها، أو تقييد استعمالها، أو سحب موافقتك. راسلني على ${mail} وسأرد في أقرب وقت.</p>
<p>إذا كنت تقيم في المغرب، فلك أيضاً الحقوق التي ينص عليها القانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، ويمكنك الاتصال باللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP). وإذا كنت تقيم في الاتحاد الأوروبي، يمكنك الاتصال بالسلطة المحلية لحماية البيانات.</p>
<h2>9. الأمان</h2>
<p>أتخذ إجراءات معقولة لحماية معلوماتك. لا توجد وسيلة إرسال عبر الإنترنت آمنة بنسبة 100%، لذا لا ترسل كلمات السر أو معطيات حساسة في رسائلك.</p>
<h2>10. الأطفال</h2>
<p>هذا الموقع غير موجه للأطفال دون 16 سنة، ولا أجمع معطياتهم عن علم.</p>
<h2>11. تعديل هذه السياسة</h2>
<p>يمكنني تحديث هذه السياسة من حين لآخر. التاريخ أعلى الصفحة يشير إلى آخر نسخة.</p>`
      }
    },
    terms: {
      fr: {
        title: "Conditions d'utilisation | Ahmed Berrechach",
        body: `
<h1>Conditions d'utilisation</h1>
<p class="updated">Dernière mise à jour : 26 novembre 2026. En cas de différence, la version anglaise fait foi.</p>
<h2>1. Acceptation</h2>
<p>En utilisant ce site, vous acceptez ces conditions. Si vous n'êtes pas d'accord, veuillez ne pas l'utiliser.</p>
<h2>2. À propos du site</h2>
<p>Ce site est le portfolio personnel d'Ahmed Berrechach, développeur web. Il présente mon parcours, mes compétences et mes services pour permettre aux visiteurs de me contacter. Rien sur ce site ne constitue une offre ferme : tout projet, prix ou délai n'est convenu que par écrit entre nous, après discussion de vos besoins.</p>
<h2>3. Propriété intellectuelle</h2>
<p>Le design, les textes, le code, les images et le logo de ce site appartiennent à Ahmed Berrechach, sauf mention contraire. Vous pouvez consulter le site et partager son lien, mais vous ne pouvez pas copier, republier ou vendre son contenu ou son design sans mon autorisation écrite.</p>
<p>Les noms de projets, logos et marques d'autres entreprises qui peuvent y figurer appartiennent à leurs propriétaires.</p>
<h2>4. Me contacter</h2>
<p>Vous acceptez de me contacter uniquement pour des demandes réelles. Le spam, la publicité, les messages illégaux, offensants ou trompeurs, ainsi que les tentatives de perturber ou d'attaquer le site, sont interdits. Je peux ignorer ou bloquer ces messages. Le traitement de vos données est expliqué dans la <a href="privacy.html">Politique de confidentialité</a>.</p>
<h2>5. Services et projets</h2>
<p>Le travail pour les clients est couvert par un accord ou un devis écrit distinct qui fixe le périmètre, le prix, les délais et les conditions de paiement. Les descriptions de services sur ce site sont informatives et peuvent changer.</p>
<h2>6. Disponibilité et exactitude</h2>
<p>J'essaie de garder le site exact, sécurisé et disponible, mais je ne garantis pas qu'il sera toujours exempt d'erreurs ou d'interruptions. Le site est fourni « en l'état » et je peux modifier ou retirer du contenu à tout moment.</p>
<h2>7. Limitation de responsabilité</h2>
<p>Dans toute la mesure permise par la loi, je ne suis pas responsable des pertes ou dommages résultant de l'utilisation, ou de l'impossibilité d'utiliser ce site, y compris les problèmes causés par des services tiers ou des liens externes.</p>
<h2>8. Liens externes</h2>
<p>Ce site renvoie vers des sites tiers comme LinkedIn et WhatsApp. Je ne les contrôle pas et je ne suis pas responsable de leur contenu ni de leurs pratiques.</p>
<h2>9. Droit applicable</h2>
<p>Ces conditions sont régies par les lois du Royaume du Maroc. Tout litige relève des tribunaux compétents de Beni Mellal, sauf si les lois impératives de protection des consommateurs de votre pays en disposent autrement.</p>
<h2>10. Modifications et contact</h2>
<p>Je peux mettre à jour ces conditions ; la date en haut indique la dernière version. Des questions ? Écrivez à ${mail}.</p>`
      },
      ar: {
        title: "شروط الاستخدام | أحمد برشاش",
        body: `
<h1>شروط الاستخدام</h1>
<p class="updated">آخر تحديث: 26 نونبر 2026. في حالة أي اختلاف، تعتمد النسخة الإنجليزية.</p>
<h2>1. القبول</h2>
<p>باستعمالك لهذا الموقع فإنك توافق على هذه الشروط. إذا كنت لا توافق، المرجو عدم استعماله.</p>
<h2>2. حول الموقع</h2>
<p>هذا الموقع هو المعرض الشخصي لأحمد برشاش، مطور ويب. يقدم مساري ومهاراتي وخدماتي ليتمكن الزوار من التواصل معي. لا يشكل أي محتوى فيه عرضاً ملزماً: لا يتم الاتفاق على أي مشروع أو سعر أو أجل إلا كتابياً بيننا بعد مناقشة احتياجاتك.</p>
<h2>3. الملكية الفكرية</h2>
<p>تصميم هذا الموقع ونصوصه وشيفرته وصوره وشعاره ملك لأحمد برشاش ما لم يذكر خلاف ذلك. يمكنك تصفح الموقع ومشاركة رابطه، لكن لا يجوز نسخ محتواه أو تصميمه أو إعادة نشره أو بيعه دون إذن كتابي مني.</p>
<p>أسماء المشاريع والشعارات والعلامات التجارية الخاصة بشركات أخرى قد تظهر هنا ملك لأصحابها.</p>
<h2>4. التواصل معي</h2>
<p>توافق على التواصل معي للاستفسارات الحقيقية فقط. يمنع إرسال الرسائل المزعجة أو الإشهارية أو غير القانونية أو المسيئة أو المضللة، وكذا محاولات تعطيل الموقع أو مهاجمته. يمكنني تجاهل هذه الرسائل أو حظرها. طريقة معالجة معطياتك موضحة في <a href="privacy.html">سياسة الخصوصية</a>.</p>
<h2>5. الخدمات والمشاريع</h2>
<p>يخضع العمل مع الزبناء لاتفاق أو عرض سعر كتابي منفصل يحدد نطاق العمل والسعر والآجال وشروط الأداء. أوصاف الخدمات في هذا الموقع معلومات عامة وقد تتغير.</p>
<h2>6. التوفر والدقة</h2>
<p>أحرص على أن يبقى الموقع دقيقاً وآمناً ومتاحاً، لكنني لا أضمن خلوه الدائم من الأخطاء أو الانقطاعات. يقدم الموقع "كما هو"، ويمكنني تعديل المحتوى أو حذفه في أي وقت.</p>
<h2>7. حدود المسؤولية</h2>
<p>في أقصى الحدود التي يسمح بها القانون، لا أتحمل مسؤولية أي خسارة أو ضرر ناتج عن استعمال هذا الموقع أو تعذر استعماله، بما في ذلك المشاكل الناتجة عن خدمات الغير أو الروابط الخارجية.</p>
<h2>8. الروابط الخارجية</h2>
<p>يحيل هذا الموقع على مواقع خارجية مثل لينكدإن وواتساب. لا أتحكم فيها ولست مسؤولاً عن محتواها أو ممارساتها.</p>
<h2>9. القانون المطبق</h2>
<p>تخضع هذه الشروط لقوانين المملكة المغربية. يعرض أي نزاع على المحاكم المختصة ببني ملال، ما لم تنص قوانين حماية المستهلك الإلزامية في بلدك على خلاف ذلك.</p>
<h2>10. التعديلات والتواصل</h2>
<p>يمكنني تحديث هذه الشروط من حين لآخر، ويشير التاريخ أعلى الصفحة إلى آخر نسخة. لديك أسئلة؟ راسلني على ${mail}.</p>`
      }
    },
    notfound: {
      fr: {
        title: "Page introuvable | Ahmed Berrechach",
        body: `<h1><em>404</em></h1><p>Désolé, cette page n'existe pas ou a été déplacée.</p><a class="btn btn-dark" href="index.html">Retour à l'accueil</a>`
      },
      ar: {
        title: "الصفحة غير موجودة | أحمد برشاش",
        body: `<h1><em>404</em></h1><p>عذراً، هذه الصفحة غير موجودة أو تم نقلها.</p><a class="btn btn-dark" href="index.html">العودة إلى الرئيسية</a>`
      }
    }
  };

  const UI = {
    fr: { back: "← Retour au site", links: ["Confidentialité", "Conditions d'utilisation", "Contact"] },
    ar: { back: "→ العودة إلى الموقع", links: ["سياسة الخصوصية", "شروط الاستخدام", "تواصل معي"] }
  };

  const main = document.querySelector("main");
  const back = document.querySelector(".back");
  const links = [...document.querySelectorAll(".legal-foot a")];
  const en = {
    title: document.title,
    body: main.innerHTML,
    back: back ? back.innerHTML : "",
    links: links.map((a) => a.textContent)
  };

  function setLang(l) {
    const lang = l === "fr" || l === "ar" ? l : "en";
    const content = lang === "en" ? en : T[page][lang];
    const ui = lang === "en" ? en : UI[lang];
    main.innerHTML = content.body;
    document.title = content.title;
    if (back) back.innerHTML = ui.back;
    links.forEach((a, i) => (a.textContent = ui.links[i]));
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    save("lang", lang);
  }

  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
  setLang(load("lang") || "en");
})();