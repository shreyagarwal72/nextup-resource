import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import QuickAccess from "@/components/QuickAccess";
import FeaturedCollections from "@/components/FeaturedCollections";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import NewVisitorNotice from "@/components/NewVisitorNotice";
import { ShieldCheck, Wifi, Zap, Lock, CheckCircle2 } from "lucide-react";
import { useDesignSystem } from "@/components/ThemeProvider";
import { Tape, RubberStamp } from "@/components/ui/tape";

const Index = () => {
  const { designSystem } = useDesignSystem();
  const isLL = designSystem === "looseleaf";

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Nextup Resources",
      url: "https://nextup-resource.vercel.app/",
      description: "Premium courses and free learning resources for learners worldwide",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://nextup-resource.vercel.app/courses?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="clay-home-page min-h-screen pb-20 md:pb-0">
      <Header />
      <NewVisitorNotice />
      <main>
        <Hero />

        <section className="pt-2 pb-10" aria-label="Library at a glance">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Stats />
          </div>
        </section>

        <Marquee />
        <QuickAccess />

        {/* Core Principles: Structured comparison & real functionality (Fixes repetitive card grid & tinted tiles) */}
        <section className="py-12" aria-labelledby="why-nextup">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div
              className={`relative p-6 sm:p-8 md:p-10 ${
                isLL
                  ? "ll-card text-card-foreground"
                  : designSystem === "clay"
                  ? "clay-card text-card-foreground"
                  : designSystem === "squid-game"
                  ? "squid-card text-card-foreground"
                  : designSystem === "minecraft"
                  ? "mc-panel-card text-card-foreground !rounded-none"
                  : "bg-card border-2 border-foreground/80 rounded-3xl shadow-pop"
              }`}
            >
              {isLL && (
                <>
                  <Tape variant="washi-mint" position="top-center" width={110} height={24} />
                  <div className="absolute top-5 right-6 hidden sm:block">
                    <RubberStamp text="OPEN ACCESS" color="green" tilt={-2} />
                  </div>
                </>
              )}

              <div className="max-w-2xl mb-8">
                <h2 id="why-nextup" className="text-2xl sm:text-3xl font-extrabold font-heading mb-2">
                  Built for direct, private learning
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Nextup was created to eliminate paywalls, ad clutter, and broken links from technical education.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Panel 1: Editorial Curation */}
                <div className="flex flex-col gap-3 p-5 rounded-2xl border-2 border-foreground/20 bg-background/50">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="font-heading text-base sm:text-lg font-bold">
                      Curated, not automated
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every course bundle, Android tool, and repository is tested before addition. We verify direct download links, eliminate dead mirrors, and categorize content for easy navigation.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-foreground font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Manually tested mirrors and verified checksums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Organized by topic, skill level, and career paths</span>
                    </li>
                  </ul>
                </div>

                {/* Panel 2: Offline & Zero Tracking */}
                <div className="flex flex-col gap-3 p-5 rounded-2xl border-2 border-foreground/20 bg-background/50">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-5 h-5 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="font-heading text-base sm:text-lg font-bold">
                      Instant & 100% private
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No sign-up forms, no cookies, no tracking pixels. Favorites and user preferences live locally in your browser storage. Install as a PWA to keep reading offline.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-foreground font-medium">
                    <li className="flex items-center gap-2">
                      <Wifi className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Progressive Web App support for offline browsing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Instant client-side rendering with zero telemetry</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedCollections />
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default Index;
