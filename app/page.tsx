import Entrance from "@/components/entrance";
import HeroSection from "@/components/hero-section";
import SmoothScroll from "@/components/smooth-scroll";
import { contactContent } from "@/content/contact";
import { siteContent } from "@/content/site";

/*
 * Structured data for search engines and AI crawlers, built from the same
 * content files the page renders from, so the two cannot drift. sameAs takes
 * the profile channels only: whatsapp is a contact method, not a profile.
 */
const PROFILE_KINDS = ["github", "linkedin", "instagram"] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteContent.name,
      url: siteContent.url,
      jobTitle: siteContent.roles,
      sameAs: contactContent.channels
        .filter((channel) => PROFILE_KINDS.includes(channel.kind as (typeof PROFILE_KINDS)[number]))
        .map((channel) => channel.href),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Semarang",
        addressCountry: "ID",
      },
    },
    {
      "@type": "WebSite",
      name: siteContent.name,
      url: siteContent.url,
      description: siteContent.description,
      inLanguage: siteContent.lang,
    },
  ],
};

export default function Home() {
  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // The replace keeps a "<" inside any future content string from
          // closing the script tag early (Next.js docs, JSON-LD guide).
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Entrance />
      <main>
        <HeroSection />
      </main>
    </SmoothScroll>
  );
}

