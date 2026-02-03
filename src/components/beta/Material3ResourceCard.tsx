import { Download, Sparkles } from "lucide-react";
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
  title, 
  description, 
  category, 
  image, 
  link,
  dateAdded 
}: Material3ResourceCardProps) => {
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
      <div className="md3-card overflow-hidden h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ transitionTimingFunction: "var(--md-sys-motion-easing-emphasized)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span 
              className="md3-chip"
              style={{ 
                background: "hsl(var(--md-sys-color-secondary-container))",
                color: "hsl(var(--md-sys-color-on-secondary-container))"
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
          
          {/* Download overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ background: "hsl(var(--md-sys-color-primary) / 0.2)" }}>
            <div className="md3-extended-fab">
              <Download className="w-5 h-5" />
              <span>Download</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 
            className="md3-title-medium mb-2 line-clamp-2"
            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
          >
            {title}
          </h3>
          <p 
            className="md3-body-small line-clamp-2"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
          >
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Material3ResourceCard;
