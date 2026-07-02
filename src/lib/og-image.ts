/**
 * OG Image Generator Utility
 * 
 * This utility helps generate dynamic Open Graph images for social sharing.
 * Can be used with Lovable AI image generation or canvas-based generation.
 */

export interface OGImageConfig {
  title: string;
  subtitle?: string;
  category?: string;
  backgroundColor?: string;
  accentColor?: string;
}

/**
 * Generate OG image prompt for AI generation
 */
export const generateOGImagePrompt = (config: OGImageConfig): string => {
  const {
    title,
    subtitle = "Nextup Resources",
    category,
    backgroundColor = "#0080FF",
    accentColor = "#FFFFFF",
  } = config;

  return `A professional social media OG image (1200x630) for "${title}". ${
    category ? `Category: ${category}.` : ""
  } Tagline: "${subtitle}". Modern gradient design with primary color ${backgroundColor}, accent ${accentColor}. Clean typography, geometric shapes, premium SaaS style. Include subtle education/learning iconography. Ultra high resolution, 16:9 aspect ratio.`;
};

/**
 * Generate page-specific OG meta tags
 */
export const generateOGMetaTags = (config: {
  title: string;
  description: string;
  image?: string;
  url: string;
}): Record<string, string> => {
  const baseUrl = "https://nextup-resource.vercel.app";
  const defaultImage = `${baseUrl}/og-image.png`;

  return {
    "og:title": config.title,
    "og:description": config.description,
    "og:image": config.image || defaultImage,
    "og:url": `${baseUrl}${config.url}`,
    "og:type": "website",
    "og:site_name": "Nextup Resources",
    "twitter:card": "summary_large_image",
    "twitter:title": config.title,
    "twitter:description": config.description,
    "twitter:image": config.image || defaultImage,
  };
};

/**
 * Update page meta tags dynamically
 */
export const updatePageMeta = (config: {
  title: string;
  description: string;
  image?: string;
  url: string;
}): void => {
  // Update title
  document.title = config.title;

  // Update meta tags
  const metaTags = generateOGMetaTags(config);

  Object.entries(metaTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[property="${name}"]`) ||
               document.querySelector(`meta[name="${name}"]`);

    if (!meta) {
      meta = document.createElement("meta");
      if (name.startsWith("og:")) {
        meta.setAttribute("property", name);
      } else {
        meta.setAttribute("name", name);
      }
      document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
  });

  // Update description
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute("content", config.description);
  }

  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = `https://nextup-resource.vercel.app${config.url}`;
};

/**
 * Page-specific SEO configurations
 */
export const pageSEOConfigs = {
  home: {
    title: "Nextup Resources — Premium Courses & Free Learning",
    description: "50+ premium courses, free ebooks, apps, AI tools and resources. Learn AI, web dev, trading, design and more — all in one place.",
    url: "/",
  },
  courses: {
    title: "Courses — Nextup Resources",
    description: "Browse premium courses on AI, web dev, trading, cybersecurity, design and more — curated for learners at every level.",
    url: "/courses",
  },
  resources: {
    title: "Free Resources — Nextup Resources",
    description: "Download free LUTs, fonts, sound effects, templates and premium assets for creators, designers and learners.",
    url: "/resources",
  },
  ebooks: {
    title: "Ebooks — Nextup Resources",
    description: "Educational ebooks on video editing, AI, business and professional development — curated and free to read.",
    url: "/ebooks",
  },
  apps: {
    title: "Apps — Nextup Resources",
    description: "Curated Android apps, dev tools, media players and utilities — safe picks for power users.",
    url: "/apps",
  },
  ai: {
    title: "AI Tools — Nextup Resources",
    description: "Discover the best AI tools for writing, coding, design, video and productivity — organized and searchable.",
    url: "/ai",
  },
  fossApps: {
    title: "FOSS Apps — Nextup Resources",
    description: "Hand-picked free and open-source Android apps with live GitHub release info.",
    url: "/foss-apps",
  },
  shizukuApps: {
    title: "Shizuku Apps — Nextup Resources",
    description: "Powerful Android apps that use Shizuku for advanced permissions without root.",
    url: "/shizuku-apps",
  },
  morphe: {
    title: "Morphe — Patched Android Builds",
    description: "Latest Morphe and ReVanced patched Android builds, cached and served fresh every 12 hours.",
    url: "/morphe",
  },
  materialYou: {
    title: "Material You Apps — Nextup Resources",
    description: "1000+ Android apps that adopt Material You design, searchable and organized by category.",
    url: "/material-you",
  },
  telegramTweaks: {
    title: "Telegram Tweaks — Secret Bots & Tools",
    description: "Curated Telegram bots for downloads, AI, music, files and more — categorized and searchable.",
    url: "/telegram-tweaks",
  },
  developerRoadmap: {
    title: "Developer Roadmap — Nextup Resources",
    description: "Community-curated developer roadmaps covering web, mobile, AI and DevOps career paths.",
    url: "/developer-roadmap",
  },
  specialCourses: {
    title: "Placement Material — Nextup Resources",
    description: "Placement prep material, interview guides and specialized courses for job seekers.",
    url: "/special-courses",
  },
  gurMannFitnessBooks: {
    title: "Guru Mann Fitness Books — Nextup Resources",
    description: "Free Guru Mann fitness ebooks on nutrition, muscle building, fat loss and health.",
    url: "/guru-mann-fitness",
  },
  favorites: {
    title: "My Favorites — Nextup Resources",
    description: "Your saved courses, resources and apps — quick access to your favorite learning materials.",
    url: "/favorites",
  },
  contact: {
    title: "Contact — Nextup Resources",
    description: "Get in touch about courses, resources or collaboration opportunities.",
    url: "/contact",
  },
  faq: {
    title: "FAQ — Nextup Resources",
    description: "Frequently asked questions about accessing courses, downloads and using Nextup Resources.",
    url: "/faq",
  },
  install: {
    title: "Install App — Nextup Resources",
    description: "Install Nextup Resources as a PWA or download the APK for quick offline access.",
    url: "/install",
  },
};
