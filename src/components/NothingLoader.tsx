import { useEffect, useState } from "react";

interface NothingLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const NothingLoader = ({ onComplete, duration = 2000 }: NothingLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glyphIndex, setGlyphIndex] = useState(0);
  const [showElements, setShowElements] = useState(false);

  const glyphs = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  useEffect(() => {
    const showTimer = setTimeout(() => setShowElements(true), 100);

    const glyphInterval = setInterval(() => {
      setGlyphIndex(prev => (prev + 1) % glyphs.length);
    }, 80);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 100));
    }, duration / 60);

    const exitTimer = setTimeout(() => setIsExiting(true), duration - 400);
    const completeTimer = setTimeout(onComplete, duration);

    return () => {
      clearTimeout(showTimer);
      clearInterval(glyphInterval);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-400 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "#080808",
        fontFamily: "'Space Mono', 'JetBrains Mono', monospace",
      }}
    >
      {/* Dot grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="flex flex-col items-center gap-10 relative z-10">
        {/* Logo */}
        <div
          className={`transition-all duration-700 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div
            className="w-24 h-24 border-2 border-dashed border-white/30 flex items-center justify-center relative"
            style={{ transition: "border-color 0.3s" }}
          >
            <span className="text-5xl font-bold text-white" style={{ letterSpacing: "-0.05em" }}>N</span>
            {/* Corner dots */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-500" />
          </div>
        </div>

        {/* Brand */}
        <div
          className={`text-center transition-all duration-500 delay-200 ${showElements ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="text-xl font-bold text-white uppercase tracking-[0.2em]">
            Nextup
          </h1>
          <p className="text-xs text-white/40 uppercase tracking-[0.3em] mt-2">
            Resources
          </p>
        </div>

        {/* Loading bar - Nothing style */}
        <div
          className={`w-48 transition-all duration-500 delay-300 ${showElements ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-red-500 text-sm font-mono">{glyphs[glyphIndex]}</span>
            <span className="text-white/50 text-xs uppercase tracking-widest">Loading</span>
            <span className="text-white/30 text-xs ml-auto font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="h-px bg-white/10 relative">
            <div
              className="absolute inset-y-0 left-0 bg-red-500"
              style={{ width: `${progress}%`, transition: "width 100ms linear" }}
            />
          </div>
          {/* Dot progress below */}
          <div className="flex gap-1 mt-3 justify-center">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 transition-colors duration-150"
                style={{
                  background: progress >= (i + 1) * 10 ? "#ff0000" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NothingLoader;
