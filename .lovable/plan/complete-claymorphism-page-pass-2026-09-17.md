# Complete Claymorphism page pass

## Scope
Finish the Claymorphism treatment on the remaining requested experiences while leaving Playful Geometric unchanged:
- Admin content manager
- Study Mode banner, toggle, plan picker, and study-active course state
- Telegram Bots
- IoT
- Games
- Material You

## Implementation
1. Add a shared page-level Clay compatibility wrapper to each remaining catalog/study screen so legacy cards, badges, filters, empty/loading states, and action controls receive soft one-pixel borders, rounded Clay shapes, and layered Clay shadows.
2. Replace page-local raw buttons with the shared button primitive where practical; otherwise make their active, hover, focus, and pressed states explicitly Clay-aware.
3. Update shared search, Study Mode, favorite/status controls, and any reused surfaces that still expose thick geometric borders or hard offset shadows.
4. Suppress geometric-only dots, haze, squiggles, dashed dividers, and decorative animation when Clay is active, while retaining subtle Clay lift, inset pressed states, and reduced-motion support.
5. Preserve the existing accent colors, content, filtering, navigation, admin behavior, and the complete Playful Geometric appearance.

## Verification
- Check all six requested experiences in Clay mode at desktop and mobile widths, including loading/empty states where reachable.
- Confirm readable contrast, no overlap, consistent focus indicators, and no hard-offset geometric shadows or thick outlines.
- Check the latest automated build result and resolve any errors introduced by this pass.
