import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import PlatformBadge from "./PlatformBadge";
import NewBadge from "./NewBadge";
import { useFavorites, generateId } from "@/hooks/useFavorites";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
}

const categoryColors = ["bg-quaternary", "bg-primary", "bg-secondary", "bg-tertiary"];

const ResourceCard = ({ title, description, category, image, link, dateAdded }: ResourceCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const resourceId = generateId(title);
  const isResourceFavorite = isFavorite(resourceId, "resource");
  const colorIndex = category.length % categoryColors.length;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(resourceId, "resource");
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="pop-card group overflow-hidden cursor-pointer h-full">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={`${title} - Free resource`}
            className="w-full h-full object-cover transition-transform duration-500 ease-bounce group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge className={`${categoryColors[colorIndex]} text-white border-2 border-foreground/80 font-bold text-xs rounded-full`}>
              {category}
            </Badge>
            <NewBadge dateAdded={dateAdded} />
          </div>
          <div className="absolute top-4 right-4 z-20">
            <FavoriteButton isFavorite={isResourceFavorite} onToggle={handleFavoriteClick} />
          </div>
          <PlatformBadge link={link} />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-primary-foreground font-bold text-sm px-5 py-3 rounded-full border-2 border-primary-foreground/50 transform scale-90 group-hover:scale-100 transition-transform duration-300 ease-bounce">
              <Download className="w-5 h-5" strokeWidth={2.5} />
              <span>Download Free</span>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 font-heading group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
