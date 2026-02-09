

# Settings Page with Theme Options, Category Sorting, and New Content

## Overview

This plan creates a dedicated Settings page with theme selection (including the Material 3 theme as a first-class option instead of a hidden beta), adds category-based sorting across all content sections, and adds 7 new content items.

## What's Changing

### 1. New Settings Page

A new `/settings` page accessible from the header navigation, featuring:

- **Theme Selector**: Three theme options presented as visual cards:
  - **Liquid Glass** (default) - The current iOS-inspired glassmorphism theme
  - **Material 3** - The current beta theme, promoted to a full production option (no longer labeled "Beta")
  - **Study Mode** - The calm green/neutral study-focused theme

- **Sort Preference**: Choose how items are organized across all pages:
  - **Alphabetical** (current default)
  - **Category** - Groups items by their category with category headers
  - **Newest First** - Items with `dateAdded` appear first, then alphabetical

### 2. Navigation Updates

- Add a Settings icon (gear/cog) to the header alongside existing toggles
- Add Settings to the Material 3 navigation rail and mobile drawer
- The Settings page works in both the main UI and Material 3 UI

### 3. Rename "Beta" to "Material 3"

- Remove "Beta" labeling from the Material 3 theme everywhere
- The `useBetaUI` hook will be kept internally but the UI will present it as "Material 3 Theme"
- The footer secret tap and keyboard shortcut still work as alternative activation methods
- The "Exit Beta" button in Material3Layout becomes "Switch Theme" or links to Settings

### 4. New Content

**Courses** (3 new items):
- Capcut Mastery Course (Telegram link, Video Editing category)
- Premiere Pro Basic to Advance Full Course (Google Drive, Video Editing category)
- 11 Days Abundance Challenge (Telegram link, Personal Development category)

**Resources** (3 new items):
- Premium Motion Backgrounds (Telegram link, Video category)
- Editing Essentials (Telegram link, Video category)
- Background Music Pack (Google Drive, Audio category)

**Apps** (1 new item):
- Best All In One App (Telegram link, Utility category)

All items get `dateAdded: "2026-02-09"` for the "New" badge.

## Technical Details

### Files to Create

1. **`src/pages/Settings.tsx`** - Main settings page with theme cards and sort option selector, styled with liquid glass aesthetic
2. **`src/pages/beta/BetaSettings.tsx`** - Material 3 styled settings page variant
3. **`src/hooks/useSortPreference.ts`** - Hook to manage sort preference in localStorage with options: `alphabetical`, `category`, `newest`

### Files to Modify

1. **`src/data/content.ts`**
   - Add 7 new content items with proper metadata
   - Export a `sortByPreference` utility function that accepts a sort mode and returns sorted/grouped content

2. **`src/App.tsx`**
   - Add `/settings` route for both normal and Material 3 UIs
   - Lazy-load the Settings pages

3. **`src/components/Header.tsx`**
   - Add a Settings gear icon button linking to `/settings`

4. **`src/components/beta/Material3Layout.tsx`**
   - Add Settings to the navigation items
   - Replace "Exit Beta" button with a "Switch to Glass" or link to settings
   - Remove "Beta" from all labels

5. **`src/components/CoursesSection.tsx`**, **`ResourcesSection.tsx`**, **`EbooksSection.tsx`**, **`AppsSection.tsx`**
   - Integrate `useSortPreference` hook
   - Apply sorting/grouping based on user preference
   - When "category" sort is active, render items grouped under category headers

6. **`src/components/Footer.tsx`**
   - Keep the secret tap toggle (it still works as a quick shortcut)
   - Remove "(Beta)" indicator text, show "(M3)" instead when active

7. **`src/hooks/useBetaUI.ts`**
   - No functional changes needed internally, but UI labels referencing "beta" will be updated in consuming components

8. **`src/pages/beta/BetaIndex.tsx`**
   - Change "Material 3 Beta" chip text to "Material 3"

9. **`src/pages/beta/BetaCourses.tsx`**, **`BetaResources.tsx`**, **`BetaApps.tsx`**, **`BetaEbooks.tsx`**
   - Integrate sort preference support

### Sort Preference Architecture

```text
useSortPreference hook
  |
  +-- Reads/writes 'nextup-sort-preference' from localStorage
  |
  +-- Returns { sortPreference, setSortPreference }
  |
  +-- sortPreference: 'alphabetical' | 'category' | 'newest'

sortByPreference(items, preference)
  |
  +-- 'alphabetical': sort by title A-Z (current behavior)
  +-- 'category': group by category, then sort within groups
  +-- 'newest': dateAdded DESC, then alphabetical
```

### Settings Page Layout

```text
+----------------------------------+
|  Settings                        |
+----------------------------------+
|                                  |
|  Theme                           |
|  +--------+ +--------+ +------+ |
|  | Liquid | |Material| | Study| |
|  | Glass  | |   3    | | Mode | |
|  |  [img] | |  [img] | | [img]| |
|  +--------+ +--------+ +------+ |
|                                  |
|  Content Sorting                 |
|  (o) Alphabetical                |
|  ( ) By Category                 |
|  ( ) Newest First                |
|                                  |
+----------------------------------+
```

### Implementation Order

1. Create `useSortPreference` hook
2. Create Settings page (both variants)
3. Add new content to `content.ts`
4. Update routing in `App.tsx`
5. Update Header and Material3Layout navigation
6. Integrate sort preference into all section components
7. Rename all "Beta" references to "Material 3"

