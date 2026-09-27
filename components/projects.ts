/**
 * The portfolio, taken from `compro-data/content/projects.json`.
 *
 * That folder is the source of truth for the owner's content. This file is a typed
 * copy of it, hand-checked, with three deliberate differences, and it is worth
 * knowing about all three:
 *
 * 1. Eleven of the fifteen `links` in the JSON are `"#"`. Those are not links, they
 *    are placeholders for links that were never filled in, so they were dropped
 *    rather than carried over. R-26 says an interactive element has to do something
 *    real, and an anchor pointing at `#` looks like a link and goes nowhere. The
 *    four that are real URLs are kept. They have not been checked for liveness, so
 *    confirm them before this ships.
 *
 * 2. `tag` became `status`, kept as data rather than flattened into the blurb. The
 *    owner drew a line between work that shipped and work that is still a concept,
 *    and that line is the most interesting thing in the whole file. Seven are
 *    Completed, two are Concept, and the section says so on the row.
 *
 * 3. Images were re-encoded. The originals are 3637px wide PNGs and WebPs, 43MB for
 *    25 files, and the largest single screen was 6.7MB. Every screen is displayed at
 *    most 600 CSS pixels, so they were resized to 1800 wide and saved as WebP: 2.5MB
 *    total, 94% smaller. The untouched originals are still in `compro-data/assets`.
 *
 * `screens` is an array because one project genuinely has four captures and another
 * has one, which is exactly the variation 15.6 did not anticipate and a single
 * `mockup` field could not hold.
 *
 * There is no 15.7 Archive and no project page. The owner decided the accordion is
 * enough, and `slug` is on every record so the route can come back later without
 * redoing any of this.
 */

export type ProjectLink = {
  /** What the link is, so the label can be written per kind instead of guessed. */
  kind: "demo" | "github";
  href: string;
};

export type Project = {
  /** reserved for a future project page, so the identity exists before the route does */
  slug: string;
  index: string;
  title: string;
  /** Completed or Concept, straight from the owner's `tag`. */
  status: string;
  year: string;
  role: string;
  blurb: string;
  tech: string[];
  /** one or more screen captures; the first is the cover */
  screens: string[];
  /** only real URLs; the JSON's `"#"` placeholders were dropped */
  links: ProjectLink[];
};

/**
 * Tech is names, not icons, on purpose. Nine of the sixteen technologies named
 * across these projects have no icon in `compro-data/techstack-icons`: Tailwind,
 * Express, Framer Motion, Odoo, Ollama, API, XML, NLP, and AI. Six of those are not
 * brands at all, they are generic terms, and giving "AI" or "API" a logo would mean
 * inventing an abstract mark for them, which is the thing R-04 rules out. The icons
 * are used where they are real brand marks, on the skills list in About.
 */
export const PROJECTS: Project[] = [
  {
    slug: "corporate-platform-pt-wijaya-laksmi-bhuana-agung",
    index: "01",
    title: "Corporate Platform — PT. Wijaya Laksmi Bhuana Agung",
    status: "Completed",
    year: "2026",
    role: "Full Stack",
    blurb: "Developed integrated corporate management and employee workspace platform.",
    tech: ["Next.js", "Laravel", "MySQL"],
    screens: ["/projects/wlb3.webp", "/projects/wlb1.webp", "/projects/wlb2.webp"],
    links: [],
  },
  {
    slug: "custom-erp-cv-dejavanese-autoparts",
    index: "02",
    title: "Custom ERP — CV. Dejavanese Autoparts",
    status: "Completed",
    year: "2026",
    role: "Full Stack",
    blurb: "Developed ERP system for inventory, sales, and supply chain management.",
    tech: ["Laravel", "MySQL", "Tailwind"],
    screens: ["/projects/djv1.webp", "/projects/djv2.webp", "/projects/djv3.webp"],
    links: [],
  },
  {
    slug: "custom-erp-pprq-annasimiyyah",
    index: "03",
    title: "Custom ERP — PPRQ Annasimiyyah",
    status: "Completed",
    year: "2025",
    role: "Full Stack",
    blurb: "ERP covering academics, syahriah payments, and permissions. Multi-role portal with official website and downloadable brochure.",
    tech: ["Next.js", "Laravel", "MySQL"],
    screens: ["/projects/sipprq1.webp", "/projects/sipprq2.webp", "/projects/sipprq3.webp"],
    links: [{ kind: "demo", href: "https://pprqportal.com/" }],
  },
  {
    slug: "laz-majt-web-system",
    index: "04",
    title: "LAZ MAJT Web System",
    status: "Completed",
    year: "2025",
    role: "Full Stack",
    blurb: "ERP for zakat, infaq, and donation management with public donation portal, zakat calculator, static CMS, and official website.",
    tech: ["Laravel", "Tailwind", "MySQL"],
    screens: ["/projects/laz-1.webp", "/projects/laz-2.webp"],
    links: [{ kind: "demo", href: "https://majt.or.id/" }],
  },
  {
    slug: "custom-erp-aruna-cipta-perkasa",
    index: "05",
    title: "Custom ERP — Aruna Cipta Perkasa",
    status: "Completed",
    year: "2025",
    role: "Full Stack",
    blurb: "Highly customized ERP with 9 user roles, full N8N workflow automation, and AI integration. Includes the company's official website.",
    tech: ["Next.js", "Laravel", "n8n", "AI"],
    screens: ["/projects/arcade1.webp", "/projects/arcade2.webp", "/projects/arcade3.webp"],
    links: [{ kind: "demo", href: "https://arcipta.com/" }],
  },
  {
    slug: "email-blasting-system-emtekdigital",
    index: "06",
    title: "Email Blasting System — EmtekDigital",
    status: "Completed",
    year: "2025",
    role: "Backend",
    blurb: "Scalable Node.js email automation tool with scheduling, open rate tracking, and audience segmentation for an EO agency.",
    tech: ["Node.js", "Express", "API"],
    screens: ["/projects/email1.webp", "/projects/email2.webp", "/projects/email3.webp"],
    links: [],
  },
  {
    slug: "odoo-module-contractor-management",
    index: "07",
    title: "Odoo Module Contractor Management",
    status: "Concept",
    year: "2025",
    role: "Odoo Developer",
    blurb: "An Odoo module for contractor management, designed to streamline project workflows and enhance operational efficiency.",
    tech: ["Odoo", "Python", "XML"],
    screens: ["/projects/odoo1.webp", "/projects/odoo2.webp", "/projects/odoo3.webp"],
    links: [{ kind: "github", href: "https://github.com/sakhandaru/odoo-dev" }],
  },
  {
    slug: "landing-page-tvku",
    index: "08",
    title: "Landing Page TVKU",
    status: "Concept",
    year: "2025",
    role: "Front-end",
    blurb: "A modern, responsive landing page for TVKU, built with Next.js to ensure fast performance and SEO. Designed for a seamless user experience, focusing on modern design and accessibility.",
    tech: ["Next.js", "Framer Motion"],
    screens: ["/projects/tvku1.webp", "/projects/tvku2.webp", "/projects/tvku3.webp", "/projects/tvku4.webp"],
    links: [],
  },
  {
    slug: "chatbot-ai-assistant",
    index: "09",
    title: "Chatbot AI Assistant",
    status: "Concept",
    year: "2025",
    role: "AI Developer",
    blurb: "An intelligent AI chatbot for the TVKU platform, designed to boost user engagement with real-time, personalized support. Leverages modern AI and NLP to create an intuitive, user-centric experience.",
    tech: ["React", "AI", "NLP", "Ollama"],
    screens: ["/projects/ai1.webp"],
    links: [],
  },
];
