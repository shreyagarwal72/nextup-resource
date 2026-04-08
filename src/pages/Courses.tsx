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
        <section className="pt-32 pb-12 dot-grid">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              {isStudyMode && (
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop font-bold text-sm">
                  <GraduationCap className="w-4 h-4" strokeWidth={2.5} />
                  <span>Study Mode Active</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 font-heading">
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
