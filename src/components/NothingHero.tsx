import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Terminal, Cpu, Zap, Wifi, ChevronDown } from "lucide-react";

const NothingHero = () => {
  const [showElements, setShowElements] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Animated counter
  const useCounter = (target: number, duration: number, delay: number) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!showElements) return;
      const timeout = setTimeout(() => {
        let start = 0;
        const step = target / (duration / 16);
        const interval = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(interval);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timeout);
    }, [showElements]);
    return count;
  };

  const coursesCount = useCounter(50, 1200, 600);
  const learnersCount = useCounter(10, 1000, 800);
  const satisfactionCount = useCounter(95, 1400, 1000);

  useEffect(() => {
    const timer = setTimeout(() => setShowElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse for subtle parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 px-4"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      {/* Animated dot grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        transition: "transform 0.3s ease-out"
      }} />

      {/* Geometric lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)",
            animation: "nth-scanline 4s linear infinite",
            top: "0%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* System status badge */}
        <div
          className={`nth-badge accent mb-8 transition-all duration-500 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="w-1.5 h-1.5 bg-current animate-pulse" style={{ animationDuration: "1.2s" }} />
          <span>System Active</span>
          <span className="nth-dot-sep" />
          <span>v2.4</span>
        </div>

        {/* Main headline */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            transitionDelay: "150ms",
            transform: showElements ? `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` : undefined,
            letterSpacing: "0.04em",
          }}
        >
          <span className="text-foreground">NEXTUP</span>
          <br />
          <span className="nth-glow-text" style={{
            textShadow: "0 0 20px hsl(var(--primary) / 0.3), 0 0 60px hsl(var(--primary) / 0.1)"
          }}>
            RESOURCES
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-sm md:text-base text-muted-foreground max-w-lg mb-10 leading-relaxed transition-all duration-500 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "300ms", letterSpacing: "0.05em" }}
        >
          Premium courses and resources designed for the next generation of learners. Start building skills that matter.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 mb-16 transition-all duration-500 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "450ms" }}
        >
          <Link to="/courses" className="nth-btn primary group">
            <span>Explore Courses</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <Link to="/resources" className="nth-btn">
            <span>Browse Resources</span>
          </Link>
        </div>

        {/* Stats grid */}
        <div
          className={`w-full max-w-2xl transition-all duration-500 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="grid grid-cols-3 border border-dashed border-border">
            {[
              { value: `${coursesCount}+`, label: "Courses", icon: Terminal },
              { value: `${learnersCount}K+`, label: "Learners", icon: Cpu },
              { value: `${satisfactionCount}%`, label: "Satisfaction", icon: Zap },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 flex flex-col items-center gap-2 ${i < 2 ? "border-r border-dashed border-border" : ""}`}
              >
                <stat.icon className="w-4 h-4 text-primary mb-1" />
                <span className="nth-counter text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature tags */}
        <div
          className={`flex flex-wrap justify-center gap-2 mt-10 transition-all duration-500 ${showElements ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: "750ms" }}
        >
          {[
            { icon: Terminal, label: "AI Tools" },
            { icon: Wifi, label: "Offline Ready" },
            { icon: Cpu, label: "Free Resources" },
          ].map((tag, i) => (
            <div key={i} className="nth-badge">
              <tag.icon className="w-3 h-3" />
              <span>{tag.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 transition-all duration-500 ${showElements ? "opacity-60" : "opacity-0"}`}
        style={{ transitionDelay: "900ms", animation: "nth-float 2s ease-in-out infinite" }}
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>

      <style>{`
        @keyframes nth-scanline {
          0% { top: -1%; }
          100% { top: 101%; }
        }
        @keyframes nth-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
};

export default NothingHero;
