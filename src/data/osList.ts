export interface OsProject {
  name: string;
  category: string;
  description: string;
  links: { label: string; url: string }[];
  flags: string;
}

export const osCategories: string[] = [
  "Open Source OS",
  "Popular OS",
  "Web Clone \u2013 Windows",
  "Web Clone \u2013 macOS",
  "Web Clone \u2013 Linux",
  "Indie Web OS",
  "Portfolio / Personal OS",
  "Retro & Vintage Web",
  "Dev Resources & Books",
];

/** Hydrated at runtime from the backend (`os_projects` dataset). */
export const osProjects: OsProject[] = [];
