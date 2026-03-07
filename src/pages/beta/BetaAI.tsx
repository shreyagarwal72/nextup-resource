import { aiTools } from "@/data/aiTools";
import { useState, useMemo } from "react";
import { Search, ExternalLink, Bot, Sparkles, Filter, X, Grid3X3, List } from "lucide-react";
import "@/styles/material3.css";

const BetaAI = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const cats = new Set(aiTools.map(t => t.category));
    return Array.from(cats).sort();
  }, []);

  const filtered = aiTools.filter(
    (t) =>
      (t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       t.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedCategory || t.category === selectedCategory)
  );

  const grouped = filtered.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof aiTools>);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-secondary-container)) 50%, hsl(var(--md-sys-color-surface)) 100%)` }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 md3-hero-float"
             style={{ background: "hsl(var(--md-sys-color-primary))" }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center md3-animate-enter md3-pulse-glow"
               style={{ background: "hsl(var(--md-sys-color-primary))", boxShadow: "0 8px 32px hsl(var(--md-sys-color-primary) / 0.3)" }}>
            <Bot className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="mb-4 md3-animate-enter md3-stagger-1"
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700 }}>
            AI Tools Collection
          </h1>
          <p className="md3-body-large mb-2 max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {filtered.length} powerful AI tools to supercharge your workflow
          </p>
          
          {/* Stats chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 md3-animate-enter md3-stagger-3">
            <span className="md3-chip" style={{ background: "hsl(var(--md-sys-color-secondary-container))", color: "hsl(var(--md-sys-color-on-secondary-container))" }}>
              {categories.length} Categories
            </span>
            <span className="md3-chip" style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
              {aiTools.length} Tools
            </span>
            <span className="md3-chip" style={{ background: "hsl(var(--md-sys-color-primary-container))", color: "hsl(var(--md-sys-color-on-primary-container))" }}>
              100% Free
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Search + Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6 md3-animate-enter">
            <div className="md3-search-bar flex-1 w-full">
              <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none md3-body-large"
                style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="md3-icon-button" style={{ width: 32, height: 32 }}>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* View Toggle - Segmented Button */}
            <div className="md3-segmented-button-group">
              <button className={`md3-segmented-button ${viewMode === "grid" ? "selected" : ""}`}
                      onClick={() => setViewMode("grid")}>
                <Grid3X3 className="w-4 h-4" /> Grid
              </button>
              <button className={`md3-segmented-button ${viewMode === "list" ? "selected" : ""}`}
                      onClick={() => setViewMode("list")}>
                <List className="w-4 h-4" /> List
              </button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-8 md3-animate-enter md3-stagger-1">
            <button
              className={`md3-filter-chip ${!selectedCategory ? "selected" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              <Filter className="w-3.5 h-3.5" />
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`md3-filter-chip ${selectedCategory === cat ? "selected" : ""}`}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
                <span className="md3-label-small opacity-60">
                  {aiTools.filter(t => t.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className="md3-divider mb-8" />

          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([category, tools]) => (
              <div key={category} className="mb-10 md3-animate-shared-axis-y">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                       style={{ background: "hsl(var(--md-sys-color-primary-container))" }}>
                    <Sparkles className="w-4 h-4" style={{ color: "hsl(var(--md-sys-color-on-primary-container))" }} />
                  </div>
                  <h3 className="md3-title-large" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                    {category}
                  </h3>
                  <span className="md3-badge-count" style={{ background: "hsl(var(--md-sys-color-primary))" }}>
                    {tools.length}
                  </span>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md3-grid-stagger">
                    {tools.map((tool, index) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`md3-card p-5 group md3-animate-enter md3-stagger-${Math.min(index + 1, 4)}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                 style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}>
                              <Bot className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-secondary-container))" }} />
                            </div>
                            <h4 className="md3-title-medium" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                              {tool.name}
                            </h4>
                          </div>
                          <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                        </div>
                        <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                          {tool.description}
                        </p>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="md3-card-outlined overflow-hidden">
                    {tools.map((tool, index) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md3-list-item"
                      >
                        <div className="md3-list-item-leading">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="md3-list-item-content">
                          <div className="md3-list-item-headline">{tool.name}</div>
                          <div className="md3-list-item-supporting">{tool.description}</div>
                        </div>
                        <ExternalLink className="w-4 h-4" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="md3-card p-12 max-w-md mx-auto md3-animate-enter">
                <Bot className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
                <h3 className="md3-headline-small mb-2" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                  No tools found
                </h3>
                <p className="md3-body-large mb-6" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  Try adjusting your search or filters
                </p>
                <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                        className="md3-filled-button">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaAI;
