import { useMemo } from "react";

export type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

export type PaletteHsl = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  edge: string;
};

// Helper to convert HSL string (e.g., "220 90% 56%") into css hsl() format
const formatHsl = (hslStr: string) => {
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length >= 3) {
    return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
  }
  return hslStr;
};

const IntroScene = ({ accent, paletteHsl }: { accent: Accent; paletteHsl: PaletteHsl }) => {
  const colors = useMemo(() => {
    return {
      primary: formatHsl(paletteHsl.primary),
      secondary: formatHsl(paletteHsl.secondary),
      tertiary: formatHsl(paletteHsl.tertiary),
      quaternary: formatHsl(paletteHsl.quaternary),
      edge: formatHsl(paletteHsl.edge),
    };
  }, [paletteHsl]);

  const activeColor = colors[accent] || colors.primary;

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Ambient Glow */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl transition-colors duration-700 ease-out"
        style={{ backgroundColor: activeColor }}
      />

      {/* Outer Orbit Ring */}
      <div
        className="absolute w-72 h-72 rounded-full border border-dashed animate-[spin_20s_linear_infinite] opacity-40 transition-colors duration-700"
        style={{ borderColor: colors.edge }}
      />

      {/* Orbiting Elements */}
      <div className="absolute w-64 h-64 animate-[spin_12s_linear_infinite]">
        {/* Top Floating Orbit Shape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-md shadow-md transition-all duration-500"
          style={{ backgroundColor: colors.primary }}
        />
        {/* Right Floating Orbit Shape */}
        <div
          className="absolute top-1/2 -right-3 -translate-y-1/2 w-4 h-4 rounded-full shadow-md transition-all duration-500"
          style={{ backgroundColor: colors.secondary }}
        />
        {/* Bottom Floating Orbit Shape */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-sm rotate-45 shadow-md transition-all duration-500"
          style={{ backgroundColor: colors.tertiary }}
        />
        {/* Left Floating Orbit Shape */}
        <div
          className="absolute top-1/2 -left-3 -translate-y-1/2 w-4 h-4 rounded-full shadow-md transition-all duration-500"
          style={{ backgroundColor: colors.quaternary }}
        />
      </div>

      {/* Central Geometric Core */}
      <div className="relative z-10 flex items-center justify-center animate-[bounce_4s_easeInOut_infinite]">
        <svg
          className="w-32 h-32 transition-all duration-700 ease-out transform hover:scale-105"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Icosahedron Facets */}
          <polygon
            points="50,10 85,30 50,50"
            fill={activeColor}
            fillOpacity="0.85"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
          <polygon
            points="50,10 15,30 50,50"
            fill={activeColor}
            fillOpacity="0.65"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
          <polygon
            points="15,30 15,70 50,50"
            fill={activeColor}
            fillOpacity="0.75"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
          <polygon
            points="85,30 85,70 50,50"
            fill={activeColor}
            fillOpacity="0.9"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
          <polygon
            points="15,70 50,90 50,50"
            fill={activeColor}
            fillOpacity="0.5"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
          <polygon
            points="85,70 50,90 50,50"
            fill={activeColor}
            fillOpacity="0.8"
            stroke={colors.edge}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default IntroScene;
