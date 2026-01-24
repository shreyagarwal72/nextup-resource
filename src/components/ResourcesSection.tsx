import { Download, FileText, Music, Palette, Video, BookOpen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const resources = [
  {
    id: 1,
    title: "Sound Effects Pack Vol. 1",
    description: "100+ high-quality sound effects for video editing and content creation.",
    category: "Audio",
    downloads: 12500,
    fileType: "ZIP",
    icon: Music,
  },
  {
    id: 2,
    title: "Video Editing LUTs Collection",
    description: "Professional color grading LUTs for cinematic video production.",
    category: "Video",
    downloads: 8700,
    fileType: "ZIP",
    icon: Video,
  },
  {
    id: 3,
    title: "UI Design Kit for Figma",
    description: "Complete UI component library with 500+ ready-to-use elements.",
    category: "Design",
    downloads: 15200,
    fileType: "FIG",
    icon: Palette,
  },
  {
    id: 4,
    title: "eBook: Productivity Mastery",
    description: "Learn proven techniques to boost your productivity and achieve more.",
    category: "eBook",
    downloads: 6300,
    fileType: "PDF",
    icon: BookOpen,
  },
  {
    id: 5,
    title: "Motion Graphics Templates",
    description: "20 customizable After Effects templates for professional animations.",
    category: "Video",
    downloads: 9400,
    fileType: "AEP",
    icon: Video,
  },
  {
    id: 6,
    title: "Coding Cheat Sheets Bundle",
    description: "Quick reference guides for Python, JavaScript, React, and more.",
    category: "Document",
    downloads: 21000,
    fileType: "PDF",
    icon: FileText,
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">{resource.fileType}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{resource.category}</Badge>
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {resource.downloads.toLocaleString()} downloads
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    <Download className="h-4 w-4 mr-2" />
                    Download Free
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
