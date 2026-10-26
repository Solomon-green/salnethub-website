import type { NextConfig } from "next";

// Classic static generation: every marketing page is prerendered at build time.
// Case studies are read from content/ files at build, so a new entry ships with the next deploy.
const nextConfig: NextConfig = {
  // Case studies moved from /work to /customer-stories; keep old links and search results working.
  redirects() {
    return [
      { source: "/work", destination: "/customer-stories", permanent: true },
      { source: "/work/:slug", destination: "/customer-stories/:slug", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
