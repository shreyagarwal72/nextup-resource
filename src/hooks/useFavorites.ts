import { useState, useEffect, useCallback } from "react";

type FavoriteType = "course" | "resource";

interface FavoriteItem {
  id: string;
  type: FavoriteType;
}

const STORAGE_KEY = "nextup_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  const saveFavorites = useCallback((newFavorites: FavoriteItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  }, []);

  const isFavorite = useCallback(
    (id: string, type: FavoriteType) => {
      return favorites.some((fav) => fav.id === id && fav.type === type);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (id: string, type: FavoriteType) => {
      const exists = favorites.some((fav) => fav.id === id && fav.type === type);
      if (exists) {
        saveFavorites(favorites.filter((fav) => !(fav.id === id && fav.type === type)));
      } else {
        saveFavorites([...favorites, { id, type }]);
      }
    },
    [favorites, saveFavorites]
  );

  const getFavoritesByType = useCallback(
    (type: FavoriteType) => {
      return favorites.filter((fav) => fav.type === type).map((fav) => fav.id);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
    clearFavorites,
    totalCount: favorites.length,
  };
};

// Helper to generate a consistent ID from title
export const generateId = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

// Helper to detect platform from link
export const getPlatformFromLink = (link: string): "telegram" | "drive" | "mega" | "other" => {
  if (link.includes("t.me") || link.includes("telegram")) return "telegram";
  if (link.includes("drive.google.com")) return "drive";
  if (link.includes("mega.nz")) return "mega";
  return "other";
};
