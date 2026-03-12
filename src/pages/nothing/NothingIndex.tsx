import { useEffect } from "react";
import NothingHeader from "@/components/NothingHeader";
import NothingHero from "@/components/NothingHero";
import NothingFooter from "@/components/NothingFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";

const NothingIndex = () => {
  useEffect(() => {
    updatePageMeta(pageSEOConfigs.home);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Nextup Resources",
      url: "https://nextupresources.com/",
      description: "Premium courses and free learning resources for learners worldwide",
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div className="min-h-screen">
      <NothingHeader />
      <main>
        <NothingHero />
      </main>
      <NothingFooter />
      <ScrollToTop />
    </div>
  );
};

export default NothingIndex;
