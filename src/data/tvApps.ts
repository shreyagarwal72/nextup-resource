export interface TvApp {
  name: string;
  category: string;
  description: string;
  links: { label: string; url: string }[];
  flags: string;
}

/** Hydrated at runtime from the backend (`tv_apps` dataset). */
export const tvApps: TvApp[] = [];

/** Kept in sync with `tvApps` by the content bridge. */
export const tvCategories: string[] = [];
