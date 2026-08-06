export interface FossApp {
  name: string;
  author: string;
  url: string;
  tags: string[];
  recommendedBy?: string;
}

/** Hydrated at runtime from the backend (`foss_apps` dataset). */
export const fossApps: FossApp[] = [];
