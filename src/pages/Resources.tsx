import Header from "@/components/Header";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";

const Resources = () => {
  useEffect(() => {
    updatePageMeta(pageSEOConfigs.resources);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Free Resources
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Download premium resources completely free. Enhance your creative projects with our curated collection.
              </p>
            </div>
          </div>
        </section>
        <ResourcesSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Resources;
