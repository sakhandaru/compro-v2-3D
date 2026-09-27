/**
 * Contact details, from `compro-data/content/personal.json`.
 *
 * The owner's data is the source of truth. Three things in it are deliberately not
 * passed through as they are, and each one is a decision rather than an oversight.
 *
 * 1. The display name stays `sakhandaru`. `personal.json` says
 *    `name.display: "Rifqis Sakha"`, but the owner settled on the nickname for the
 *    whole site and `DESIGN..md` was updated to match, so following the JSON here
 *    would quietly undo that. The full legal name is still in the data and still in
 *    the repo, it is just not what the page calls anyone.
 *
 * 2. LinkedIn is not linked. The URL in the data is
 *    `https://linkedin.com/in/Rifqis Sakha`, with a space in the path, which is not a
 *    URL that resolves. It is not linked because guessing the real slug would be
 *    inventing it, and a link that goes to a 404 is worse than no link. Fix it in
 *    the JSON and it appears here on its own, no code change.
 *
 * 3. WhatsApp, Instagram and GitLab are left out rather than shown. 15.10 asks for
 *    contact information that stays simple, and five social rows under a sentence
 *    is a link list rather than a way to get in touch. They are still in the JSON
 *    if they want them back.
 *
 * The year is not taken from the JSON either, which says `2026`. The footer reads
 * the clock, because a year typed into a data file is a year that quietly goes
 * wrong in January and nothing flags it.
 */

/** The primary call to action of the final act. */
export const EMAIL = "rifqiagha7@gmail.com";

/** Where the owner is, shown in the footer. */
export const LOCATION = "Semarang, Indonesia";

export type Channel = {
  kind: string;
  label: string;
  href: string;
};

/**
 * The links under the primary CTA, in the order a reader would want them: where the
 * work is, then who they are professionally, then the site itself.
 */
export const CHANNELS: Channel[] = [
  { kind: "github", label: "github", href: "https://github.com/sakhandaru" },
  { kind: "website", label: "rifqisakha.my.id", href: "https://www.rifqisakha.my.id" },
];

/** 15.10 dictates this one. */
export const CONTACT_BRIDGE = "THERE'S MORE TO BUILD.";

/** 15.10 dictates this one, set across two lines at display size. */
export const CONTACT_HEADLINE = ["LET'S", "TALK."];
