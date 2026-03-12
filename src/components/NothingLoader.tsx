import { useEffect, useState } from "react";

interface NothingLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const NothingLoader = ({ onComplete, duration = 2000 }: NothingLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [showElements, setShowElements] = useState(false);

  const phases = ["INIT", "LOAD", "SYNC", "READY"];

  useEffect(() => {
    const showTimer = setTimeout(() => setShowElements(true), 50);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1.8;
        if (next >= 25 && phase === 0) setPhase(1);
        if (next >= 50 && phase <= 1) setPhase(2);
        if (next >= 80 && phase <= 2) setPhase(3);
        return Math.min(next, 100);
      });
    }, duration / 65);

    const exitTimer = setTimeout(() => setIsExiting(true), duration - 300);
    const completeTimer = setTimeout(onComplete, duration);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${isExiting ? "opacity-0" : "opacity-100"}`}
      style={{ background: "#050505", fontFamily: "'Space Mono', 'JetBrains Mono', monospace" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />

      {/* Scanline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 w-full h-px" style={{
          background: "linear-gradient(90deg, transparent, rgba(255,45,45,0.3), transparent)",
          animation: "nth-loader-scan 2s linear infinite",
          top: `${progress}%`,
        }} />
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo */}
        <div className={`transition-all duration-500 ${showElements ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="relative w-20 h-20 border border-dashed border-white/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white" style={{ letterSpacing: "-0.05em" }}>N</span>
            {[
              "-top-[2px] -left-[2px]",
              "-top-[2px] -right-[2px]",
              "-bottom-[2px] -left-[2px]",
              "-bottom-[2px] -right-[2px]",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-[5px] h-[5px]`} style={{ background: "#FF2D2D" }} />
            ))}
          </div>
        </div>

        {/* Brand text */}
        <div className={`text-center transition-all duration-400 ${showElements ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "150ms" }}>
          <h1 className="text-lg font-bold text-white uppercase tracking-[0.25em]">Nextup</h1>
          <p className="text-[10px] text-white/35 uppercase tracking-[0.35em] mt-1.5">Resources</p>
        </div>

        {/* Progress section */}
        <div className={`w-52 transition-all duration-400 ${showElements ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "250ms" }}>
          {/* Phase label */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{phases[phase]}</span>
            <span className="text-[10px] text-white/25 font-mono tabular-nums">{Math.round(progress)}%</span>
          </div>

          {/* Main progress bar */}
          <div className="h-[2px] bg-white/8 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 transition-all duration-100 ease-linear" style={{
              width: `${progress}%`,
              background: "#FF2D2D",
              boxShadow: "0 0 8px rgba(255,45,45,0.4), 0 0 20px rgba(255,45,45,0.15)",
            }} />
          </div>

          {/* Dot indicators */}
          <div className="flex gap-[6px] mt-3 justify-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] h-[3px] transition-all duration-100"
                style={{
                  background: progress >= (i + 1) * 8.33 ? "#FF2D2D" : "rgba(255,255,255,0.08)",
                  boxShadow: progress >= (i + 1) * 8.33 ? "0 0 4px rgba(255,45,45,0.3)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes nth-loader-scan {
          0% { top: -2%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 102%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default NothingLoader;
