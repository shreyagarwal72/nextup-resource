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
          "w-9 h-9 rounded-full bg-card border-2 border-foreground/80 shadow-pop flex items-center justify-center transition-all duration-300 ease-bounce hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5",
          isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive/80",
          className
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-all duration-300",
            isFavorite && "fill-current",
            isAnimating && "heart-beat"
          )}
          strokeWidth={2.5}
        />
      </button>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;
