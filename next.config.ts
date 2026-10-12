import type { NextConfig } from "next";

// Classic static generation: every marketing page is prerendered at build time.
// Case studies are read from content/ files at build, so a new entry ships with the next deploy.
const nextConfig: NextConfig = {
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
