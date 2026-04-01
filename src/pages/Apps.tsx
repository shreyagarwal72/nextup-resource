import Header from "@/components/Header";
import AppsSection from "@/components/AppsSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useState } from "react";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";
import { useStudyMode } from "@/hooks/useStudyMode";
import { GraduationCap, Globe, Smartphone } from "lucide-react";
import { allWebsites } from "@/data/content";

const Apps = () => {
  const { isStudyMode } = useStudyMode();
  const [activeTab, setActiveTab] = useState<"apps" | "websites">("apps");
  
  useEffect(() => {
    updatePageMeta(pageSEOConfigs.apps);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              {isStudyMode && (
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary animate-ios-pop">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm font-medium">Study Mode Active</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {isStudyMode ? "Productivity Apps" : "Apps & Websites"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {isStudyMode 
                  ? "Productivity and utility apps for focused work sessions"
                  : "Download premium apps and explore curated learning websites."}
              </p>
              
              {/* Tab Switcher */}
              <div className="inline-flex gap-2 glass-heavy rounded-full p-1.5 liquid-border">
                <button
                  onClick={() => setActiveTab("apps")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "apps" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Apps
                </button>
                <button
                  onClick={() => setActiveTab("websites")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === "websites" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  Websites
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {activeTab === "apps" ? (
          <AppsSection />
        ) : (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {allWebsites.map((site, index) => (
                  <a
                    key={site.title}
                    href={site.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-heavy rounded-2xl overflow-hidden group hover-spring liquid-border animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img src={site.image} alt={site.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="glass-button px-3 py-1 rounded-full text-xs font-medium text-foreground">{site.category}</span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-2xl">{site.emoji}</div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{site.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{site.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Apps;
