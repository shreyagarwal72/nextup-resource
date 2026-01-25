import Header from "@/components/Header";
import EbooksSection from "@/components/EbooksSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";

const Ebooks = () => {
  useEffect(() => {
    document.title = "Free Ebooks - Nextup Resources";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Download free ebooks covering video editing, business strategies, and more. Quality educational content for creators at Nextup Resources."
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
                Free Ebooks
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Download premium ebooks completely free. Enhance your knowledge with our curated collection of guides and tutorials.
              </p>
            </div>
          </div>
        </section>
        <EbooksSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Ebooks;
