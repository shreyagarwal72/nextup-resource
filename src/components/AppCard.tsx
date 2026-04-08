import { Badge } from "@/components/ui/badge";
import { Download, Smartphone } from "lucide-react";
import PlatformBadge from "./PlatformBadge";
import NewBadge from "./NewBadge";

interface AppCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  dateAdded?: string;
}

const AppCard = ({ title, description, category, image, link, dateAdded }: AppCardProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
      <div className="pop-card overflow-hidden h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img src={image} alt={title} className="w-full h-48 object-cover transition-transform duration-500 ease-bounce group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 bg-card border-2 border-foreground/80 shadow-pop">
              <Download className="w-4 h-4" strokeWidth={2.5} /> Download App
            </span>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge className="bg-quaternary text-quaternary-foreground border-2 border-foreground/80 text-xs font-bold px-3 py-1 flex items-center gap-1 rounded-full">
              <Smartphone className="w-3 h-3" strokeWidth={2.5} /> {category}
            </Badge>
            <NewBadge dateAdded={dateAdded} />
          </div>
          <PlatformBadge link={link} className="bottom-3 right-3" />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 font-heading group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default AppCard;
