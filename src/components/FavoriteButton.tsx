import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

const FavoriteButton = ({ isFavorite, onToggle, className }: FavoriteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-9 h-9 rounded-xl glass-heavy flex items-center justify-center transition-all duration-300 hover:scale-110",
        isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive/80",
        className
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "w-5 h-5 transition-all duration-300",
          isFavorite && "fill-current scale-110"
        )}
      />
    </button>
  );
};

export default FavoriteButton;
