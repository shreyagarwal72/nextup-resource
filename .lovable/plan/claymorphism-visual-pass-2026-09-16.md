# Claymorphism visual pass

## Scope
- Review Home, OS, TV Apps, and Admin in Claymorphism on desktop and mobile.
- Replace visible hard geometric borders, offset shadows, dotted/dashed backgrounds, squiggles, confetti, and rigid badges with Clay surfaces, controls, and inset states.
- Keep the Playful Geometric appearance unchanged when Claymorphism is off.

## Implementation
- Add narrowly scoped Clay overrides and conditional Clay classes to the four pages and their directly rendered components.
- Use existing semantic color tokens and Clay shadow utilities; preserve focus rings, readable contrast, reduced motion, and existing behavior.
- Validate the unlocked and locked Admin layouts where accessible without exposing credentials.

## Verification
- Check all four routes at 1280px desktop and a mobile viewport with Clay enabled.
- Exercise search/filter states on OS and TV Apps, inspect browser errors, and confirm the latest production build is clean.
