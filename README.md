<p align="center">
  <img src="public/pwa-512x512.png" alt="Nextup Resources Logo" width="120" height="120">
</p>

<h1 align="center">Nextup Resources</h1>

<p align="center">Premium courses, free resources, ebooks, apps, and AI tools — all in one place.</p>

<p align="center">
  <a href="https://nextup-resource.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Site-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site">
  </a>
  <a href="https://github.com/shreyagarwal72/nextup-resource/releases/latest">
    <img src="https://img.shields.io/badge/Download_APK-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Download APK">
  </a>
  <a href="https://www.instagram.com/hereyourchampion/">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  </a>
  <a href="https://www.youtube.com/@nextupstudioyt">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube">
  </a>
</p>

---

## Overview

Nextup Resources is a curated learning platform offering premium courses, AI tools, ebooks, apps, FOSS collections, and productivity resources through a modern, mobile-first experience.

## Features

- 50+ Premium Courses
- Free Resources
- Ebooks Library
- AI Tools Directory
- FOSS Apps
- Shizuku Apps
- Morphe Builds
- Material You Apps
- Telegram Tweaks
- Placement Material
- Operating Systems Catalog
- Android TV Apps
- Global Search
- Resourcely Chatbot
- What's New Inbox
- Favorites
- Study Mode
- Dark Mode
- Settings
- Deep Linking
- PWA Support
- Smart Offline Support
- Responsive Design

## 📸 Screenshots

<p align="center">
  <img src="public/1.jpg" width="18%" alt="Screenshot 1">
  <img src="public/2.jpg" width="18%" alt="Screenshot 2">
  <img src="public/3.jpg" width="18%" alt="Screenshot 3">
  <img src="public/4.jpg" width="18%" alt="Screenshot 4">
  <img src="public/5.jpg" width="18%" alt="Screenshot 5">
</p>

## Tech Stack

- React 18
- TypeScript 5
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- PWA

## Getting Started

```bash
git clone https://github.com/shreyagarwal72/nextup-resource.git
cd nextup-resource
npm install
npm run dev
```

## Backend-Driven Content

Every catalog (courses, resources, ebooks, apps, websites, collections, AI tools, FOSS,
Shizuku, Material You, TV apps, OS projects, Telegram bots) lives **only** in the backend
`site_content` table. The files in `src/data/*` keep the TypeScript shapes and export empty
live arrays that `src/lib/contentBridge.ts` fills at runtime — pages import them exactly as
before.

Offline: the last successful sync is cached in `localStorage`, and the service worker caches
the backend response itself (stale-while-revalidate), so the installed PWA opens with full
content without a connection. There is no separate offline page any more.

### Steps (admin) — one page at a time

1. Open `/admin` and enter the admin password.
2. Find the page you want (e.g. `tv_apps`, `courses`).
3. **Export** — downloads that page's content as a plain JSON array.
4. Edit the JSON (add/remove/change items) in any editor.
5. **Add / update** — uploads the file, keeping everything else on that page.
   **Replace page** — wipes only that page first, then uploads.
   **Clear page** — removes that page's content only. There is no whole-database wipe.
6. **Refresh site** — re-reads the database into the running site; visitors pick changes up
   on their next load.


## License


© 2026 Nextup Resources. All rights reserved.

## ⭐ Support

If you enjoy this project, consider giving it a ⭐ on GitHub.

Made with ❤️ by Nextup Studio.
