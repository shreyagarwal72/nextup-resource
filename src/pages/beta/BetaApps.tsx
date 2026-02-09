import { allApps as apps, App, sortByPreference, groupByCategory } from "@/data/content";
import { Smartphone, ExternalLink } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const studyCategories = ["Development", "Utility", "Productivity", "Education"];

const BetaApps = () => {
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();
  
  const filteredApps = isStudyMode
    ? apps.filter(app => 
        studyCategories.some(cat => 
          app.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : apps;

  const sortedApps = sortByPreference(filteredApps, sortPreference);
  const groupedApps = groupByCategory(sortedApps);

  return (
    <div className="min-h-screen">
      <section 
        className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-primary))" }}>
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="md3-display-small mb-4 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            Free Apps
          </h1>
          
          <p className="md3-body-large max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Productivity and development apps for focused learning."
              : "Download premium apps completely free. Enhance your mobile experience with our curated collection."}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {Object.keys(groupedApps).length === 0 ? (
            <div className="text-center py-16">
              <Smartphone className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
              <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                No study-related apps found. Toggle off Study Mode to see all content.
              </p>
            </div>
          ) : (
            Object.entries(groupedApps).map(([category, categoryApps]) => (
              <div key={category} className="mb-12">
                <h2 className="md3-headline-small mb-6"
                    style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryApps.map((app, index) => (
                    <a
                      key={app.title}
                      href={app.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`md3-card overflow-hidden md3-animate-enter md3-stagger-${(index % 6) + 1}`}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={app.image}
                          alt={app.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                          style={{ transform: "scale(1)" }}
                          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        />
                      </div>
                      
                      <div className="p-5">
                        <h3 className="md3-title-medium mb-2"
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
