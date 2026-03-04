import { useState } from "react";
import { Clock, Users, ExternalLink, Sparkles } from "lucide-react";
import FavoriteButton from "../FavoriteButton";
import { useFavorites, generateId } from "@/hooks/useFavorites";
import "@/styles/material3.css";

interface Material3CourseCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  students: string;
  image: string;
  link: string;
  dateAdded?: string;
}

const Material3CourseCard = ({ 
  title, description, category, duration, students, image, link, dateAdded 
}: Material3CourseCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const courseId = generateId(title);
  const isCourseFavorite = isFavorite(courseId, "course");

  const isNew = dateAdded ? (() => {
    const addedDate = new Date(dateAdded);
    const now = new Date();
    return Math.ceil((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
  })() : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(courseId, "course");
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="md3-card overflow-hidden h-full flex flex-col md3-ripple-on-click">
        <div className="relative h-48 overflow-hidden">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 md3-skeleton" />
          )}
          <img
            src={image}
            alt={title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-600 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionTimingFunction: "var(--md-sys-motion-easing-emphasized)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="md3-chip md3-animate-enter"
              style={{ background: "hsl(var(--md-sys-color-primary-container))", color: "hsl(var(--md-sys-color-on-primary-container))" }}>
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
            <FavoriteButton isFavorite={isCourseFavorite} onToggle={handleFavoriteClick} />
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="md3-title-medium mb-2 line-clamp-2 group-hover:underline transition-colors duration-300"
            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            {title}
          </h3>
          <p className="md3-body-small line-clamp-2 mb-4 flex-1"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {description}
          </p>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="md3-chip flex items-center gap-1 px-2 py-1" style={{ fontSize: "12px" }}>
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </div>
            <div className="md3-chip flex items-center gap-1 px-2 py-1" style={{ fontSize: "12px" }}>
              <Users className="w-3.5 h-3.5" />
              {students}
            </div>
          </div>
          
          <button className="md3-filled-button w-full flex items-center justify-center gap-2 md3-ripple-on-click">
            <ExternalLink className="w-4 h-4" />
            Access Course
          </button>
        </div>
      </div>
    </a>
  );
};

export default Material3CourseCard;
