# Claymorphism design system

## Goal
Add Claymorphism as a persisted, site-wide alternative to the existing Playful Geometric appearance, while keeping light/dark mode as a separate setting within the same theme provider.

## Theme architecture
- Extend `ThemeProvider` with a design-system context exposing `designSystem: "geometric" | "clay"` and `setDesignSystem` alongside the existing light/dark provider.
- Persist the choice in browser storage using a stable key and apply either `geometric` or `claymorphism` to the document root immediately, avoiding a flash of the wrong appearance.
- Provide a `useDesignSystem` hook for shared controls and future components.
- Load Outfit + Plus Jakarta Sans for Geometric and Nunito + DM Sans for Clay through provider-managed stylesheet links, removing the existing CSS URL import.

## Clay visual foundation
- Add the requested Clay palette as HSL semantic tokens under the root `.claymorphism` class, including canvas, text, muted, primary, secondary, tertiary, success, warning, borders, focus rings, and 32px base radius.
- Add four-layer convex, elevated, and inset shadow tokens, with dark-mode-aware Clay values so light/dark remains usable in either design system.
- Implement `.clay-card`, `.clay-btn`, `.clay-btn-secondary`, `.clay-input`, and `.clay-pressed` utilities with 32px cards, 20px controls, soft shadows, hover lift, and active squish.
- Make existing site-wide `pop-card`, `candy-btn`, `pop-shadow`, navigation pills, badges, and common bordered surfaces resolve to Clay styling under `.claymorphism`, covering pages that use legacy shared classes directly.
- Suppress dashed connectors, confetti particles, wiggles, hard borders, and geometric rotations in Clay mode; replace applicable motion with `clay-breathe`, soft lift, and squish behavior.
- Preserve focus-visible rings, reduced-motion behavior, touch feedback, and AA-readable foreground/background combinations.

## Shared UI controls
- Update Card, Button, Badge, Input, and Switch primitives to read the active design system and select their Geometric or Clay classes.
- Keep all existing component variants and behavior intact; only their visual treatment changes.
- Update the header’s reusable surfaces so its logo, search, favorites, menus, theme toggle, and navigation reflect the active system consistently.

## Settings and ambient treatment
- Add a clearly labeled “Design style” setting with Geometric and Clay options, visually distinct from the light/dark mode control.
- Apply changes instantly and keep the current light/dark preference unchanged when switching styles.
- Add a global, pointer-transparent Clay background layer with four slowly drifting, blurred accent blobs that only mounts in Clay mode and stays behind page content.

## Verification
- Check persistence across reloads and independent switching of design system and light/dark mode.
- Verify the Settings page, homepage, shared cards, buttons, badges, inputs, header, and navigation at mobile and desktop sizes.
- Confirm keyboard focus, reduced motion, no overlapping content, and a clean build.
