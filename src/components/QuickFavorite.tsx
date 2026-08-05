import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites, generateId, type FavoriteType } from "@/hooks/useFavorites";

/**
 * Drop-in favourite heart for pages whose cards aren't built from the shared
 * card components (TV apps, OS, Games, IoT, APIs, bots, Morphe, Material You…).
 * Keeps the favourite experience identical everywhere.
 */
const QuickFavorite = ({
  name,
  type,
  className,
}: {
  name: string;
  type: FavoriteType;
  className?: string;
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const id = generateId(name);

  return (
    <FavoriteButton
      isFavorite={isFavorite(id, type)}
      onToggle={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id, type);
      }}
      className={className}
    />
  );
};

export default QuickFavorite;
