export interface MaterialYouApp {
  name: string;
  url: string;
  author: string;
  category: string;
  badge: string;
  tags: string[];
}

/** Hydrated at runtime from the backend (`material_you_apps` dataset). */
export const materialYouApps: MaterialYouApp[] = [];
