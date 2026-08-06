// Content schema + live datasets.
//
// The site is backend-driven: every array below starts empty and is filled at
// runtime by `src/lib/contentBridge.ts` from the `site_content` table (with an
// offline localStorage/service-worker cache). The array *references* are
// stable, so pages can keep importing them exactly as before.

export interface Course {
  title: string;
  description: string;
  category: string;
  duration: string;
  students: string;
  image: string;
  link: string;
  dateAdded?: string;
  isStudyContent?: boolean;
}

export interface Resource {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
  isStudyContent?: boolean;
}

export interface Ebook {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
  isStudyContent?: boolean;
}

export interface App {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
  isStudyContent?: boolean;
}

// Categories that are considered "study" content
export const studyCategories = [
  "Education", "Language", "Technology", "AI", "Web Development", 
  "Security", "Data Science", "Productivity", "Career", "Development",
  "Cybersecurity", "App Development", "No-Code", "Finance", "Professional"
];

// Helper function to sort arrays alphabetically by title
const sortAlphabetically = <T extends { title: string }>(arr: T[]): T[] => {
  return [...arr].sort((a, b) => a.title.localeCompare(b.title));
};

export interface Website {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  emoji: string;
  dateAdded?: string;
}

// Sort by preference utility
export type SortPreference = 'alphabetical' | 'category' | 'newest';

export const sortByPreference = <T extends { title: string; category: string; dateAdded?: string }>(
  items: T[],
  preference: SortPreference
): T[] => {
  const sorted = [...items];
  switch (preference) {
    case 'newest':
      return sorted.sort((a, b) => {
        // Items with dateAdded come first (newest first), then alphabetical
        if (a.dateAdded && b.dateAdded) return b.dateAdded.localeCompare(a.dateAdded);
        if (a.dateAdded) return -1;
        if (b.dateAdded) return 1;
        return a.title.localeCompare(b.title);
      });
    case 'category':
      return sorted.sort((a, b) => {
        const catCompare = a.category.localeCompare(b.category);
        if (catCompare !== 0) return catCompare;
        return a.title.localeCompare(b.title);
      });
    case 'alphabetical':
    default:
      return sortAlphabetically(sorted);
  }
};

// Group items by category
export const groupByCategory = <T extends { category: string }>(items: T[]): Record<string, T[]> => {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

// Live datasets — hydrated from the backend at runtime.
export const courses: Course[] = [];
export const resources: Resource[] = [];
export const ebooks: Ebook[] = [];
export const apps: App[] = [];
export const websites: Website[] = [];

// Alias exports for backward compatibility
export const allCourses = courses;
export const allResources = resources;
export const allEbooks = ebooks;
export const allApps = apps;
export const allWebsites = websites;

// ============================================================
// Collections — curated bundle pages (e.g., GTA, Placement Material, AI Tools)
// Each collection renders on /collection/:slug
// ============================================================
export interface CollectionItem {
  title: string;
  description?: string;
  link: string;
  badge?: string;
}

export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  emoji: string;
  accent: "primary" | "secondary" | "tertiary" | "quaternary";
  items: CollectionItem[];
}

export const collections: Collection[] = [];

export const getCollection = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);
