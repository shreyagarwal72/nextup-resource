import { useDesignSystem } from "@/components/ThemeProvider";

const SquidBackground = () => {
  const { designSystem } = useDesignSystem();
  if (designSystem !== "squid-game") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {/* CRT Scanline & Subtle Vignette */}
      <div className="absolute inset-0 squid-scanline opacity-75" />
      
      {/* Radial Dystopian Spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(338 100% 50% / 0.15), transparent 70%), radial-gradient(ellipse 60% 40% at 85% 90%, hsl(174 95% 36% / 0.12), transparent 60%)"
        }}
      />

      {/* Floating Wireframe Shapes: ○ △ □ */}
      <svg
        className="absolute top-12 left-6 w-32 h-32 text-primary/10 animate-pulse duration-1000"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="50" cy="50" r="40" />
      </svg>

      <svg
        className="absolute top-1/3 right-8 w-44 h-44 text-secondary/15 animate-pulse"
        style={{ animationDuration: "4s" }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polygon points="50,15 90,85 10,85" />
      </svg>

      <svg
        className="absolute bottom-20 left-12 w-36 h-36 text-primary/15 animate-pulse"
        style={{ animationDuration: "5s" }}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <rect x="20" y="20" width="60" height="60" rx="4" />
      </svg>

      {/* Dalgona Honey / Golden Shimmer Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 via-secondary/5 to-tertiary/5 blur-3xl" />
    </div>
  );
};

export default SquidBackground;
