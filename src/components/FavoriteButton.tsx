import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, forwardRef, useCallback, useRef } from "react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (e: React.MouseEvent) => void;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
}

const COLORS = [
  "hsl(262, 83%, 66%)",  // primary violet
  "hsl(330, 86%, 70%)",  // secondary pink
  "hsl(43, 96%, 56%)",   // tertiary amber
  "hsl(160, 64%, 52%)",  // quaternary emerald
  "hsl(0, 84%, 60%)",    // red
];

const FavoriteButton = forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  ({ isFavorite, onToggle, className }, ref) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const nextId = useRef(0);

    const spawnConfetti = useCallback(() => {
      const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
        id: nextId.current++,
        x: 0,
        y: 0,
        color: COLORS[i % COLORS.length],
        size: 3 + Math.random() * 4,
        angle: (i * 45) + (Math.random() * 20 - 10),
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 600);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
      if (!isFavorite) {
        setIsAnimating(true);
        spawnConfetti();
        setTimeout(() => setIsAnimating(false), 800);
      }
      onToggle(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "w-9 h-9 rounded-full bg-card border-2 border-foreground/80 shadow-pop flex items-center justify-center transition-all duration-300 ease-bounce hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5 relative overflow-visible",
          isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive/80",
          className
        )}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isFavorite && "fill-current",
            isAnimating && "heart-beat"
          )}
          strokeWidth={2.5}
        />
        {/* Confetti particles */}
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const dist = 18 + Math.random() * 8;
          const tx = Math.cos(rad) * dist;
          const ty = Math.sin(rad) * dist;
          return (
            <span
              key={p.id}
              className="absolute pointer-events-none rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                top: '50%',
                left: '50%',
                marginTop: -p.size / 2,
                marginLeft: -p.size / 2,
                animation: `confetti-fly 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                // @ts-ignore
                '--tx': `${tx}px`,
                '--ty': `${ty}px`,
              } as React.CSSProperties}
            />
          );
        })}
        <style>{`
          @keyframes confetti-fly {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
          }
        `}</style>
      </button>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";

export default FavoriteButton;
