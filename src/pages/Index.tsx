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
import GlobalSearch from "@/components/GlobalSearch";
import { updatePageMeta, pageSEOConfigs } from "@/lib/og-image";
import { ShieldCheck, Wifi, Zap, Lock } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Curated, not scraped",
    body: "Every course, app and resource is hand-checked before it lands here.",
    accent: "bg-primary text-primary-foreground",
  },
  {
    icon: Zap,
    title: "Instant access",
    body: "No sign-up, no paywall, no loading screens — content renders immediately.",
    accent: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Wifi,
    title: "Works offline",
    body: "Install as an app and keep browsing your library without a connection.",
    accent: "bg-tertiary text-tertiary-foreground",
  },
  {
    icon: Lock,
    title: "Private by design",
    body: "Favorites and settings stay in your browser. No trackers, no accounts.",
    accent: "bg-quaternary text-quaternary-foreground",
  },
];

const Index = () => {
  useEffect(() => {
    updatePageMeta(pageSEOConfigs.home);

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
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />
      <main>
        <Hero />
        <GlobalSearch />

        <section className="pt-4 pb-12" aria-label="Library at a glance">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Stats />
          </div>
        </section>

        <Marquee />
        <QuickAccess />

        <section className="py-14" aria-labelledby="why-nextup">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="why-nextup" className="sr-only">
              Why Nextup Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    style={{ animationDelay: `${i * 70}ms` }}
                    className="animate-pop-in opacity-0 rounded-3xl border-2 border-foreground/80 bg-card p-5 shadow-pop-soft transition-all duration-300 ease-bounce hover:-translate-y-1 hover:shadow-pop"
                  >
                    <span
                      className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground/80 ${p.accent}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                    <h3 className="font-heading text-lg font-extrabold leading-tight">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                );
              })}
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
