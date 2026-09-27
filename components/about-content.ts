/**
 * Copy for DESIGN..md 15.9. The owner's own words, verbatim.
 *
 * Nothing here is written on their behalf. The section answers "who is the person
 * behind all this work", and the two paragraphs below are the whole of it, which
 * is a deliberate choice by someone who knows what they want to say. Short beats
 * padded.
 */

export type AboutItem = {
  /** Short label, sits in the left rail. */
  term: string;
  /** The sentence that matters. One line is usually right. */
  detail: string;
};

export type AboutBlock = {
  /** Small mono label in the left rail. Lowercase, like the rest of the page. */
  label?: string;
  /** Optional second line under the label. */
  note?: string;
  /** Optional heading inside the content column. */
  heading?: string;
  /** Optional paragraph. */
  body?: string;
  /** Optional list of term and detail pairs. */
  items?: AboutItem[];
};

/** Opens the section. The owner's first sentence, unbroken. */
export const ABOUT_STATEMENT =
  "I'm a Software Engineer who enjoys turning complex ideas and business needs into simple, reliable software.";

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    body: "My work spans web applications, ERP platforms, and business systems, with a focus on building solutions that are practical, maintainable, and built to last.",
  },
];

export type Skill = {
  name: string;
  /** Path to the brand mark in /public, taken from `compro-data/techstack-icons`. */
  icon: string;
};

/**
 * Skills, one flat list, with the owner's own brand marks.
 *
 * The owner asked for tech stack icons, and the twenty skills in
 * `compro-data/content/techstack.json` all have a real mark in that folder's
 * `techstack-icons`, so nothing here is invented and nothing had to be guessed.
 *
 * Still one list, not five buckets. The owner was asked whether to group these and
 * said no, so Languages, Frameworks, Databases, Tools and Design & PM are all
 * deliberately interleaved into a single run rather than labelled.
 *
 * Still no pills and still no percentages. 15.9 puts "skill badges" and
 * "percentage charts" on its avoid list, R-09 forbids the pill, and R-17 forbids
 * a number with no source, so "JavaScript 85%" cannot go up no matter how true it
 * feels. The name sits next to the mark, so the mark is decoration and the name is
 * the information.
 *
 * These icons are the one place a brand mark earns its place: each is the actual
 * logo of a real thing the owner has used, not a generic glyph standing in for a
 * category. The generic case is the opposite, and it is why the project rows show
 * tech as plain names: nine of the sixteen technologies named across the portfolio
 * have no mark, and six of those, AI, API, NLP, XML, Express, Odoo, are not brands
 * at all but generic terms, so a mark for them could only be invented.
 */
export const SKILLS: Skill[] = [
  { name: "JavaScript", icon: "/techstack/javascript.svg" },
  { name: "TypeScript", icon: "/techstack/typescript.svg" },
  { name: "PHP", icon: "/techstack/php.svg" },
  { name: "Python", icon: "/techstack/python.svg" },
  { name: "React", icon: "/techstack/react.svg" },
  { name: "Next.js", icon: "/techstack/nextjs.svg" },
  { name: "Laravel", icon: "/techstack/laravel.svg" },
  { name: "Node.js", icon: "/techstack/nodejs.svg" },
  { name: "Flask", icon: "/techstack/flask.svg" },
  { name: "MySQL", icon: "/techstack/mysql.svg" },
  { name: "PostgreSQL", icon: "/techstack/postgresql.svg" },
  { name: "MariaDB", icon: "/techstack/mariadb.svg" },
  { name: "n8n", icon: "/techstack/n8n.svg" },
  { name: "Docker", icon: "/techstack/docker.svg" },
  { name: "Linux", icon: "/techstack/linux.svg" },
  { name: "Git", icon: "/techstack/git.svg" },
  { name: "Figma", icon: "/techstack/figma.svg" },
  { name: "Notion", icon: "/techstack/notion.svg" },
  { name: "Jira", icon: "/techstack/jira.svg" },
  { name: "Trello", icon: "/techstack/trello.svg" },
];

export type Certification = {
  /** The credential's own name, as the issuer writes it. */
  name: string;
  /** Who issued it. */
  issuer?: string;
  /** Year earned, if you want it shown. */
  year?: string;
  /** Public credential id, for anyone who wants to verify it. */
  credentialId?: string;
  /**
   * Path to the issuer's logo, put in /public yourself.
   *
   * Left undefined on purpose. A certification logo is somebody else's brand mark
   * and R-23 says assets are never invented, so this stays empty until you supply
   * the real file. Without one the entry renders as text only, which is still
   * honest; a grey box standing in for a logo would look like the real thing and
   * be nothing of the sort.
   */
  logo?: string;
};

/**
 * Certifications, below the skills.
 *
 * An empty array, so nothing renders. That is the whole mechanism for hiding it:
 * no flag, no commented-out JSX, no display:none around markup still sitting in
 * the tree. Drop entries in here and the block appears on its own.
 */
export const CERTIFICATIONS: Certification[] = [];
