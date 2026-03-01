import { useState } from "react";
import { allApps as apps, App, sortByPreference, groupByCategory } from "@/data/content";
import { Smartphone, ExternalLink, Search, Download, Gamepad2, Monitor } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const studyCategories = ["Development", "Utility", "Productivity", "Education"];

const BetaApps = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();
  
  const filteredApps = isStudyMode
    ? apps.filter(app => 
        studyCategories.some(cat => 
          app.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : apps;

  const searchFiltered = filteredApps.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedApps = sortByPreference(searchFiltered, sortPreference);
  const groupedApps = groupByCategory(sortedApps);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("pc gaming")) return <Monitor className="w-5 h-5" />;
    if (category.toLowerCase().includes("gaming")) return <Gamepad2 className="w-5 h-5" />;
    return <Smartphone className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-tertiary-container)) 50%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="absolute inset-0 opacity-30"
             style={{ background: "radial-gradient(circle at 80% 20%, hsl(var(--md-sys-color-primary) / 0.2), transparent 50%)" }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center md3-animate-enter"
               style={{ 
                 background: "hsl(var(--md-sys-color-primary))",
                 boxShadow: "0 8px 32px hsl(var(--md-sys-color-primary) / 0.3)"
               }}>
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="md3-display-small mb-4 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 700 }}>
            {isStudyMode ? "Productivity Apps" : "Free Apps & Games"}
          </h1>
          
          <p className="md3-body-large max-w-2xl mx-auto mb-8 md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Productivity and development apps for focused learning."
              : "Download premium apps and games completely free. Mobile & PC."}
          </p>

          <div className="md3-search-bar max-w-xl mx-auto md3-animate-enter md3-stagger-3">
            <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
            <input
              type="text"
              placeholder="Search apps & games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none md3-body-large"
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
            />
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {Object.keys(groupedApps).length === 0 ? (
            <div className="text-center py-16">
              <Smartphone className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
              <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                {searchQuery ? `No apps found matching "${searchQuery}"` : "No study-related apps found. Toggle off Study Mode to see all content."}
              </p>
            </div>
          ) : (
            Object.entries(groupedApps).map(([category, categoryApps]) => (
              <div key={category} className="mb-14 md3-animate-enter">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}>
                    <span style={{ color: "hsl(var(--md-sys-color-on-secondary-container))" }}>
                      {getCategoryIcon(category)}
                    </span>
                  </div>
                  <div>
                    <h2 className="md3-headline-small"
                        style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                      {category}
                    </h2>
                    <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                      {categoryApps.length} item{categoryApps.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryApps.map((app, index) => (
                    <a
                      key={app.title}
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`md3-card overflow-hidden group md3-animate-enter md3-stagger-${(index % 6) + 1}`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={app.image}
                          alt={app.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                          <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
                                style={{ background: "hsl(var(--md-sys-color-primary))" }}>
                            <Download className="w-4 h-4" />
                            Download
                          </span>
                        </div>
                        {/* Category chip */}
                        <div className="absolute top-3 left-3">
                          <span className="md3-chip text-xs px-3 py-1"
                                style={{ background: "hsl(var(--md-sys-color-surface) / 0.85)", backdropFilter: "blur(8px)" }}>
                            {app.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="md3-title-medium mb-2 line-clamp-1 group-hover:text-inherit transition-colors"
                            style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                          {app.title}
                        </h3>
                        <p className="md3-body-small mb-4 line-clamp-2"
                           style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                          {app.description}
                        </p>
                        
                        <div className="flex items-center gap-2 md3-filled-button text-sm justify-center">
                          <ExternalLink className="w-4 h-4" />
                          Get App
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaApps;