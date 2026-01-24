import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const SplashScreen = ({ onComplete, minDuration = 2200 }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, minDuration - 600);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, minDuration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, minDuration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-600 ease-apple-ease ${
        isExiting ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* iOS-style animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="liquid-blob w-96 h-96 bg-primary/20 top-1/4 -left-20"
          style={{ animationDuration: "12s" }}
        />
        <div 
          className="liquid-blob w-80 h-80 bg-purple-500/15 bottom-1/4 -right-16"
          style={{ animationDuration: "15s", animationDelay: "-3s" }}
        />
        <div
          className="liquid-blob w-64 h-64 bg-pink-400/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animationDuration: "18s", animationDelay: "-6s" }}
        />
      </div>

      {/* macOS-style glass container with window open animation */}
      <div className="relative glass-ultra rounded-3xl p-12 flex flex-col items-center gap-6 animate-macos-open shadow-glass-xl">
        {/* Logo with iOS spring animation */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-purple-500 flex items-center justify-center shadow-2xl float">
            <span className="text-5xl font-bold text-primary-foreground">N</span>
          </div>
          
          {/* iOS-style glowing ring with pulse */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 animate-ios-pulse" style={{ animationDuration: "1.5s" }} />
          <div className="absolute -inset-2 rounded-3xl border border-primary/20 animate-ios-pulse" style={{ animationDuration: "2s", animationDelay: "0.3s" }} />
        </div>

        {/* Brand name with staggered fade */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up-ios delay-150">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease-in-out_infinite]">
              Nextup
            </span>
            {" "}Resources
          </h1>
          <p className="text-muted-foreground text-sm animate-slide-up-ios delay-250">
            Quality Education for Everyone
          </p>
        </div>

        {/* iOS-style loading dots with spring bounce */}
        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary"
              style={{ 
                animation: `ios-bounce 1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite`,
                animationDelay: `${i * 0.12}s` 
              }}
            />
          ))}
        </div>
      </div>

      {/* iOS shimmer overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-sweep 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        }}
      />

      {/* Keyframes for splash-specific animations */}
      <style>{`
        @keyframes ios-bounce {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; }
        }
        @keyframes shimmer-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
