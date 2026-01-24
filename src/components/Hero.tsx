import { Button } from "@/components/ui/button";
import { Sparkles, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Stats from "./Stats";
import { useState, useEffect } from "react";

const Hero = () => {
  const [showInstallHint, setShowInstallHint] = useState(false);

  useEffect(() => {
    // Check if not already in standalone mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (!isStandalone) {
      // Show install hint after 3 seconds
      const timer = setTimeout(() => setShowInstallHint(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* iOS-style animated liquid blobs - more organic with breathing effect */}
      <div 
        className="liquid-blob w-[500px] h-[500px] bg-primary/25 top-10 -left-60 animate-breathe" 
        style={{ animationDuration: "18s" }}
      />
      <div 
        className="liquid-blob w-[400px] h-[400px] bg-purple-500/20 bottom-10 -right-52" 
        style={{ animationDelay: "-4s", animationDuration: "22s" }} 
      />
      <div 
        className="liquid-blob w-[300px] h-[300px] bg-pink-400/15 top-1/2 left-1/4" 
        style={{ animationDelay: "-8s", animationDuration: "20s" }} 
      />
      <div 
        className="liquid-blob w-[250px] h-[250px] bg-cyan-400/15 top-1/4 right-1/4" 
        style={{ animationDelay: "-12s", animationDuration: "24s" }} 
      />
      
      <div className="container px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Welcome Badge with iOS pop animation */}
          <div className="glass-button liquid-border inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground mb-8 animate-ios-pop hover-spring">
            <Sparkles className="h-4 w-4 text-primary animate-ios-pulse" />
            <span>Welcome to Nextup Resources</span>
          </div>

          {/* Main Headline with staggered iOS fade */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 animate-slide-up-ios delay-100">
            Learn, Grow, and{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease-in-out_infinite]">
              Excel Together
            </span>
          </h1>

          {/* Subheadline with macOS slide */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up-ios delay-200">
            Discover premium courses and resources designed to help you master
            new skills and achieve your goals. Start your learning journey today.
          </p>

          {/* CTA Buttons with iOS spring hover */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-ios delay-300">
            <Button variant="glassPrimary" size="xl" asChild className="liquid-border hover-spring">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button variant="glass" size="xl" asChild className="liquid-border hover-spring">
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </div>

          {/* Install PWA hint with iOS notification animation */}
          {showInstallHint && (
            <div className="mt-6 animate-notification">
              <Link 
                to="/install" 
                className="glass-button inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-all duration-300 ease-apple-ease hover-spring"
              >
                <Download className="h-4 w-4" />
                <span>Install app for offline access</span>
              </Link>
            </div>
          )}

          {/* Stats with macOS window open animation */}
          <div className="mt-20 w-full animate-macos-open delay-400">
            <Stats />
          </div>
        </div>
      </div>

      {/* Gradient animation keyframes - smoother Apple timing */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
