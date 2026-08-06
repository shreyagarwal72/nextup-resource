export type TelegramBotAccent = "primary" | "secondary" | "tertiary";

export type TelegramBot = {
  name: string;
  desc: string;
  url: string;
  tag: string;
  category: string;
  accent: TelegramBotAccent;
  dateAdded?: string;
};

/** Hydrated at runtime from the backend (`telegram_bots` dataset). */
export const telegramBots: TelegramBot[] = [];

/** Kept in sync with `telegramBots` by the content bridge. */
export const telegramBotCategories: string[] = [];
