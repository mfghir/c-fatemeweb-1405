import type { Copy, Locale, Project } from "@/lib/types";

export const COPY: Record<Locale, Copy> = {
  fa: {
    dir: "rtl",
    nav: { home: "خانه", about: "درباره", work: "نمونه‌کارها", services: "تعرفه", resume: "رزومه", contact: "تماس" },
    eyebrow: "طراح UI/UX",
    hiPrefix: "سلام، من",
    name: "فاطمه غفاری",
    tagline: "طراح UI/UX که تجربهٔ کاربری را به نتیجهٔ قابل‌اندازه‌گیری برای کسب‌وکار تبدیل می‌کند.",
    sub: "از پژوهش و معماری اطلاعات تا سیستم طراحی و هندآف؛ محصولاتی می‌سازم که کاربر راحت‌تر استفاده می‌کند و تیم محصول سریع‌تر شیپ می‌کند.",
    ctaContact: "بیایید صحبت کنیم",
    ctaWork: "نمونه‌کارها",
    badgeAvailable: "آمادهٔ همکاری تمام‌وقت و پروژه‌ای",
    badgeTool: "طراحی‌شده در فیگما",
    canvasTitle: "artboard.fig",
    layers: ["هدر", "بخش قهرمان", "کارت‌های ویژگی", "فوتر"],
    marquee: ["پژوهش کاربر", "وایرفریم", "پروتوتایپ", "سیستم طراحی", "تست کاربردپذیری", "فیگما", "هندآف"],
    aboutEyebrow: "درباره من",
    aboutTitle: "طراحی یعنی حل مسئله، نه فقط چیدن رنگ و فونت",
    aboutBody:
      "چند سالی است روی محصولات دیجیتال کار می‌کنم؛ از تحقیق کاربر و وایرفریم تا پروتوتایپ‌های تعاملی و سیستم‌های طراحی منسجم. تمرکز اصلی‌ام روی UI/UX است، ولی چون زبان فرانت‌اند را هم بلدم (React، Next.js، Tailwind)، طرح‌هایم همیشه با واقعیت پیاده‌سازی هماهنگ است.",
    expertiseEyebrow: "تخصص",
    expertiseTitle: "دقیقاً چه کاری انجام می‌دهم",
    expertise: [
      { icon: "research", t: "پژوهش و استراتژی محصول", d: "مصاحبه با کاربر، تحلیل رقبا و تبدیل یافته‌ها به تصمیم‌های طراحی قابل‌دفاع" },
      { icon: "design", t: "طراحی رابط کاربری (UI)", d: "از وایرفریم تا پروتوتایپ تعاملی، با دقت پیکسلی در فیگما" },
      { icon: "system", t: "سیستم طراحی (Design System)", d: "کتابخانهٔ کامپوننت مقیاس‌پذیر برای هماهنگی تیم‌های چندنفره" },
      { icon: "handoff", t: "هندآف و همکاری با توسعه", d: "مستندسازی دقیق و هماهنگی مستقیم با تیم فرانت‌اند (React / Next.js)" },
    ],
    servicesEyebrow: "تعرفه و خدمات",
    servicesTitle: "چطور می‌تونیم همکاری کنیم",
    servicesSub: "چند بستهٔ رایج — بسته به دامنهٔ واقعی پروژه‌ات با هم دقیق‌ترش می‌کنیم.",
    servicesTeaser: "پکیج‌های طراحی، از یک مشاورهٔ کوتاه تا طراحی کامل محصول.",
    seeServices: "مشاهدهٔ تعرفه و خدمات",
    servicesPageTitle: "تعرفه و خدمات",
    servicesPageSub: "این‌ها نقطهٔ شروع رایجن، نه قیمت ثابت — چون هر پروژه دامنهٔ خودش رو داره. بعد از شنیدن جزئیات کارت، یک برآورد واقعی و شفاف بهت می‌دم.",
    servicesNote: "قیمت دقیق بعد از یک مکالمهٔ کوتاه دربارهٔ دامنهٔ پروژه مشخص می‌شه.",
    services: [
      {
        title: "مشاورهٔ UX / بازبینی محصول",
        desc: "بررسی یک محصول یا جریان موجود و ارائهٔ یک گزارش عملی از مشکلات و پیشنهادها.",
        features: ["بازبینی heuristics", "یادداشت‌های قابلیت استفاده", "گزارش اولویت‌بندی‌شده"],
      },
      {
        title: "طراحی UI/UX (وب یا اپ)",
        desc: "از وایرفریم تا پروتوتایپ تعاملی با دقت پیکسلی، آمادهٔ هندآف به تیم توسعه.",
        features: ["پژوهش کاربر", "وایرفریم و معماری اطلاعات", "پروتوتایپ تعاملی در فیگما"],
      },
      {
        title: "سیستم طراحی",
        desc: "کتابخانهٔ کامپوننت مقیاس‌پذیر که تیم‌های چندنفره رو هماهنگ نگه می‌داره.",
        features: ["توکن‌های طراحی", "کتابخانهٔ کامپوننت در فیگما", "مستندسازی برای توسعه"],
      },
    ],
    serviceCta: "درخواست قیمت",
    processEyebrow: "روند کار",
    processTitle: "از ایده تا هندآف",
    process: [
      { t: "کشف و پژوهش", d: "فهم کاربر، رقبا و محدودیت‌های کسب‌وکار" },
      { t: "وایرفریم", d: "ساختار اطلاعات و جریان کاربر" },
      { t: "پروتوتایپ", d: "طراحی بصری و تعامل در فیگما" },
      { t: "تست کاربردپذیری", d: "اعتبارسنجی با کاربران واقعی" },
      { t: "هندآف به توسعه", d: "مستندسازی برای تیم فرانت‌اند" },
    ],
    workEyebrow: "نمونه‌کارها",
    workTitle: "چند پروژهٔ منتخب",
    workAll: "همهٔ پروژه‌ها",
    seeAll: "مشاهدهٔ همهٔ نمونه‌کارها",
    workPageTitle: "همهٔ نمونه‌کارها",
    workPageSub: "پروژه‌هایی که روی آن‌ها کار کرده‌ام — از پژوهش تا طراحی نهایی.",
    filterAll: "همه",
    searchPlaceholder: "جستجو در نمونه‌کارها…",
    noResults: "چیزی پیدا نشد. کلمهٔ دیگری امتحان کن یا فیلتر را پاک کن.",
    loadMore: "نمایش بیشتر",
    detailBack: "بازگشت به همهٔ نمونه‌کارها",
    detailViewLive: "مشاهدهٔ آنلاین",
    detailViewCode: "مشاهدهٔ کد",
    detailDescPlaceholder: "توضیحات این پروژه به‌زودی اضافه می‌شود.",
    detailNotFound: "این پروژه پیدا نشد.",
    workLoading: "در حال بارگذاری نمونه‌کارها…",
    workFallback: "نمونه‌کارها فعلاً از دریبل قابل مشاهده‌ست:",
    viewCase: "مشاهده",
    viewDribbble: "مشاهدهٔ همهٔ کارها در دریبل",
    linksEyebrow: "ارتباط",
    linksTitle: "بیایید کاری با هم بسازیم",
    linksSub: "چه یک پروژهٔ کامل داری چه فقط می‌خوای سلام کنی — پیامت رو مستقیم می‌بینم.",
    portfolio: "پورتفولیو", resume: "رزومه",
    resumePageTitle: "رزومه و پورتفولیو",
    resumePageSub: "فایل رزومه و پورتفولیوی کامل — برای مشاهده یا دانلود.",
    resumeCardTitle: "رزومه",
    resumeCardDesc: "سابقهٔ کاری، مهارت‌ها و تحصیلات، در یک فایل PDF.",
    portfolioCardTitle: "پورتفولیو",
    portfolioCardDesc: "مجموعه‌ای از پروژه‌های منتخب با جزئیات کامل هرکدوم.",
    viewOpen: "مشاهده",
    nextEyebrow: "بعدش چی می‌شه",
    nextTitle: "از پیام تا شروع همکاری",
    nextSteps: [
      { t: "پیامت رو می‌فرستی", d: "فرم رو پر می‌کنی یا مستقیم توی شبکه‌های اجتماعی پیام می‌دی" },
      { t: "جواب می‌دم", d: "دربارهٔ پروژه و نیازت بیشتر می‌پرسم" },
      { t: "شروع می‌کنیم", d: "زمان‌بندی و جزئیات همکاری رو مشخص می‌کنیم" },
    ],
    faqEyebrow: "سوالات متداول",
    faqTitle: "چیزهایی که معمولاً می‌پرسن",
    faq: [
      { q: "چه خدماتی ارائه می‌دی؟", a: "پژوهش کاربر، طراحی UI، سیستم طراحی، پروتوتایپ تعاملی، و هندآف به تیم توسعه — از صفر تا محصول قابل‌اجرا." },
      { q: "با تیم‌های خارج از ایران هم همکاری می‌کنی؟", a: "بله، به‌صورت ریموت با تیم‌ها و کارفرماهای بین‌المللی هم کار می‌کنم." },
      { q: "با چه ابزارهایی کار می‌کنی؟", a: "فیگما برای طراحی، و چون زبان فرانت‌اند (React، Next.js، Tailwind) رو هم بلدم، طرح‌هام همیشه با واقعیت پیاده‌سازی هماهنگه." },
      { q: "برای همکاری تمام‌وقت هم در دسترسی؟", a: "بله، هم برای همکاری تمام‌وقت و هم پروژه‌ای/فریلنس در دسترسم." },
      { q: "یک پروژهٔ معمولی چقدر طول می‌کشه؟", a: "بستگی به دامنهٔ پروژه داره — بعد از شنیدن جزئیات کارت، یک برآورد واقعی بهت می‌دم." },
    ],
    formName: "نام", formEmail: "ایمیل", formMsg: "پیام‌تان",
    formSend: "ارسال پیام", formSending: "در حال ارسال…", formOk: "پیام شما ارسال شد. زودی جواب می‌دم!",
    formErr: "چیزی درست پیش نرفت. لطفاً دوباره تلاش کنید یا مستقیم ایمیل بزنید.",
    formErrRequired: "این فیلد الزامی است",
    formErrEmail: "ایمیل معتبر نیست",
    back: "بازگشت به خانه",
    footer: "تمامی حقوق محفوظ است",
    made: "طراحی و ساخته‌شده توسط فاطمه",
  },
  en: {
    dir: "ltr",
    nav: { home: "Home", about: "About", work: "Work", services: "Pricing", resume: "Resume", contact: "Contact" },
    eyebrow: "UI/UX Designer",
    hiPrefix: "Hi, I'm",
    name: "Fateme Ghafari",
    tagline: "UI/UX Designer who turns user experience into measurable business results.",
    sub: "From research and information architecture to design systems and dev handoff — I build products people find easy to use and teams ship faster.",
    ctaContact: "Let's talk",
    ctaWork: "See work",
    badgeAvailable: "Open to full-time & freelance work",
    badgeTool: "Designed in Figma",
    canvasTitle: "artboard.fig",
    layers: ["Header", "Hero section", "Feature cards", "Footer"],
    marquee: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing", "Figma", "Handoff"],
    aboutEyebrow: "About",
    aboutTitle: "Design is problem-solving, not just picking colors and fonts",
    aboutBody:
      "I've spent the last few years on digital products — user research, wireframes, interactive prototypes and design systems that hold together. UI/UX is where I live, but since I also speak front-end (React, Next.js, Tailwind), what I design stays honest to what can actually ship.",
    expertiseEyebrow: "Expertise",
    expertiseTitle: "What I actually do",
    expertise: [
      { icon: "research", t: "Research & Product Strategy", d: "User interviews, competitive analysis, and turning findings into defensible design decisions" },
      { icon: "design", t: "UI Design", d: "Wireframes through pixel-accurate interactive prototypes in Figma" },
      { icon: "system", t: "Design Systems", d: "Scalable component libraries that keep multi-person product teams aligned" },
      { icon: "handoff", t: "Handoff & Dev Collaboration", d: "Precise documentation and direct coordination with front-end teams (React / Next.js)" },
    ],
    servicesEyebrow: "Pricing & Services",
    servicesTitle: "Ways we can work together",
    servicesSub: "A few common packages — scoped precisely once I know your actual project.",
    servicesTeaser: "Design packages, from a quick consult to full product design.",
    seeServices: "See pricing & services",
    servicesPageTitle: "Pricing & Services",
    servicesPageSub: "These are common starting points, not fixed prices — every project's scope is different. Once I hear the details, I'll give you a realistic, transparent estimate.",
    servicesNote: "Exact pricing is worked out after a short conversation about project scope.",
    services: [
      {
        title: "UX Consultation / Audit",
        desc: "A review of an existing product or flow, with an actionable report on what's working and what isn't.",
        features: ["Heuristic review", "Usability notes", "Prioritized report"],
      },
      {
        title: "UI/UX Design (Web or App)",
        desc: "From wireframes to pixel-accurate interactive prototypes, ready for dev handoff.",
        features: ["User research", "Wireframes & information architecture", "Interactive prototype in Figma"],
      },
      {
        title: "Design System",
        desc: "A scalable component library that keeps multi-person teams aligned.",
        features: ["Design tokens", "Component library in Figma", "Documentation for developers"],
      },
    ],
    serviceCta: "Request a quote",
    processEyebrow: "Process",
    processTitle: "From idea to handoff",
    process: [
      { t: "Discover & Research", d: "Understanding users, competitors, constraints" },
      { t: "Wireframe", d: "Information structure and user flow" },
      { t: "Prototype", d: "Visual design and interaction in Figma" },
      { t: "Usability Testing", d: "Validating with real users" },
      { t: "Handoff", d: "Documentation for the front-end team" },
    ],
    workEyebrow: "Selected Work",
    workTitle: "A few featured projects",
    workAll: "All projects",
    seeAll: "See all work",
    workPageTitle: "All Work",
    workPageSub: "Projects I've worked on — from research to final design.",
    filterAll: "All",
    searchPlaceholder: "Search projects…",
    noResults: "Nothing matched. Try a different term or clear the filter.",
    loadMore: "Load more",
    detailBack: "Back to all work",
    detailViewLive: "View live",
    detailViewCode: "View code",
    detailDescPlaceholder: "Case study details coming soon.",
    detailNotFound: "This project couldn't be found.",
    workLoading: "Loading projects…",
    workFallback: "See the full case studies on Dribbble for now:",
    viewCase: "View",
    viewDribbble: "See all work on Dribbble",
    linksEyebrow: "Connect",
    linksTitle: "Let's build something together",
    linksSub: "Whether it's a full project or just a hello — your message reaches me directly.",
    portfolio: "Portfolio", resume: "Resume",
    resumePageTitle: "Resume & Portfolio",
    resumePageSub: "The full resume and portfolio files — view or download either one.",
    resumeCardTitle: "Resume",
    resumeCardDesc: "Work history, skills, and education, in one PDF.",
    portfolioCardTitle: "Portfolio",
    portfolioCardDesc: "A collection of selected projects with full detail on each.",
    viewOpen: "View",
    nextEyebrow: "What happens next",
    nextTitle: "From message to kickoff",
    nextSteps: [
      { t: "You send a message", d: "Fill out the form, or reach out directly on social media" },
      { t: "I get back to you", d: "I'll ask a few questions about the project and what you need" },
      { t: "We get started", d: "We lock in a timeline and the details of working together" },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Things people usually ask",
    faq: [
      { q: "What services do you offer?", a: "User research, UI design, design systems, interactive prototyping, and handoff to the dev team — from zero to a shippable product." },
      { q: "Do you work with teams outside your country?", a: "Yes, I work remotely with international teams and clients." },
      { q: "What tools do you use?", a: "Figma for design — and since I also speak front-end (React, Next.js, Tailwind), what I design stays honest to what can actually ship." },
      { q: "Are you open to full-time roles?", a: "Yes, I'm open to both full-time and freelance/project-based work." },
      { q: "How long does a typical project take?", a: "It depends on scope — once I hear the details, I'll give you a realistic estimate." },
    ],
    formName: "Name", formEmail: "Email", formMsg: "Your message",
    formSend: "Send message", formSending: "Sending…", formOk: "Message sent — I'll get back to you soon!",
    formErr: "Something went wrong. Please retry or email me directly.",
    formErrRequired: "This field is required",
    formErrEmail: "Enter a valid email",
    back: "Back to home",
    footer: "All rights reserved",
    made: "Designed & built by Fateme",
  },
};

export const FONT_STACK: Record<Locale, string> = {
  fa: "'Vazirmatn', Tahoma, sans-serif",
  en: "'Inter', 'Vazirmatn', sans-serif",
};

export const DRIBBBLE_URL = "https://dribbble.com/fatemeweb";

export const RESUME_URL: Record<Locale, string> = {
  fa: "https://drive.google.com/file/d/1Y-IDqm0XzE8ZHQ5RYenzURBhgYBcxd4e/view",
  en: "https://drive.google.com/file/d/1Vk3FvlOOO68chHVyj6yqCcBNFGe2q5W8/view",
};

export const PORTFOLIO_URL: Record<Locale, string> = {
  fa: "https://drive.google.com/file/d/1ugC7JBKZOI9KCcHXvi2Af3Z9sLGNnN99/view",
  en: "https://drive.google.com/file/d/1TB1w2sTJ3tnx0Lq0z5nv7D8O6mjNSXuC/view",
};

export const SOCIALS_ICONS = ["github", "linkedin", "instagram", "send", "dribbble"];

export const PROJECTS_API = "https://new-personal-api.vercel.app";
export const PROJECTS_ENDPOINTS = ["PortfoliosData", "portfoliosdata", "projects", "works", "portfolio"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProject(item: any, i: number): Project {
  // A single non-localized field (works today, before you've split it by language).
  const sharedDesc = item.description || item.desc || item.summary || item.subtitle || "";

  // Once you add language-specific fields to the API, any of these common naming
  // styles will be picked up automatically — no site code changes needed:
  //   description_fa / descriptionFa / desc_fa / descFa
  //   description_en / descriptionEn / desc_en / descEn
  const descFa =
    item.description_fa || item.descriptionFa || item.desc_fa || item.descFa || sharedDesc;
  const descEn =
    item.description_en || item.descriptionEn || item.desc_en || item.descEn || sharedDesc;

  return {
    id: item.id ?? i,
    title: item.title || item.name || item.projectName || `Project ${i + 1}`,
    // Reserved for the case-study write-up you're planning to add to the API later —
    // works today with any of these field names, and simply stays hidden until filled in.
    desc: sharedDesc,
    descFa,
    descEn,
    category: item.category || item.tag || item.type || item.role || "",
    tags: Array.isArray(item.tags) ? item.tags : [],
    image: item.imgUrl || item.image || item.thumbnail || item.img || item.cover || item.thumbnailUrl || null,
    onlineLink: item.onlineLink || item.link || item.url || item.href || item.dribbbleUrl || null,
    gitLink: item.gitLink || item.githubLink || item.repo || null,
  };
}

export const WORK_TINTS = ["#007BFF", "#0B63C9", "#3D9CFF", "#6B7280", "#2563EB", "#4C8DFF", "#60A5FA", "#1D4ED8"];

/** Picks the project description matching the active site language. */
export function projectDesc(project: Project, locale: Locale): string {
  return (locale === "fa" ? project.descFa : project.descEn) || project.desc;
}
