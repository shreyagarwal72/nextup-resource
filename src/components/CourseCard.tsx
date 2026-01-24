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
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students} students</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full group-hover:bg-primary/90" 
          variant="default"
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
