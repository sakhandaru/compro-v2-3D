import type { NextConfig } from "next";

/*
  Assets in public/ otherwise go out as `public, max-age=0, must-revalidate`,
  which means the hero's 184KB model is revalidated against the network on every
  single visit. Nothing ever renders from cache, so the model's appearance
  always rides on one more round trip succeeding — a dropped connection at the
  wrong moment is what puts the failure state on screen.

  stale-while-revalidate inverts that: a repeat visit paints straight from the
  cached copy while the freshness check runs behind it, and if that check fails
  the stale copy stays rather than being withheld. A day of hard caching with a
  week of background revalidation covers a redeploy without ever blocking on it.
*/
const ASSET_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/models/:path*",
        headers: [{ key: "Cache-Control", value: ASSET_CACHE }],
      },
      {
        source: "/draco/:path*",
        headers: [{ key: "Cache-Control", value: ASSET_CACHE }],
      },
    ];
  },
};

export default nextConfig;
