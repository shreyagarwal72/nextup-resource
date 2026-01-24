import { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Import generated resource images
import bmwRawClipsImg from "@/assets/resources/bmw-raw-clips.jpg";
import instagramHooksImg from "@/assets/resources/instagram-hooks.jpg";
import motivationReelsImg from "@/assets/resources/motivation-reels.jpg";
import promptCollectionImg from "@/assets/resources/prompt-collection.jpg";

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for skeleton demonstration
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Resources sorted alphabetically by title
  const resources = [
    {
      title: "15000+ Prompt Collection with Resell Rights",
      description:
        "Massive collection of AI prompts for ChatGPT, Midjourney, and more. Includes resell rights for commercial use and content creation.",
      category: "AI Prompts",
      image: promptCollectionImg,
      link: "https://docs.google.com/spreadsheets/d/1OP8oUzIOFkSCYTst43Y9mmasYvdbQkCKIJiQEa_qm-0/edit?usp=drivesdk",
    },
    {
      title: "All Sound Effects",
      description:
        "Comprehensive collection of high-quality sound effects for video editing, music production, and content creation. Perfect for enhancing your projects.",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1u6cDD5SpUC0M3eiDdYgalNvt58vKucgs",
    },
    {
      title: "BMW Car Raw Video Clips",
      description:
        "Premium collection of cinematic BMW car footage for video editing, automotive content, and professional productions. High-quality raw clips.",
      category: "Video",
      image: bmwRawClipsImg,
      link: "https://drive.google.com/drive/folders/1CqKEg7q-zwcq3wXehZbMBx2LJ6LPnwrl",
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
      title: "Instagram Viral Hook Bundle",
      description:
        "Collection of trending Instagram hooks, text overlays, and templates to boost engagement and create viral Reels content.",
      category: "Social Media",
      image: instagramHooksImg,
      link: "https://drive.google.com/drive/folders/1IyuR4KTZVJX80LsJlIxeJgKWe1EZFrNP",
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
      title: "Memes Pack",
      description:
        "Curated collection of trending memes and viral content templates. Perfect for social media creators and content marketers.",
      category: "Content",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1O8Tz_6Ida0mrzgY83v_XF8B3kF4A1JdD",
    },
    {
      title: "Premanand Ji Maharaj Motivation Reels Bundle",
      description:
        "Collection of spiritual motivation content featuring Premanand Ji Maharaj. Perfect for creating inspirational Reels and short-form content.",
      category: "Spiritual",
      image: motivationReelsImg,
      link: "https://drive.google.com/drive/folders/1kOky_FOI3ZBOVzsIYifbmKbRVLcNQCkx",
    },
    {
      title: "Premium Asset Collection",
      description:
        "Comprehensive collection of premium assets for video editing, graphic design, and content creation.",
      category: "Assets",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1acl8L0fcWuVWtQvOBHllOXmOqUBLu0sm",
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
      title: "Visualsbylalit Editing Pack",
      description:
        "Premium editing pack with transitions, effects, and templates for professional video editing. Elevate your content with cinematic tools.",
      category: "Video",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop",
      link: "https://drive.google.com/drive/folders/1tF0AUt9RIZdENTDJJa1fktPtzTdGslN6",
    },
  ];

  const filteredResources = resources.filter((resource) =>
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

        {isLoading ? (
          <LoadingSkeleton type="resource" count={6} />
        ) : filteredResources.length > 0 ? (
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
              <p className="text-muted-foreground text-lg">
                No resources found matching "{searchQuery}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesSection;
