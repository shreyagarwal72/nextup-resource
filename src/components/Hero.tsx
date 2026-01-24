import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Stats from "./Stats";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Animated liquid blobs */}
      <div className="liquid-blob w-96 h-96 bg-primary/30 top-20 -left-48" />
      <div className="liquid-blob w-80 h-80 bg-purple-400/30 bottom-20 -right-40" style={{ animationDelay: "-3s" }} />
      <div className="liquid-blob w-64 h-64 bg-pink-400/20 top-1/2 left-1/3" style={{ animationDelay: "-5s" }} />
      
      <div className="container px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <div className="glass-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Welcome to Nextup Resources</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn, Grow, and{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Excel Together
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover premium courses and resources designed to help you master
            new skills and achieve your goals. Start your learning journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="glassPrimary" size="xl" asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 w-full animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Stats />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
