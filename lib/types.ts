export type Locale = "fa" | "en" | "ko";
export type Theme = "light" | "dark" | "retro";

export interface Project {
  id: string | number;
  title: string;
  desc: string;
  category: string;
  tags: string[];
  image: string | null;
  onlineLink: string | null;
  gitLink: string | null;
}

export interface ExpertiseItem {
  icon: "research" | "design" | "system" | "handoff";
  t: string;
  d: string;
}

export interface ProcessStep {
  t: string;
  d: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  features: string[];
}

export interface Copy {
  dir: "rtl" | "ltr";
  nav: { home: string; about: string; work: string; services: string; contact: string };
  eyebrow: string;
  hiPrefix: string;
  name: string;
  tagline: string;
  sub: string;
  ctaContact: string;
  ctaWork: string;
  badgeAvailable: string;
  badgeTool: string;
  canvasTitle: string;
  layers: string[];
  marquee: string[];
  aboutEyebrow: string;
  aboutTitle: string;
  aboutBody: string;
  expertiseEyebrow: string;
  expertiseTitle: string;
  expertise: ExpertiseItem[];
  servicesEyebrow: string;
  servicesTitle: string;
  servicesSub: string;
  servicesTeaser: string;
  seeServices: string;
  servicesPageTitle: string;
  servicesPageSub: string;
  servicesNote: string;
  services: ServiceItem[];
  serviceCta: string;
  processEyebrow: string;
  processTitle: string;
  process: ProcessStep[];
  workEyebrow: string;
  workTitle: string;
  workAll: string;
  seeAll: string;
  workPageTitle: string;
  workPageSub: string;
  filterAll: string;
  searchPlaceholder: string;
  noResults: string;
  loadMore: string;
  detailBack: string;
  detailViewLive: string;
  detailViewCode: string;
  detailDescPlaceholder: string;
  detailNotFound: string;
  workLoading: string;
  workFallback: string;
  viewCase: string;
  viewDribbble: string;
  linksEyebrow: string;
  linksTitle: string;
  linksSub: string;
  portfolio: string;
  resume: string;
  nextEyebrow: string;
  nextTitle: string;
  nextSteps: ProcessStep[];
  faqEyebrow: string;
  faqTitle: string;
  faq: FaqItem[];
  formName: string;
  formEmail: string;
  formMsg: string;
  formSend: string;
  formSending: string;
  formOk: string;
  formErr: string;
  formErrRequired: string;
  formErrEmail: string;
  back: string;
  footer: string;
  made: string;
}
