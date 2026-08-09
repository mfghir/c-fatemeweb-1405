// Update this if the site's real domain changes — it feeds canonical URLs,
// Open Graph/Twitter image URLs, and sitemap.ts / robots.ts.
// Kept in its own module (not in app/layout.tsx) because Next.js 15 type-checks
// route files strictly and only allows specific named exports (default, metadata,
// generateMetadata, etc.) — any other export there fails the build.
export const SITE_URL = "https://fatemeweb.netlify.app";
