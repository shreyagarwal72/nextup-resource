import Header from "@/components/Header";
import CoursesSection from "@/components/CoursesSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";

const Courses = () => {
  useEffect(() => {
    document.title = "All Courses - Nextup Resources";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Browse all available courses including AI, data science, web development, and more. Quality education for everyone at Nextup Resources."
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                All Courses
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our complete collection of premium courses across various categories
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
