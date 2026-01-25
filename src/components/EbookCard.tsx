import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import PlatformBadge from "./PlatformBadge";
import { useFavorites, generateId } from "@/hooks/useFavorites";

interface EbookCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const EbookCard = ({ title, description, category, image, link }: EbookCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const ebookId = generateId(title);
  const isEbookFavorite = isFavorite(ebookId, "ebook");

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(ebookId, "ebook");
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className="glass-card overflow-hidden transition-all duration-500 ease-apple-spring hover:shadow-glass-lg hover:-translate-y-2 hover:scale-[1.02] h-full">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-700 ease-apple-spring group-hover:scale-110"
            loading="lazy"
          />
          {/* Hover overlay with download CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="glass-button px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 text-foreground">
              <Download className="w-4 h-4" />
              Download Free
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <Badge className="glass-heavy text-xs font-medium px-3 py-1 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 z-20">
            <FavoriteButton
              isFavorite={isEbookFavorite}
              onToggle={handleFavoriteClick}
            />
          </div>
          <PlatformBadge link={link} className="bottom-3 right-3" />
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {description}
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default EbookCard;
