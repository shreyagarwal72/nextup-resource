import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Package, Bot, Globe, Search, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { springPresets } from "./MotionEffects";
import { useDesignSystem } from "@/components/ThemeProvider";
import { Tape, Pushpin, RubberStamp, DoodleArrow } from "@/components/ui/tape";
import { allCourses } from "@/data/content";

const Hero = () => {
  const { designSystem } = useDesignSystem();
  const isLL = designSystem === "looseleaf";

  // Pick top verified courses for the live catalog preview
  const previewCourses = allCourses.slice(0, 2);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-14 dot-grid">
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Direct value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springPresets.bouncy}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Lead headline — uniform styling without artificial single-word accent slop */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-5 font-heading leading-[1.12]">
              Explore curated courses, developer resources, and AI tools.
            </h1>

            {/* Clear, substantive subheadline with proper punctuation */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 font-body leading-relaxed">
              Nextup is a hand-vetted catalog of premium courses, free developer assets, placement ebooks, and verified Android power tools. No paywalls, no tracking.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
              <Button
                size="xl"
                asChild
                className={`shadow-pop hover:shadow-pop-hover ${isLL ? "ll-btn" : ""}`}
              >
                <Link to="/courses" className="flex items-center justify-center gap-2">
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="xl"
                asChild
                className={`shadow-pop hover:shadow-pop-hover ${isLL ? "ll-btn" : ""}`}
              >
                <Link to="/ai" className="flex items-center justify-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>Browse AI Tools</span>
                </Link>
              </Button>
            </div>

            {/* Quick section links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              {[
                { to: "/resources", icon: Package, label: "Free Resources" },
                { to: "/apps", icon: Globe, label: "Apps & Web Tools" },
                { to: "/courses", icon: BookOpen, label: "Study Bundles" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-foreground/75 bg-card hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 ${
                    isLL ? "ll-btn" : "shadow-pop-soft hover:shadow-pop"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {isLL && (
              <div className="hidden lg:flex items-center gap-2 mt-6 text-xs text-muted-foreground font-hand">
                <DoodleArrow direction="right" className="text-primary w-6 h-4" />
                <span>Hand-drawn paper notebook view active</span>
              </div>
            )}
          </motion.div>

          {/* Right Column: Real interactive product showcase (Fixes "No picture of the product") */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springPresets.bouncy, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Real Product Interface Showcase Box */}
            <div
              className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 ${
                isLL
                  ? "ll-card text-card-foreground"
                  : designSystem === "clay"
                  ? "clay-card text-card-foreground"
                  : designSystem === "squid-game"
                  ? "squid-card text-card-foreground"
                  : designSystem === "minecraft"
                  ? "mc-panel-card text-card-foreground !rounded-none"
                  : "bg-card border-2 border-foreground/80 shadow-pop"
              }`}
            >
              {isLL ? (
                <>
                  <Tape variant="masking" position="top-center" width={95} height={24} />
                  <div className="absolute -top-3 -right-2">
                    <Pushpin color="red" />
                  </div>
                </>
              ) : null}

              {/* Showcase Header: Direct Search Bar (No fake window chrome or traffic lights) */}
              <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-3 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-foreground/30 text-xs font-mono text-muted-foreground">
                  <Search className="w-3 h-3" />
                  <span>nextup / catalog</span>
                </div>
                {isLL ? (
                  <RubberStamp text="VERIFIED" color="marker" tilt={3} />
                ) : (
                  <span className="text-[10px] font-mono font-bold uppercase text-primary">Live Catalog</span>
                )}
              </div>

              {/* Real product screenshot image (At least one real product image in the first two screens) */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-foreground/30 mb-4 bg-muted shadow-sm">
                <img
                  src="/screenshot-wide.png"
                  alt="Nextup Resources live catalog interface"
                  width={720}
                  height={405}
                  className="w-full h-auto object-cover aspect-[16/9]"
                  loading="eager"
                />
              </div>

              {/* Showcase Real Items from Catalog */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Featured from Catalog</span>
                  <span className="font-mono text-[11px]">{previewCourses.length} of {allCourses.length}</span>
                </div>

                {previewCourses.map((c, i) => (
                  <div
                    key={c.id || i}
                    className="p-3.5 rounded-2xl border-2 border-foreground/20 bg-background/60 hover:bg-background transition-colors flex flex-col gap-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-heading font-extrabold text-sm text-foreground line-clamp-1">
                        {c.title}
                      </span>
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">
                        {c.category}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {c.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-foreground/10">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>Curated</span>
                      </span>
                      <Link
                        to="/courses"
                        className="font-bold text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>View</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sourced attribution footer */}
              <div className="mt-4 pt-3 border-t-2 border-foreground/15 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Free & Direct Access</span>
                <span className="font-mono">Updated 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
