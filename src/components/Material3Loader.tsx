import { useEffect, useState } from "react";

interface Material3LoaderProps {
  onComplete: () => void;
  duration?: number;
}

const Material3Loader = ({ onComplete, duration = 1800 }: Material3LoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 100));
    }, duration / 60);

    const exitTimer = setTimeout(() => setIsExiting(true), duration - 400);
    const completeTimer = setTimeout(onComplete, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isExiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ background: "hsl(var(--md-sys-color-surface, 0 0% 98%))" }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Material 3 Logo */}
        <div
          className="w-24 h-24 rounded-[28px] flex items-center justify-center relative"
          style={{
            background: "hsl(var(--md-sys-color-primary, 262 80% 50%))",
            boxShadow: "0 8px 32px hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.3)",
          }}
        >
          <span className="text-5xl font-bold text-white">N</span>
          {/* Ripple effect */}
          <div
            className="absolute inset-0 rounded-[28px] animate-ping"
            style={{
              background: "hsl(var(--md-sys-color-primary, 262 80% 50%) / 0.15)",
              animationDuration: "1.5s",
            }}
          />
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1
            className="text-3xl font-semibold mb-1"
            style={{ color: "hsl(var(--md-sys-color-on-surface, 0 0% 10%))", letterSpacing: "-0.01em" }}
          >
            Nextup Resources
          </h1>
          <p
            className="text-sm"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant, 0 0% 45%))" }}
          >
            Material 3 Experience
          </p>
        </div>

        {/* Material 3 Linear Progress Indicator */}
        <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: "hsl(var(--md-sys-color-surface-variant, 0 0% 90%))" }}>
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: "hsl(var(--md-sys-color-primary, 262 80% 50%))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Material3Loader;
