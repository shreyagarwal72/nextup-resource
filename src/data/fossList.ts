export interface FossListApp {
  name: string;
  url: string;
  author: string;
  category: string;
}

/** Hydrated at runtime from the backend (`foss_list` dataset). */
export const fossListApps: FossListApp[] = [];
