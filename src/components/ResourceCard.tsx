import { Card, CardContent } from "@/components/ui/card";
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

const ResourceCard = ({
  title,
  description,
  category,
  image,
  link,
  dateAdded,
}: ResourceCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const resourceId = generateId(title);
  const isResourceFavorite = isFavorite(resourceId, "resource");

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(resourceId, "resource");
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="group overflow-hidden cursor-pointer h-full transition-all duration-500 ease-apple-spring hover:shadow-glass-xl">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${title} - Free resource`}
            className="w-full h-full object-cover transition-transform duration-600 ease-apple-overshoot group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent transition-opacity duration-300 group-hover:from-foreground/40" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge className="glass-button border-0 text-foreground animate-ios-pop">
              {category}
            </Badge>
            <NewBadge dateAdded={dateAdded} />
          </div>
          <div className="absolute top-4 right-4 z-20">
            <FavoriteButton
              isFavorite={isResourceFavorite}
              onToggle={handleFavoriteClick}
            />
          </div>
          <PlatformBadge link={link} />
          
          {/* iOS-style hover overlay */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-400 ease-apple-ease flex items-center justify-center pointer-events-none">
            <div className="glass-heavy flex items-center gap-2 text-foreground font-semibold px-5 py-3 rounded-xl transform scale-90 group-hover:scale-100 transition-transform duration-400 ease-apple-spring">
              <Download className="w-5 h-5" />
              <span>Download Free</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 transition-colors duration-300 ease-apple-ease group-hover:text-primary">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default ResourceCard;
