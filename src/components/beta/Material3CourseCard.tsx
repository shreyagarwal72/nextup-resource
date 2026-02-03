import { Clock, Users, ExternalLink, Sparkles } from "lucide-react";
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
  title, 
  description, 
  category, 
  duration, 
  students, 
  image, 
  link,
  dateAdded 
}: Material3CourseCardProps) => {
  // Check if item is new (within 7 days)
  const isNew = dateAdded ? (() => {
    const addedDate = new Date(dateAdded);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  })() : false;

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="md3-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transitionTimingFunction: "var(--md-sys-motion-easing-emphasized)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span 
              className="md3-chip"
              style={{ 
                background: "hsl(var(--md-sys-color-primary-container))",
                color: "hsl(var(--md-sys-color-on-primary-container))"
              }}
            >
              {category}
            </span>
            {isNew && (
              <span 
                className="md3-chip flex items-center gap-1"
                style={{ 
                  background: "hsl(var(--md-sys-color-tertiary))",
                  color: "hsl(var(--md-sys-color-on-tertiary))"
                }}
              >
                <Sparkles className="w-3 h-3" />
                New
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 
            className="md3-title-medium mb-2 line-clamp-2 group-hover:underline"
            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
          >
            {title}
          </h3>
          <p 
            className="md3-body-small line-clamp-2 mb-4 flex-1"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
          >
            {description}
          </p>
          
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="md3-chip flex items-center gap-1 px-2 py-1"
              style={{ fontSize: "12px" }}
            >
              <Clock className="w-3.5 h-3.5" />
              {duration}
            </div>
            <div 
              className="md3-chip flex items-center gap-1 px-2 py-1"
              style={{ fontSize: "12px" }}
            >
              <Users className="w-3.5 h-3.5" />
              {students}
            </div>
          </div>
          
          <button 
            className="md3-filled-button w-full flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Access Course
          </button>
        </div>
      </div>
    </a>
  );
};

export default Material3CourseCard;
