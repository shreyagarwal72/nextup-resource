

# Playful Geometric Redesign — Full Site Overhaul

## Overview

Replace the entire multi-theme system (Liquid Glass, Material 3, Nothing) with a single **Playful Geometric** design system inspired by Memphis Group aesthetics: hard shadows, punchy colors, bouncy animations, primitive shapes, and chunky borders. Also remove the Settings page and all theme-switching infrastructure.

---

## Scope of Changes

### What gets removed
- **Settings page** (`src/pages/Settings.tsx`) and its route
- **All beta/Material 3 files**: `src/pages/beta/*`, `src/components/beta/*`, `src/styles/material3.css`
- **Nothing theme files**: `src/pages/nothing/*`, `src/components/NothingHero.tsx`, `src/components/NothingFooter.tsx`, `src/components/NothingLoader.tsx`, `src/components/NothingHeader.tsx`, `src/styles/theme-nothing.css`
- **Theme-switching hooks**: `useAppTheme.ts`, `useBetaUI.ts`, `useAnimations.ts`
- **Loader components**: `SplashScreen.tsx`, `PencilLoader.tsx`, `Material3Loader.tsx`
- **Settings link** from Header and Footer
- **Theme-conditional routing** in `App.tsx` (collapse to single route set)

### What gets redesigned (same functionality, new look)

Every component and page listed below gets restyled to the Playful Geometric system:

---

## Design Token Implementation

### Step 1: Replace CSS variables and global styles (`src/index.css`)

- **Fonts**: Import `Outfit` (headings) and `Plus Jakarta Sans` (body) from Google Fonts
- **Light mode colors**:
  - `--background: 44 100% 98%` (warm cream `#FFFDF5`)
  - `--foreground: 215 45% 17%` (slate 800 `#1E293B`)
  - `--accent: 262 83% 66%` (vivid violet `#8B5CF6`)
  - `--secondary: 330 86% 70%` (hot pink `#F472B6`)
  - `--tertiary: 43 96% 56%` (amber `#FBBF24`)
  - `--quaternary: 160 64% 52%` (emerald `#34D399`)
- **Dark mode**: Shift background to deep navy, keep accent palette punchy
- **Remove** all `--glass-*` tokens, liquid gradients, blur tokens
- **Add** hard shadow tokens: `--pop-shadow: 4px 4px 0px 0px #1E293B`
- **Add** border: default `2px solid` chunky borders
- **Add** dot-grid background pattern as CSS utility
- **Replace** all `glass-*`, `liquid-*` utility classes with new `pop-*` utilities:
  - `.pop-shadow` — hard offset shadow
  - `.pop-shadow-hover` — extended shadow on hover
  - `.pop-card` — white card with 2px border + hard shadow
  - `.pop-wiggle` — keyframe wiggle on hover
  - `.pop-bounce-in` — scale 0→1 with bounce entrance
  - `.confetti-bg` — positioned decorative shapes

### Step 2: Update Tailwind config (`tailwind.config.ts`)

- Add `tertiary`, `quaternary` to color palette
- Replace glass shadows with hard shadow utilities
- Replace all Apple timing functions with bouncy `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Replace iOS keyframes with `pop-in`, `wiggle`, `bounce-press` keyframes
- Update radius: `--radius: 16px` (md), add `radius-sm: 8px`, `radius-lg: 24px`

---

## Component Redesigns

### Step 3: Header (`src/components/Header.tsx`)

- **Desktop**: White bar with 2px bottom border, hard shadow. Logo "N" in a violet circle with hard shadow. Nav links with pill hover (fills yellow on hover). "Get Started" button as Candy Button (violet pill, hard shadow, bouncy hover).
- **Mobile**: Menu slides down as a white bordered card with hard shadow. Staggered pop-in animation for links.
- **Remove**: Settings link, glass classes, ThemeToggle (keep dark/light toggle restyled), references to beta UI.

### Step 4: Hero (`src/components/Hero.tsx`)

- **Remove**: Canvas particle animation, liquid blobs, gradient orbs
- **Add**: Large yellow circle behind headline text, dot-grid pattern behind CTA area, confetti shapes (triangles, circles in pink/yellow/green) floating behind content
- **Typewriter** kept but styled with Outfit font, colored words cycle through accent colors
- **CTA buttons**: Candy Button style (pill, 2px border, hard shadow, bouncy press)
- **Stats**: Cards with alternating colored top borders (violet, pink, yellow)

### Step 5: CourseCard (`src/components/CourseCard.tsx`)

- White card, 2px dark border, `rounded-xl`, hard shadow (`8px 8px 0px #E2E8F0`)
- Hover: rotate `-1deg`, scale `1.02` (wiggle), shadow color changes
- Category badge: colored pill (rotating accent colors)
- "Access Course" button: Candy Button style
- Icon floats half-in/half-out of card top (circular div with icon)

### Step 6: ResourceCard, EbookCard, AppCard

- Same "Sticker Card" treatment as CourseCard
- Download overlay uses solid colored overlay instead of glass blur
- Badges use chunky borders

### Step 7: Footer (`src/components/Footer.tsx`)

- White section with dotted top border, hard shadow on social icons
- Remove beta toggle secret tap, glass classes
- Social icons enclosed in colored circles with hard shadows

### Step 8: Other shared components

- **FavoriteButton**: Red heart in white circle, hard shadow, bouncy press
- **NewBadge**: Bright green pill with 2px border, "NEW" text, no gradient
- **ScrollToTop**: Violet circle, hard shadow, bouncy hover
- **Input**: 2px border, hard colored shadow on focus
- **NotificationCenter**: White panel with 2px border, hard shadow
- **StudyModeToggle**: Restyled as playful toggle with colored indicator

### Step 9: All pages (Courses, Resources, Ebooks, Apps, AI, Favorites, Contact, FAQ, Install, NotFound)

- Replace `glass-*` and `liquid-blob` decorations with geometric shapes (circles, triangles, squiggly SVG dividers)
- Page headers use Outfit bold + squiggly SVG underline
- Section backgrounds use dot-grid pattern
- Category filter chips: pill shape, 2px border, fills with color on active

---

## App Architecture Cleanup

### Step 10: Simplify `App.tsx`

- Remove all beta/Material3 routing
- Remove Nothing theme routing
- Remove `useBetaUI`, `useAppTheme` usage
- Single route set pointing to the standard pages
- Keep `ThemeProvider` for dark/light mode only

### Step 11: Delete removed files

- `src/pages/beta/*` (8 files)
- `src/pages/nothing/*` (1 file)
- `src/pages/Settings.tsx`
- `src/components/beta/*` (3 files)
- `src/components/NothingHero.tsx`, `NothingFooter.tsx`, `NothingLoader.tsx`, `NothingHeader.tsx`
- `src/components/SplashScreen.tsx`, `src/components/PencilLoader.tsx`, `src/components/Material3Loader.tsx`
- `src/hooks/useAppTheme.ts`, `src/hooks/useBetaUI.ts`, `src/hooks/useAnimations.ts`
- `src/styles/material3.css`, `src/styles/theme-nothing.css`

---

## Motion & Accessibility

- All hover/entrance animations use `cubic-bezier(0.34, 1.56, 0.64, 1)` (bouncy overshoot)
- `@media (prefers-reduced-motion: reduce)` disables wiggle, bounce, and pop animations
- Focus states: thick violet border + hard violet shadow
- All text contrast AAA (slate-800 on cream/white)
- Buttons min 48px touch target on mobile
- Mobile: reduce hard shadows to 2px, hide decorative floating shapes

---

## Estimated file changes: ~25 files modified, ~15 files deleted

