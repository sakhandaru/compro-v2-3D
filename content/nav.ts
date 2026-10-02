/**
 * Destinations for the floating bottom nav.
 *
 * `id` is a contract with the markup, not something the nav owns: every id here
 * must exist on a real `<section>`, because a nav item without a section behind
 * it is a dead link. The five below are `home` (the hero), `selected-work`,
 * `the-record`, `about` and `contact`.
 *
 * `path` mirrors the `~/...` eyebrow each section already prints for itself, so
 * the name in the menu and the name above the heading are the same name rather
 * than two vocabularies for the same place.
 */
export const navContent = {
  items: [
    { id: "home", path: "~/home" },
    { id: "selected-work", path: "~/selected-work" },
    { id: "the-record", path: "~/the-record" },
    { id: "about", path: "~/about" },
    { id: "contact", path: "~/contact" },
  ],

  /** Visible label of the toggle. It stays `menu` in both states so the button
      width does not jump, which is why the open state needs its own string: the
      accessible name has to contain the visible words (WCAG 2.5.3). */
  menu: "menu",
  closeMenu: "close menu",
  home: "home",
  sections: "page sections",

  /**
   * The action that puts the site's address on the clipboard, and the word it
   * turns into afterwards. Both live here rather than in the component so the
   * word that is seen and the word that is announced are the same string: the
   * button re-renders its own label inside an `aria-live` region
   * (components/site-nav.tsx).
   */
  copyLink: "copy link",
  copied: "copied",
} as const;
