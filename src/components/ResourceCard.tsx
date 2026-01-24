import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const ResourceCard = ({
  title,
  description,
  category,
  image,
  link,
}: ResourceCardProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-card/80 backdrop-blur-sm">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${title} - Free resource`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              {category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Download className="w-5 h-5" />
              <span>Download Free</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
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
