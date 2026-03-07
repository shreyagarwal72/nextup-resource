import { useEffect, useState } from "react";

interface Material3LoaderProps {
  onComplete: () => void;
  duration?: number;
}

const Material3Loader = ({ onComplete, duration = 2200 }: Material3LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Staggered content reveal
    const contentTimer = setTimeout(() => setShowContent(true), 200);
    
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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{ 
        background: "linear-gradient(135deg, hsl(var(--md-sys-color-surface, 0 0% 98%)) 0%, hsl(var(--md-sys-color-primary-container, 83 60% 88%)) 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo with ripple */}
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-[32px] flex items-center justify-center relative transition-all duration-700 ${
              showContent ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{
              background: "hsl(var(--md-sys-color-primary, 262 80% 50%))",
              boxShadow: "0 12px 40px hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.35)",
              transitionTimingFunction: "var(--md-sys-motion-easing-emphasized-decelerate, cubic-bezier(0.05, 0.7, 0.1, 1))",
            }}
          >
            <span className="text-6xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>N</span>
          </div>
          
          {/* Ripple rings */}
          <div className="absolute inset-0 rounded-[32px]"
               style={{ border: "2px solid hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.3)", animation: "md3-loader-ripple 2s ease-out infinite" }} />
          <div className="absolute inset-0 rounded-[32px]"
               style={{ border: "2px solid hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.15)", animation: "md3-loader-ripple 2s ease-out 0.6s infinite" }} />
          <div className="absolute inset-0 rounded-[32px]"
               style={{ border: "1px solid hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.08)", animation: "md3-loader-ripple 2s ease-out 1.2s infinite" }} />
        </div>

        {/* Brand */}
        <div className={`text-center transition-all duration-600 delay-300 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
             style={{ transitionTimingFunction: "var(--md-sys-motion-easing-emphasized-decelerate)" }}>
          <h1 className="text-3xl font-semibold mb-1"
              style={{ color: "hsl(var(--md-sys-color-on-surface, 0 0% 10%))", letterSpacing: "-0.01em" }}>
            Nextup Resources
          </h1>
          <p className="text-sm"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant, 0 0% 45%))" }}>
            Material 3 Expressive
          </p>
        </div>

        {/* Progress */}
        <div className={`w-56 transition-all duration-500 delay-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}>
          <div className="md3-linear-progress" style={{ height: "4px" }}>
            <div className="md3-linear-progress-indicator"
                 style={{ width: `${progress}%`, transition: "width 150ms linear" }} />
          </div>
          <p className="text-center mt-3 md3-label-small"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant, 0 0% 45%))" }}>
            Loading experience...
          </p>
        </div>
      </div>

      <style>{`
        @keyframes md3-loader-ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Material3Loader;
