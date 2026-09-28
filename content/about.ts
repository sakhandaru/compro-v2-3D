export const aboutContent = {
  statement:
    "I'm a Software Engineer who enjoys turning complex ideas and business needs into simple, reliable software.",

  blocks: [
    {
      body: "My work spans web applications, ERP platforms, and business systems, with a focus on building solutions that are practical, maintainable, and built to last.",
    },
  ] as {
    label?: string;
    note?: string;
    heading?: string;
    body?: string;
    items?: { term: string; detail: string }[];
  }[],
} as const;
