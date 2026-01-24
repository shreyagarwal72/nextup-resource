import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Stats from "./Stats";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-corner pt-16">
      <div className="container px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground mb-8 shadow-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Welcome to Nextup Resources</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn, Grow, and{" "}
            <span className="text-primary">Excel Together</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover premium courses and resources designed to help you master
            new skills and achieve your goals. Start your learning journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
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
