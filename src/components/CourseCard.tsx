import { Clock, Users, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  students: string;
  image: string;
  link: string;
}

const CourseCard = ({ title, description, category, duration, students, image, link }: CourseCardProps) => {
  return (
    <Card className="group h-full flex flex-col">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        <Badge className="absolute top-3 left-3 glass-button border-0 text-foreground">
          {category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="pb-4 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 glass-button px-2.5 py-1 rounded-lg text-xs">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 glass-button px-2.5 py-1 rounded-lg text-xs">
            <Users className="h-3.5 w-3.5" />
            <span>{students}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant="glassPrimary"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Access Course
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
