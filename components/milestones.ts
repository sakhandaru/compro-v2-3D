/**
 * Milestones for DESIGN..md 15.8. The document asks for roughly six to eight; there
 * are nine here because every one of these is a real turning point and cutting a
 * turning point would be the wrong call. The count is flagged, not silently trimmed.
 *
 * The entries are spaced evenly along the track. This file used to carry a decimal
 * year per entry and place each one at its own date, which made the ruler a real
 * time scale, and the last four entries were then shoved apart by a minimum gap
 * because eighteen months of work does not fit at a readable size. The owner looked
 * at the result and asked what the years were for. So the dates went back to being
 * text on the cards, which is where they were always legible, and the track became
 * a plain even sequence.
 *
 * The copy is the owner's own, kept verbatim including the present tense on the last
 * entry. That tense is deliberate: it is the only one still happening, and it leads
 * straight into the "still building" bridge the document asks for at the end of 15.8.
 */
export type Milestone = {
  period: string;
  title: string;
  org: string;
  role: string;
  line: string;
};

export const MILESTONES: Milestone[] = [
  {
    period: "2019",
    title: "getting started",
    org: "MA TBS Kudus",
    role: "",
    line: "Started my academic journey and built a strong foundation in science and mathematics.",
  },
  {
    period: "2022",
    title: "studying technology",
    org: "Universitas Dian Nuswantoro",
    role: "Informatics",
    line: "Started studying Informatics and exploring software development.",
  },
  {
    period: "2022",
    title: "learning through community",
    org: "IPNU Jepara",
    role: "",
    line: "Joined community activities and learned through collaboration, communication, and teamwork.",
  },
  {
    period: "2024",
    title: "leading open source",
    org: "DOSCOM",
    role: "Linux & Open Source",
    line: "Led a Linux and open-source community and contributed to TeaLinux OS.",
  },
  {
    period: "2025",
    title: "modernizing legacy systems",
    org: "TVKU",
    role: "IT Staff Intern",
    line: "Modernized the TVKU platform by migrating its legacy system from CodeIgniter 2 to Next.js.",
  },
  {
    period: "2025 — 2026",
    title: "building real systems",
    org: "CV Aruna Cipta Perkasa",
    role: "IT Programmer",
    line: "Built web applications, APIs, and business systems for real-world needs.",
  },
  {
    period: "2025 — 2026",
    title: "building erp platforms",
    org: "ERP & Digital Platforms",
    role: "",
    line: "Worked on ERP and digital platforms for education, zakat, automotive, and corporate management.",
  },
  {
    period: "2026",
    title: "a meaningful milestone",
    org: "Universitas Dian Nuswantoro",
    role: "Graduation",
    line: "Graduated Cum Laude, received an award for outstanding achievement, and represented the graduates as the commencement speaker.",
  },
  {
    period: "2026",
    title: "engineering at scale",
    org: "PT. BPR BKK",
    role: "Software Engineer",
    line: "Building and improving software systems to support banking operations.",
  },
];

/**
 * Sits under the heading on desktop only. It has to earn the ruler: the dates are
 * on the cards, so the band below is a measure of progress, not a calendar.
 */
export const INTRO =
  "Nine turning points, in the order they happened. Each card carries its own dates; the ruler below is there to show how far along you are.";

/** The document wants a bridge into 15.9 About once the last milestone lands. */
export const BRIDGE = "still building.";
