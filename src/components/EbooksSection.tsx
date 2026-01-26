import { useState } from "react";
import EbookCard from "./EbookCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { allEbooks } from "@/data/content";

const EbooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Removed artificial loading delay for better performance

  const filteredEbooks = allEbooks.filter((ebook) =>
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
              <p className="text-muted-foreground text-lg">
                No ebooks found matching "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EbooksSection;
