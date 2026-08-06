export interface AITool {
  name: string;
  description: string;
  url: string;
  category: string;
}

/** Hydrated at runtime from the backend (`ai_tools` dataset). */
export const aiTools: AITool[] = [];
