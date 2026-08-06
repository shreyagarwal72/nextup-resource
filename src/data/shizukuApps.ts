export interface ShizukuApp {
  name: string;
  url: string;
  author: string;
  category: string;
  description?: string;
  license?: string;
}

/** Hydrated at runtime from the backend (`shizuku_apps` dataset). */
export const shizukuApps: ShizukuApp[] = [];
