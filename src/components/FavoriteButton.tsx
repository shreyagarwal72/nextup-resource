import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, forwardRef } from "react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

const FavoriteButton = forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  ({ isFavorite, onToggle, className }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
      if (!isFavorite) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 800);
      }
      onToggle(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "w-9 h-9 rounded-xl glass-heavy flex items-center justify-center transition-all duration-400 ease-apple-spring hover:scale-110 active:scale-95",
          isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive/80",
          className
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "w-5 h-5 transition-all duration-400 ease-apple-spring",
            isFavorite && "fill-current",
            isAnimating && "heart-beat"
          )}
        />
      </button>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;
