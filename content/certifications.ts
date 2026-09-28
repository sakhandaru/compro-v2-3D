export const certificationsContent = {
  label: "certifications",

  // DUMMY. Placeholder data so the block can be seen and styled. Every value below
  // is invented and none of it is real. Replace all of it, or set items to [] to
  // hide the block again.
  items: [
    {
      name: "Example Credential One",
      issuer: "Example Issuer",
      year: "2025",
      credentialId: "XXXX-0001",
    },
    {
      name: "Example Credential Two",
      issuer: "Example Issuer",
      year: "2025",
    },
    {
      name: "Example Credential Three",
      issuer: "Another Example Issuer",
      year: "2026",
      credentialId: "XXXX-0003",
    },
  ] as {
    name: string;
    issuer?: string;
    year?: string;
    credentialId?: string;
    logo?: string;
  }[],
} as const;
