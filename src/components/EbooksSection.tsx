import { useState, useEffect } from "react";
import EbookCard from "./EbookCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Import generated ebook images
import ebookDefaultImg from "@/assets/ebooks/ebook-default.jpg";
import videoEditorEbookImg from "@/assets/ebooks/video-editor-ebook.jpg";
import vipEbookPackImg from "@/assets/ebooks/vip-ebook-pack.jpg";

const EbooksSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for skeleton demonstration
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Ebooks sorted alphabetically by title
  const ebooks = [
    {
      title: "Ebook Abdellah",
      description:
        "Comprehensive educational ebook covering essential topics and strategies. Learn from expert insights and practical knowledge.",
      category: "Education",
      image: ebookDefaultImg,
      link: "https://drive.google.com/drive/folders/1PWV29Q0NH4-2jqA8hYNw6WGShamu6HiE",
    },
    {
      title: "How to Become Video Editor Full Ebook",
      description:
        "Complete guide to becoming a professional video editor. Learn editing techniques, software workflows, and industry best practices.",
      category: "Video Editing",
      image: videoEditorEbookImg,
      link: "https://t.me/nextupfilebot?start=BQADAQADXQ4AAr-PsUdMDZZ5OgvUFBYE",
    },
    {
      title: "VIP Ebook Pack",
      description:
        "50+ exclusive videos with coaching, 50,000+ international suppliers, 100,000+ editable Reels & templates. Includes influence strategies, logistics, taxation, Shopify pages, viral hooks, and tutorials.",
      category: "Business",
      image: vipEbookPackImg,
      link: "https://drive.google.com/drive/folders/1PWV29Q0NH4-2jqA8hYNw6WGShamu6HiE?usp=drive_link",
    },
  ];

  const filteredEbooks = ebooks.filter((ebook) =>
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

        {isLoading ? (
          <LoadingSkeleton type="resource" count={3} />
        ) : filteredEbooks.length > 0 ? (
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
