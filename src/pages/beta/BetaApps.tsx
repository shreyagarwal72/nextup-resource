import { useState } from "react";
import { allApps as apps, allWebsites as websites, App, Website, sortByPreference, groupByCategory } from "@/data/content";
import { Smartphone, ExternalLink, Search, Download, Gamepad2, Monitor, Globe } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const studyCategories = ["Development", "Utility", "Productivity", "Education", "Web Development", "Programming", "DevOps", "AI & ML"];

const BetaApps = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"apps" | "websites">("apps");
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();
  
  const filteredApps = isStudyMode
    ? apps.filter(app => studyCategories.some(cat => app.category.toLowerCase().includes(cat.toLowerCase())))
    : apps;

  const searchFiltered = filteredApps.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchFilteredWebsites = websites.filter((site) =>
    site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedApps = sortByPreference(searchFiltered, sortPreference);
  const groupedApps = groupByCategory(sortedApps);
  const groupedWebsites = groupByCategory(searchFilteredWebsites);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("pc gaming")) return <Monitor className="w-5 h-5" />;
    if (category.toLowerCase().includes("gaming")) return <Gamepad2 className="w-5 h-5" />;
    if (category.toLowerCase().includes("web") || category.toLowerCase().includes("dev")) return <Globe className="w-5 h-5" />;
    return <Smartphone className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen">
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-tertiary-container)) 50%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-primary))", boxShadow: "0 8px 32px hsl(var(--md-sys-color-primary) / 0.3)" }}>
            <Smartphone className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="md3-display-small mb-4 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 700 }}>
            {isStudyMode ? "Productivity Apps" : "Apps & Websites"}
          </h1>
          
          <p className="md3-body-large max-w-2xl mx-auto mb-8 md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode ? "Productivity and development apps for focused learning." : "Premium apps, games, and curated learning websites."}
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-3 mb-6 md3-animate-enter md3-stagger-2">
            <button onClick={() => setActiveTab("apps")}
              className={`md3-chip flex items-center gap-2 px-5 py-2.5 transition-all duration-300`}
              style={{
                background: activeTab === "apps" ? "hsl(var(--md-sys-color-primary))" : "hsl(var(--md-sys-color-surface-variant))",
                color: activeTab === "apps" ? "hsl(var(--md-sys-color-on-primary))" : "hsl(var(--md-sys-color-on-surface-variant))",
              }}>
              <Smartphone className="w-4 h-4" /> Apps
            </button>
            <button onClick={() => setActiveTab("websites")}
              className={`md3-chip flex items-center gap-2 px-5 py-2.5 transition-all duration-300`}
              style={{
                background: activeTab === "websites" ? "hsl(var(--md-sys-color-primary))" : "hsl(var(--md-sys-color-surface-variant))",
                color: activeTab === "websites" ? "hsl(var(--md-sys-color-on-primary))" : "hsl(var(--md-sys-color-on-surface-variant))",
              }}>
              <Globe className="w-4 h-4" /> Websites
            </button>
          </div>

          <div className="md3-search-bar max-w-xl mx-auto md3-animate-enter md3-stagger-3">
            <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
            <input
              type="text"
              placeholder={activeTab === "apps" ? "Search apps & games..." : "Search websites..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none md3-body-large"
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {activeTab === "apps" ? (
            Object.keys(groupedApps).length === 0 ? (
              <div className="text-center py-16">
                <Smartphone className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
                <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  {searchQuery ? `No apps found matching "${searchQuery}"` : "No study-related apps found."}
                </p>
              </div>
            ) : (
              Object.entries(groupedApps).map(([category, categoryApps]) => (
                <div key={category} className="mb-14 md3-animate-enter">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}>
                      <span style={{ color: "hsl(var(--md-sys-color-on-secondary-container))" }}>{getCategoryIcon(category)}</span>
                    </div>
                    <div>
                      <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>{category}</h2>
                      <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{categoryApps.length} items</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryApps.map((app, index) => (
                      <a key={app.title} href={app.link} target="_blank" rel="noopener noreferrer"
                         className={`md3-card overflow-hidden group md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                        <div className="aspect-video relative overflow-hidden">
                          <img src={app.image} alt={app.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                            <span className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white" style={{ background: "hsl(var(--md-sys-color-primary))" }}>
                              <Download className="w-4 h-4" /> Download
                            </span>
                          </div>
                          <div className="absolute top-3 left-3">
                            <span className="md3-chip text-xs px-3 py-1" style={{ background: "hsl(var(--md-sys-color-surface) / 0.85)", backdropFilter: "blur(8px)" }}>{app.category}</span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="md3-title-medium mb-2 line-clamp-1" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>{app.title}</h3>
                          <p className="md3-body-small mb-4 line-clamp-2" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{app.description}</p>
                          <div className="flex items-center gap-2 md3-filled-button text-sm justify-center">
                            <ExternalLink className="w-4 h-4" /> Get App
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))
            )
          ) : (
            // Websites tab
            Object.keys(groupedWebsites).length === 0 ? (
              <div className="text-center py-16">
                <Globe className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
                <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  No websites found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              Object.entries(groupedWebsites).map(([category, categorySites]) => (
                <div key={category} className="mb-14 md3-animate-enter">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}>
                      <Globe className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-secondary-container))" }} />
                    </div>
                    <div>
                      <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>{category}</h2>
                      <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{categorySites.length} sites</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySites.map((site, index) => (
                      <a key={site.title} href={site.link} target="_blank" rel="noopener noreferrer"
                         className={`md3-card overflow-hidden group md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                        <div className="aspect-video relative overflow-hidden">
                          <img src={site.image} alt={site.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="md3-chip text-xs px-3 py-1" style={{ background: "hsl(var(--md-sys-color-surface) / 0.85)", backdropFilter: "blur(8px)" }}>{site.category}</span>
                          </div>
                          <div className="absolute bottom-3 left-3 text-2xl">{site.emoji}</div>
                        </div>
                        <div className="p-5">
                          <h3 className="md3-title-medium mb-2 line-clamp-1" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>{site.title}</h3>
                          <p className="md3-body-small mb-4 line-clamp-2" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{site.description}</p>
                          <div className="flex items-center gap-2 md3-filled-button text-sm justify-center">
                            <ExternalLink className="w-4 h-4" /> Visit Site
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaApps;
