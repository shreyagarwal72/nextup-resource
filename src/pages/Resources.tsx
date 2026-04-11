import Header from "@/components/Header";
import ResourcesSection from "@/components/ResourcesSection";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
import { useEffect } from "react";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";
import { useStudyMode } from "@/hooks/useStudyMode";
import { GraduationCap } from "lucide-react";

const Resources = () => {
  const { isStudyMode } = useStudyMode();

  useEffect(() => {
    updatePageMeta(pageSEOConfigs.resources);
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <section className="pt-32 pb-12 dot-grid">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              {isStudyMode && (
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop font-bold text-sm">
                  <GraduationCap className="w-4 h-4" strokeWidth={2.5} />
                  <span>Study Mode Active</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-1 font-heading">
                {isStudyMode ? "Study Resources" : "Free Resources"}
              </h1>
              <SquigglyUnderline color="hsl(var(--secondary))" width={240} />
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
                {isStudyMode
                  ? "Educational resources and learning materials for focused study"
                  : "Download premium resources completely free. Enhance your creative projects with our curated collection."}
              </p>
            </div>
          </div>
        </section>
        <ResourcesSection />
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default Resources;
