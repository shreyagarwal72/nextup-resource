import { Button } from "@/components/ui/button";
import { Sparkles, Download, ArrowRight, BookOpen, Package, Bot, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Stats from "./Stats";
import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

const Hero = () => {
  const [showInstallHint, setShowInstallHint] = useState(false);
  const typewriterText = useTypewriter(["Courses", "Resources", "Ebooks", "Apps & Websites", "AI Tools"], 120, 80, 2000);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Particle field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; z: number; vx: number; vy: number; vz: number; size: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const count = Math.min(80, Math.floor(canvas.offsetWidth / 12));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        z: Math.random() * 400 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let mouseX = canvas.offsetWidth / 2;
    let mouseY = canvas.offsetHeight / 2;

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouse);

    const focalLength = 300;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;

      // Sort by depth
      particles.sort((a, b) => b.z - a.z);

      for (const p of particles) {
        p.x += p.vx + (mouseX - cx) * 0.0002;
        p.y += p.vy + (mouseY - cy) * 0.0002;
        p.z += p.vz;

        // Wrap around
        if (p.z < 50) p.z = 500;
        if (p.z > 500) p.z = 50;
        if (p.x < -50) p.x = canvas.offsetWidth + 50;
        if (p.x > canvas.offsetWidth + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.offsetHeight + 50;
        if (p.y > canvas.offsetHeight + 50) p.y = -50;

        const scale = focalLength / (focalLength + p.z);
        const sx = cx + (p.x - cx) * scale;
        const sy = cy + (p.y - cy) * scale;
        const r = p.size * scale * 2;
        const alpha = Math.min(1, (500 - p.z) / 300) * 0.6;

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(var(--primary), ${alpha})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const scaleA = focalLength / (focalLength + a.z);
          const scaleB = focalLength / (focalLength + b.z);
          const ax = cx + (a.x - cx) * scaleA;
          const ay = cy + (a.y - cy) * scaleA;
          const bx = cx + (b.x - cx) * scaleB;
          const by = cy + (b.y - cy) * scaleB;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 100) {
            const lineAlpha = (1 - dist / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `hsla(var(--primary), ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    if (!isStandalone) {
      const timer = setTimeout(() => setShowInstallHint(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* 3D Particle canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />
      
      {/* Liquid gradient background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Animated gradient orbs */}
      <div className="liquid-blob w-[500px] h-[500px] bg-primary/20 top-10 -left-60 animate-breathe" style={{ animationDuration: "18s" }} />
      <div className="liquid-blob w-[400px] h-[400px] bg-purple-500/15 bottom-10 -right-52" style={{ animationDelay: "-4s", animationDuration: "22s" }} />
      <div className="liquid-blob w-[300px] h-[300px] bg-pink-400/10 top-1/2 left-1/4" style={{ animationDelay: "-8s", animationDuration: "20s" }} />
      
      <div className="container px-4 py-20 md:py-32 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <div className="glass-button liquid-border inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground mb-8 animate-ios-pop hover-spring">
            <Sparkles className="h-4 w-4 text-primary animate-ios-pulse" />
            <span>Welcome to Nextup Resources</span>
          </div>

          {/* Main Headline with Typewriter */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 animate-slide-up-ios delay-100">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease-in-out_infinite]">
              {typewriterText}
              <span className="animate-pulse text-primary">|</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-slide-up-ios delay-200">
            Discover premium courses, free resources, ebooks, apps, websites, and AI tools — all in one place. Start your learning journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up-ios delay-300">
            <Button variant="glassPrimary" size="xl" asChild className="liquid-border hover-spring">
              <Link to="/courses" className="flex items-center gap-2">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild className="liquid-border hover-spring">
              <Link to="/ai" className="flex items-center gap-2">
                <Bot className="w-4 h-4" /> AI Tools
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up-ios delay-400">
            {[
              { to: "/resources", icon: Package, label: "Resources" },
              { to: "/apps", icon: Globe, label: "Apps & Websites" },
              { to: "/courses", icon: BookOpen, label: "Courses" },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="glass-button px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover-spring">
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Install PWA hint */}
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

          {/* Stats */}
          <div className="mt-20 w-full animate-macos-open delay-400">
            <Stats />
          </div>

          {/* Special Thanks */}
          <div className="mt-12 glass-button rounded-2xl px-6 py-4 animate-slide-up-ios delay-500">
            <p className="text-sm text-muted-foreground">
              Special thanks to <span className="text-primary font-semibold">@techinsiderashish</span> for contributing most of the content ❤️
            </p>
          </div>
        </div>
      </div>

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
