import { BookOpen, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Introduction to AI & Machine Learning",
    description: "Learn the fundamentals of artificial intelligence and machine learning from scratch.",
    category: "AI",
    duration: "8 weeks",
    students: 2500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Data Science Masterclass",
    description: "Comprehensive course covering data analysis, visualization, and predictive modeling.",
    category: "Data Science",
    duration: "12 weeks",
    students: 3200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    description: "Build modern web applications with React, Node.js, and cloud technologies.",
    category: "Web Dev",
    duration: "16 weeks",
    students: 4100,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    description: "Master the principles of user interface and user experience design.",
    category: "Design",
    duration: "6 weeks",
    students: 1800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
  },
  {
    id: 5,
    title: "Python for Beginners",
    description: "Start your programming journey with Python - the most beginner-friendly language.",
    category: "Programming",
    duration: "10 weeks",
    students: 5600,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
  },
  {
    id: 6,
    title: "Digital Marketing Strategy",
    description: "Learn effective marketing strategies for the digital age.",
    category: "Marketing",
    duration: "8 weeks",
    students: 2100,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
];

const CoursesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-border/50">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {course.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                  {course.title}
                </h3>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="default">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
