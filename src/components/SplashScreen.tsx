import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const SplashScreen = ({ onComplete, minDuration = 2000 }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, minDuration - 500);

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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.1) 50%, hsl(var(--background)) 100%)",
      }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="liquid-blob w-96 h-96 bg-primary/20 top-1/4 -left-20"
          style={{ animationDuration: "8s" }}
        />
        <div 
          className="liquid-blob w-80 h-80 bg-accent/15 bottom-1/4 -right-16"
          style={{ animationDuration: "10s", animationDelay: "-2s" }}
        />
        <div
          className="liquid-blob w-64 h-64 bg-secondary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ animationDuration: "12s", animationDelay: "-4s" }}
        />
      </div>

      {/* Glass container */}
      <div className="relative glass-heavy rounded-3xl p-12 flex flex-col items-center gap-6 animate-scale-in">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-2xl animate-float">
            <span className="text-5xl font-bold text-primary-foreground">N</span>
          </div>
          
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-ping opacity-20" />
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Nextup
            </span>
            {" "}Resources
          </h1>
          <p className="text-muted-foreground text-sm">Quality Education for Everyone</p>
        </div>

        {/* Loading indicator */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>

      {/* Shimmer overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.05) 50%, transparent 100%)",
          animation: "shimmer 2s infinite",
        }}
      />
    </div>
  );
};

export default SplashScreen;
