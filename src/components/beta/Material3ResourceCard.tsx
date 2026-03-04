import { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import FavoriteButton from "../FavoriteButton";
import { useFavorites, generateId } from "@/hooks/useFavorites";
import "@/styles/material3.css";

interface Material3ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
}

const Material3ResourceCard = ({ 
  title, description, category, image, link, dateAdded 
}: Material3ResourceCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const resourceId = generateId(title);
  const isResourceFavorite = isFavorite(resourceId, "resource");

  const isNew = dateAdded ? (() => {
    const addedDate = new Date(dateAdded);
    const now = new Date();
    return Math.ceil((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
  })() : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(resourceId, "resource");
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="md3-card overflow-hidden h-full md3-ripple-on-click">
        <div className="relative h-44 overflow-hidden">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 md3-skeleton" />
          )}
          <img
            src={image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-600 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionTimingFunction: "var(--md-sys-motion-easing-emphasized)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="md3-chip md3-animate-enter"
              style={{ background: "hsl(var(--md-sys-color-secondary-container))", color: "hsl(var(--md-sys-color-on-secondary-container))" }}>
              {category}
            </span>
            {isNew && (
              <span className="md3-chip flex items-center gap-1 md3-animate-enter md3-stagger-1"
                style={{ background: "hsl(var(--md-sys-color-tertiary))", color: "hsl(var(--md-sys-color-on-tertiary))" }}>
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
          </div>

          {/* Favorite button */}
          <div className="absolute top-3 right-3 z-20">
            <FavoriteButton isFavorite={isResourceFavorite} onToggle={handleFavoriteClick} />
          </div>
          
          {/* Download overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400"
               style={{ background: "hsl(var(--md-sys-color-primary) / 0.2)", backdropFilter: "blur(4px)" }}>
            <div className="md3-extended-fab md3-animate-enter">
              <Download className="w-5 h-5" />
              <span>Download</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="md3-title-medium mb-2 line-clamp-2 transition-colors duration-300"
            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            {title}
          </h3>
          <p className="md3-body-small line-clamp-2"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Material3ResourceCard;
