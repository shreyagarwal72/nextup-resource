import Header from "@/components/Header";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";
import { useStudyMode } from "@/hooks/useStudyMode";
import { GraduationCap } from "lucide-react";

const Courses = () => {
  const { isStudyMode } = useStudyMode();
  
  useEffect(() => {
    updatePageMeta(pageSEOConfigs.courses);
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
                {isStudyMode ? "Study Courses" : "All Courses"}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {isStudyMode 
                  ? "Focused educational courses for productive learning sessions"
                  : "Discover our complete collection of premium courses across various categories"}
              </p>
            </div>
          </div>
        </section>
        <CoursesSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Courses;
