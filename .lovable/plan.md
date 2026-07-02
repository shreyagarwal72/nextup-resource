## Goals

1. Show secondary/misc/hidden bottom-nav rings on desktop (they're currently hidden).
2. Wire the provided APK URL into the Install page as the download.
3. Refresh SEO + OG metadata (canonical stays on `https://nextup-resource.vercel.app`).
4. Fix the current build failure in `src/pages/Install.tsx` (stray ```` ```tsx ```` / ```` ``` ```` markdown fences on lines 1 and 167).

## Changes

### `src/pages/Install.tsx` (build fix + APK)
- Remove the stray ```` ```tsx ```` on line 1 and closing ```` ``` ```` on line 167 that are breaking the build.
- Confirm APK anchor points at `https://kklz19o6an7qwti4.public.blob.vercel-storage.com/Nextup%20Resources.apk` with `download="Nextup Resources.apk"` (already present — verify only).

### `src/components/BottomNav.tsx` (desktop visibility)
- Current logic hides the nav on desktop unless the user is in the secondary/misc/hidden ring. That's the intended behavior from last turn, but the shell wrapper's `md:hidden` class is being applied to the primary ring only. Re-audit `desktopClass` so:
  - Primary ring → `md:hidden` (header covers it on desktop).
  - Secondary / misc / hidden rings → visible on all breakpoints (no `md:hidden`, and widen `md:max-w-2xl` container so it doesn't get clipped behind other floating UI).
- Add `pointer-events-auto` and bump `z-50` → `z-40` only if it conflicts with Resourcly; otherwise leave.

### `index.html` (SEO/OG refresh)
- Keep canonical + og:url on `https://nextup-resource.vercel.app/`.
- Tighten `<title>` to ≤60 chars: `Nextup Resources — Premium Courses & Free Learning`.
- Tighten `<meta name="description">` to ≤160 chars.
- Mirror the new title/description into `og:title`, `og:description`, `twitter:title`, `twitter:description`.
- Ensure `og:image` / `twitter:image` point at `/og-image.png` (absolute URL already set).
- Add sitewide `Organization` + `WebSite` JSON-LD (with `SearchAction`) so the homepage no longer needs the runtime script in `Index.tsx`.

### `src/lib/og-image.ts` (per-page SEO)
- Update `pageSEOConfigs` titles to stay ≤60 chars and descriptions ≤160 chars where they currently overflow (courses, resources, ebooks, apps, favorites, contact, faq, install).
- Add missing entries: `ai`, `fossApps`, `shizukuApps`, `morphe`, `materialYou`, `telegramTweaks`, `developerRoadmap`, `specialCourses`, `gurMannFitnessBooks`, `collection`.

### `public/sitemap.xml`
- Ensure every current route is listed with `https://nextup-resource.vercel.app` base: `/`, `/courses`, `/resources`, `/ebooks`, `/apps`, `/ai`, `/foss-apps`, `/shizuku-apps`, `/morphe`, `/material-you`, `/telegram-tweaks`, `/developer-roadmap`, `/special-courses`, `/guru-mann-fitness`, `/guru-mann-fitness-books`, `/favorites`, `/contact`, `/faq`, `/install`.

### `public/robots.txt`
- Verify `Sitemap: https://nextup-resource.vercel.app/sitemap.xml` directive is present.

## Out of scope
- No domain migration (user chose to keep `nextup-resource.vercel.app`).
- No new OG image generation (existing `/og-image.png` is kept).
- No changes to backend, chat, or data files.

## Note to user
Social platforms (LinkedIn, Slack, X) cache the previous OG preview; after publishing, refresh via their link-preview debuggers to see the updated card.
