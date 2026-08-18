import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: { enabled: false },
      includeAssets: [
        "favicon.png",
        "favicon.ico",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "pwa-maskable-512x512.png",
        "screenshot-wide.png",
        "screenshot-narrow.png",
      ],
      manifest: {
        id: "/",
        name: "Nextup Resources — Courses, Apps & Free Learning",
        short_name: "Nextup",
        description:
          "Premium courses, free ebooks, curated Android apps, AI tools and developer resources — all in one fast, offline-ready library.",
        lang: "en",
        dir: "ltr",
        theme_color: "#0080FF",
        background_color: "#f5f7fa",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone", "minimal-ui", "browser"],
        orientation: "any",
        scope: "/",
        start_url: "/?source=pwa",
        categories: ["education", "productivity", "books", "utilities"],
        prefer_related_applications: false,
        launch_handler: { client_mode: "navigate-existing" },
        edge_side_panel: { preferred_width: 420 },
        handle_links: "preferred",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "pwa-maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        screenshots: [
          {
            src: "screenshot-wide.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
            label: "Nextup Resources home page on desktop",
          },
          {
            src: "screenshot-narrow.png",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
            label: "Nextup Resources home page on mobile",
          },
        ],
        shortcuts: [
          { name: "Courses", short_name: "Courses", url: "/courses", description: "Browse premium courses" },
          { name: "Resources", short_name: "Resources", url: "/resources", description: "Free downloadable resources" },
          { name: "AI Tools", short_name: "AI", url: "/ai", description: "Curated AI tools directory" },
          { name: "Favorites", short_name: "Saved", url: "/favorites", description: "Your saved items" },
        ],
      },
      workbox: {
        // Full offline app shell: every built asset is precached and any
        // navigation falls back to the cached index.html.
        navigateFallback: "index.html",
        navigateFallbackDenylist: [/^\/api\//, /^\/~oauth/],
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigationPreload: false,
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        runtimeCaching: [
          {
            // Google Fonts stylesheets + files, so typography survives offline.
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-images",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Backend content catalog — served from cache instantly, refreshed
            // in the background, and still available with no connection.
            urlPattern: /\/rest\/v1\/site_content.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "site-content-api",
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/raw\.githubusercontent\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "github-data",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "github-api",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 12 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/api\/morphe/,
            handler: "NetworkFirst",
            options: {
              cacheName: "morphe-api",
              networkTimeoutSeconds: 4,
              expiration: { maxEntries: 5, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Any other same-origin image (local assets, generated covers).
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
