import { useEffect, useState } from "react";

interface Material3LoaderProps {
  onComplete: () => void;
  duration?: number;
}

const Material3Loader = ({ onComplete, duration = 2400 }: Material3LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => setShowContent(true), 150);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 30) return prev + 3;
        if (prev < 60) return prev + 2;
        if (prev < 90) return prev + 1.5;
        return Math.min(prev + 1, 100);
      });
    }, duration / 80);

    const exitTimer = setTimeout(() => setIsExiting(true), duration - 500);
    const completeTimer = setTimeout(onComplete, duration);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 overflow-hidden ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--md-sys-color-surface, 0 0% 98%)) 0%, hsl(var(--md-sys-color-primary-container, 83 60% 88%)) 100%)",
      }}
    >
      {/* Animated wave background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none" style={{ height: "60%" }}>
          <path className="md3-wave-path-1" fill="hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.06)"
                d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,208C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path className="md3-wave-path-2" fill="hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.04)"
                d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          <path className="md3-wave-path-3" fill="hsl(var(--md-sys-color-tertiary, 330 70% 50%) / 0.03)"
                d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,197.3C672,213,768,235,864,240C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full md3-float-particle"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: `hsl(var(--md-sys-color-primary, 262 80% 50%) / ${0.08 + i * 0.02})`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo */}
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-[32px] flex items-center justify-center relative transition-all duration-700 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{
              background: "hsl(var(--md-sys-color-primary, 262 80% 50%))",
              boxShadow: "0 12px 40px hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.35)",
              transitionTimingFunction: "cubic-bezier(0.05, 0.7, 0.1, 1)",
            }}
          >
            <span className="text-6xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>N</span>
            {/* Shimmer */}
            <div className="absolute inset-0 rounded-[32px] overflow-hidden">
              <div className="md3-logo-shimmer" />
            </div>
          </div>

          {/* Ripple rings */}
          <div className="absolute inset-0 rounded-[32px] md3-ripple-ring" style={{ animationDelay: "0s" }} />
          <div className="absolute inset-0 rounded-[32px] md3-ripple-ring" style={{ animationDelay: "0.6s" }} />
          <div className="absolute inset-0 rounded-[32px] md3-ripple-ring" style={{ animationDelay: "1.2s" }} />
        </div>

        {/* Brand */}
        <div className={`text-center transition-all duration-600 delay-300 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
             style={{ transitionTimingFunction: "cubic-bezier(0.05, 0.7, 0.1, 1)" }}>
          <h1 className="text-3xl font-semibold mb-1"
              style={{ color: "hsl(var(--md-sys-color-on-surface, 0 0% 10%))", letterSpacing: "-0.01em" }}>
            Nextup Resources
          </h1>
          <p className="text-sm"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant, 0 0% 45%))" }}>
            Material 3 Expressive
          </p>
        </div>

        {/* Wavy progress */}
        <div className={`w-64 transition-all duration-500 delay-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
          <div className="relative h-1 rounded-full overflow-hidden"
               style={{ background: "hsl(var(--md-sys-color-surface-variant, 0 0% 90%))" }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full md3-wavy-progress"
              style={{
                width: `${progress}%`,
                background: "hsl(var(--md-sys-color-primary, 262 80% 50%))",
                transition: "width 150ms linear",
              }}
            />
          </div>
          <p className="text-center mt-3 text-xs"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant, 0 0% 45%))" }}>
            Loading experience...
          </p>
        </div>
      </div>

      <style>{`
        .md3-wave-path-1 { animation: md3-wave-drift 6s ease-in-out infinite; }
        .md3-wave-path-2 { animation: md3-wave-drift 8s ease-in-out infinite reverse; }
        .md3-wave-path-3 { animation: md3-wave-drift 10s ease-in-out infinite; }
        
        @keyframes md3-wave-drift {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-20px) translateY(-8px); }
          50% { transform: translateX(0) translateY(-16px); }
          75% { transform: translateX(20px) translateY(-8px); }
        }
        
        .md3-float-particle {
          animation: md3-particle-float 4s ease-in-out infinite;
        }
        @keyframes md3-particle-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 1; }
        }
        
        .md3-ripple-ring {
          border: 2px solid hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.25);
          animation: md3-loader-ripple 2s ease-out infinite;
        }
        @keyframes md3-loader-ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        
        .md3-logo-shimmer {
          position: absolute;
          top: 0; left: -100%; width: 200%; height: 100%;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          animation: md3-shimmer-slide 2s ease-in-out infinite;
        }
        @keyframes md3-shimmer-slide {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }
        
        .md3-wavy-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: md3-progress-wave 1.5s ease-in-out infinite;
        }
        @keyframes md3-progress-wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Material3Loader;
