import { useState } from "react";
import EbookCard from "./EbookCard";
import { Input } from "@/components/ui/input";
import { Search, BookText } from "lucide-react";
import { allEbooks } from "@/data/content";
import { useStudyMode } from "@/hooks/useStudyMode";

// Study-related ebook categories
const studyEbookCategories = ["Education", "Business", "Technology", "Development", "Learning", "Guide"];

const EbooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();

  // Filter by study mode first
  const studyFilteredEbooks = isStudyMode
    ? allEbooks.filter(ebook => 
        studyEbookCategories.some(cat => 
          ebook.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : allEbooks;

  // Then filter by search query
  const filteredEbooks = studyFilteredEbooks.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="liquid-blob w-72 h-72 bg-primary/10 top-20 -left-36" />
      <div className="liquid-blob w-64 h-64 bg-amber-400/10 -bottom-20 -right-32" style={{ animationDelay: "-4s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header for Study Mode */}
        {isStudyMode && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-ios-pop">
                <BookText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Study Ebooks
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Educational ebooks and guides for focused learning.
            </p>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search ebooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {filteredEbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEbooks.map((ebook, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EbookCard {...ebook} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
              <BookText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `No ebooks found matching "${searchQuery}"`
                  : "No study-related ebooks found. Toggle off Study Mode to see all content."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EbooksSection;
