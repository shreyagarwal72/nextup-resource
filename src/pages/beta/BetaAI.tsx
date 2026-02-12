import { aiTools } from "@/data/aiTools";
import { useState } from "react";
import { Search, ExternalLink, Bot, Sparkles } from "lucide-react";
import "@/styles/material3.css";

const BetaAI = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = aiTools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const grouped = filtered.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof aiTools>);

  return (
    <div className="min-h-screen">
      <section
        className="relative py-20 px-4"
        style={{ background: `linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)` }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 md3-chip md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
            <Bot className="w-4 h-4" />
            <span className="md3-label-large">AI Tools</span>
          </div>
          <h1 className="mb-6 md3-animate-enter md3-stagger-1"
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 700 }}>
            AI Tools Collection
          </h1>
          <p className="md3-body-large mb-8 max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            Powerful AI tools to supercharge your workflow
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-md mx-auto mb-10">
            <div className="md3-search-bar w-full">
              <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none md3-body-large"
                style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
              />
            </div>
          </div>

          {Object.keys(grouped).length > 0 ? (
            Object.entries(grouped).map(([category, tools]) => (
              <div key={category} className="mb-10">
                <h3 className="md3-title-large mb-4 flex items-center gap-2"
                    style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                  <Sparkles className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <a
                      key={tool.name}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`md3-card p-5 group md3-animate-enter md3-stagger-${Math.min(index + 1, 4)}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="md3-title-medium" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                          {tool.name}
                        </h4>
                        <ExternalLink className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
                      </div>
                      <p className="md3-body-small" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                        {tool.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bot className="w-12 h-12 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
              <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                No AI tools found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaAI;
