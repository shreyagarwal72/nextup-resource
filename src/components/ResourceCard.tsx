import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
}

const ResourceCard = ({ title, description, category, image, link }: ResourceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full group-hover:bg-primary/90" 
          variant="default"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Download Free
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
