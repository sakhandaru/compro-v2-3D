export const certificationsContent = {
  label: "certifications",

  // DUMMY was here. The placeholder entries are removed rather than shown:
  // invented credentials presented as real ones are a fabricated claim. Put
  // real entries in `items` and the block renders itself; empty array hides it.
  items: [] as {
    name: string;
    issuer?: string;
    year?: string;
    credentialId?: string;
    logo?: string;
  }[],
} as const;
