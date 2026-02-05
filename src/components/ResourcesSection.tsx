import { useState } from "react";
import ResourceCard from "./ResourceCard";
import { Input } from "@/components/ui/input";
import { Search, Package } from "lucide-react";
import { allResources } from "@/data/content";
import { useStudyMode } from "@/hooks/useStudyMode";

// Study-related resource categories
const studyResourceCategories = ["Education", "Templates", "Tools", "AI", "Productivity", "Learning"];

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();

  // Filter by study mode first
  const studyFilteredResources = isStudyMode
    ? allResources.filter(resource => 
        studyResourceCategories.some(cat => 
          resource.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : allResources;

  // Then filter by search query
  const filteredResources = studyFilteredResources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="liquid-blob w-72 h-72 bg-primary/10 top-20 -left-36" />
      <div className="liquid-blob w-64 h-64 bg-pink-400/10 -bottom-20 -right-32" style={{ animationDelay: "-4s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header for Study Mode */}
        {isStudyMode && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-ios-pop">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Study Resources
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Educational resources and learning materials for focused study.
            </p>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ResourceCard {...resource} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `No resources found matching "${searchQuery}"`
                  : "No study-related resources found. Toggle off Study Mode to see all content."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
