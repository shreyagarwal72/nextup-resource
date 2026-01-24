import { useState } from "react";
import ResourceCard from "./ResourceCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resources = [
    {
      title: "All Sound Effects",
      description:
        "Comprehensive collection of high-quality sound effects for video editing, music production, and content creation. Perfect for enhancing your projects.",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1u6cDD5SpUC0M3eiDdYgalNvt58vKucgs",
    },
    {
      title: "Visualsbylalit Editing Pack",
      description:
        "Premium editing pack with transitions, effects, and templates for professional video editing. Elevate your content with cinematic tools.",
      category: "Video",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1tF0AUt9RIZdENTDJJa1fktPtzTdGslN6",
    },
    {
      title: "Ebook Abdellah",
      description:
        "Comprehensive educational ebook covering essential topics and strategies. Learn from expert insights and practical knowledge.",
      category: "Ebook",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1PWV29Q0NH4-2jqA8hYNw6WGShamu6HiE",
    },
    {
      title: "Memes Pack",
      description:
        "Curated collection of trending memes and viral content templates. Perfect for social media creators and content marketers.",
      category: "Content",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1O8Tz_6Ida0mrzgY83v_XF8B3kF4A1JdD",
    },
    {
      title: "Mega Thumbnail VFX Assets Pack",
      description:
        "Professional VFX assets and thumbnail templates to create eye-catching YouTube thumbnails and video content.",
      category: "Graphics",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1VuNLqGCORHLfRb5Q-GyHs5Ly0Ll_gkuH",
    },
    {
      title: "Senpai Spider 1 Million Minecraft Texture Pack",
      description:
        "Massive Minecraft texture collection with over 1 million high-quality textures for ultimate customization.",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1Z1JTqoljxO1CnZrNdfWRWQrUUqXUmx1K",
    },
    {
      title: "Premium Asset Collection",
      description:
        "Comprehensive collection of premium assets for video editing, graphic design, and content creation.",
      category: "Assets",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1acl8L0fcWuVWtQvOBHllOXmOqUBLu0sm",
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
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
            <p className="text-muted-foreground text-lg">
              No resources found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
