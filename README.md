<p align="center">
  <img src="public/pwa-512x512.png" alt="Nextup Resources Logo" width="110" height="110" style="border-radius: 24px;">
</p>

<h1 align="center">Nextup Resources</h1>

<p align="center">
  <b>The modern hub for premium learning, free developer utilities, curated FOSS, ebooks, and AI workflows.</b>
</p>

<p align="center">
  <a href="https://nextup-resource.vercel.app"><img src="https://img.shields.io/badge/Live%20Platform-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/shreyagarwal72/nextup-resource/releases/latest"><img src="https://img.shields.io/badge/Android%20App-3DDC84?style=for-the-badge&logo=android&logoColor=white" alt="Download APK"></a>
  <a href="https://github.com/shreyagarwal72/nextup-resource/stargazers"><img src="https://img.shields.io/github/stars/shreyagarwal72/nextup-resource?style=for-the-badge&color=ffd700" alt="Stars"></a>
  <a href="https://www.youtube.com/@nextupstudioyt"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>
  <a href="https://www.instagram.com/hereyourchampion/"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%2018-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript%205-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui">
  <img src="https://img.shields.io/badge/PWA%20Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase">
</p>

---

## 🧭 Overview

**Nextup Resources** is a curated, high-performance web platform and progressive web application built for engineers, creators, and students. It brings together vetted online courses, AI prompts and tools, digital libraries, and open-source applications into a responsive, mobile-first interface with multi-engine theme customization.

---

## 🎨 Interactive Design Systems

Experience the site through 4 distinct visual languages with dedicated animations, sound/haptic cues, and custom geometries:

| Theme | Aesthetic & Highlights | Signature Elements |
| :--- | :--- | :--- |
| **Playful Geometric** | Bold neobrutalist sticker cards, high contrast, vibrant primary pops | Hard drop shadows, bounce springs, snappy micro-interactions |
| **Claymorphism** | Tactile 3D inflated pill controls and soft ambient lighting | Dual inner & outer shadows, organic floating ambient blobs |
| **Squid Game ○△□** | High-tension dystopian cyber aesthetic, CRT scanlines | Guard Pink (`#FF007A`), Tracksuit Teal, Red Light/Green Light toggles |
| **Minecraft ⛏** | Authentic retro voxel GUI panels & HUD styling | 3D beveled stone buttons, XP green accents, VT323 typography |

---

## ✨ Core Features

<table>
  <tr>
    <td width="50%">
      <h3>🎓 Catalogs & Libraries</h3>
      <ul>
        <li><b>50+ Premium Courses:</b> Web dev, mobile dev, AI & DevOps.</li>
        <li><b>Curated Ebooks & Docs:</b> Searchable technical reference library.</li>
        <li><b>AI Tools Directory:</b> Prompts, LLMs, and generation models.</li>
        <li><b>FOSS & Modern Apps:</b> Shizuku, Morphe, and Material You tools.</li>
      </ul>
    </td>
    <td width="50%">
      <h3>⚡ Experience & Performance</h3>
      <ul>
        <li><b>Smart Offline PWA:</b> Stale-while-revalidate client caching.</li>
        <li><b>Global Instant Search:</b> Fuzzy match across all items in milliseconds.</li>
        <li><b>Study Mode:</b> Minimalist, distraction-free focus workspace.</li>
        <li><b>Haptic Engine:</b> Tactile vibrations on interactive button taps.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 📸 Screenshots

<p align="center">
  <img src="public/1.jpg" width="18%" alt="Screenshot 1" style="border-radius: 12px; margin: 4px;">
  <img src="public/2.jpg" width="18%" alt="Screenshot 2" style="border-radius: 12px; margin: 4px;">
  <img src="public/3.jpg" width="18%" alt="Screenshot 3" style="border-radius: 12px; margin: 4px;">
  <img src="public/4.jpg" width="18%" alt="Screenshot 4" style="border-radius: 12px; margin: 4px;">
  <img src="public/5.jpg" width="18%" alt="Screenshot 5" style="border-radius: 12px; margin: 4px;">
</p>

---

## 🛠 Tech Architecture

```
nextup-resource/
├── public/                 # Static assets, textures, and manifest
│   ├── minecraft/          # Pixel art textures (dirt, xp, diamond, etc.)
│   └── icons/              # App launcher & PWA icons
├── src/
│   ├── components/         # Reusable widgets (Header, Hotbar, Themes)
│   │   ├── ui/             # Radix UI + shadcn primitives
│   │   ├── SquidBackground.tsx
│   │   └── MinecraftBackground.tsx
│   ├── pages/              # Routed pages (Home, Catalogs, Settings, Admin)
│   ├── lib/                # Database bridge, cache sync, and utilities
│   └── index.css           # Global tokens & theme keyframe animations
```

- **Frontend Core:** [React 18](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Bundler & Build Tool:** [Vite](https://vitejs.dev/)
- **Styling Engine:** [Tailwind CSS](https://tailwindcss.com/) + CSS variables
- **Motion & Transitions:** [Framer Motion](https://www.framer.com/motion/) + CSS keyframes
- **State & Data Sync:** [TanStack Query](https://tanstack.com/query/latest) + LocalStorage bridge
- **Backend Infrastructure:** [Supabase](https://supabase.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm, pnpm, or bun

### Local Installation

```bash
# 1. Clone the repository
git clone https://github.com/shreyagarwal72/nextup-resource.git

# 2. Enter the project directory
cd nextup-resource

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## ⚙️ Backend-Driven Synchronization

Every catalog lives in the backend `site_content` table:
1. `src/lib/contentBridge.ts` loads and updates content dynamically at runtime.
2. The last successful sync is persisted to `localStorage` and client Service Worker caches.
3. The installed PWA loads immediately in offline conditions with full local fallback.

---

## 🤝 Community & Support

<p align="center">
  Made with ❤️ by <b>Nextup Studio</b> (Vanshu Agarwal).<br>
  If you find this project valuable, please consider giving it a ⭐ on GitHub!
</p>

<p align="center">
  <a href="https://nextup-resource.vercel.app"><b>🌐 Visit Nextup Resources</b></a> •
  <a href="https://www.youtube.com/@nextupstudioyt"><b>📺 YouTube Channel</b></a> •
  <a href="https://github.com/shreyagarwal72"><b>💻 GitHub Profile</b></a>
</p>
