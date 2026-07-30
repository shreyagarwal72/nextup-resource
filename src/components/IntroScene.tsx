import { useMemo } from "react";

export type Accent = "primary" | "secondary" | "tertiary" | "quaternary";

export type PaletteHsl = {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  edge: string;
};

const formatHsl = (hslStr: string) => {
  if (!hslStr) return "hsl(220, 90%, 56%)";
  const parts = hslStr.trim().split(/\s+/);
  if (parts.length >= 3) {
    return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
  }
  return hslStr;
};

const IntroScene = ({ accent = "primary", paletteHsl }: { accent?: Accent; paletteHsl?: PaletteHsl }) => {
  const colors = useMemo(() => {
    if (!paletteHsl) {
      return {
        primary: "hsl(220, 90%, 56%)",
        secondary: "hsl(160, 80%, 45%)",
        tertiary: "hsl(280, 85%, 60%)",
        quaternary: "hsl(350, 80%, 60%)",
        edge: "rgba(255, 255, 255, 0.3)",
      };
    }
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
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* Background Ambient Glow */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          backgroundColor: activeColor,
          opacity: 0.25,
          filter: "blur(40px)",
          transition: "background-color 0.5s ease",
        }}
      />

      {/* Outer Orbit Ring */}
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: `2px dashed ${colors.edge}`,
          opacity: 0.5,
        }}
      />

      {/* Central Geometric Icon */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="50,10 85,30 50,50" fill={activeColor} fillOpacity="0.85" stroke={colors.edge} strokeWidth="1.5" />
          <polygon points="50,10 15,30 50,50" fill={activeColor} fillOpacity="0.65" stroke={colors.edge} strokeWidth="1.5" />
          <polygon points="15,30 15,70 50,50" fill={activeColor} fillOpacity="0.75" stroke={colors.edge} strokeWidth="1.5" />
          <polygon points="85,30 85,70 50,50" fill={activeColor} fillOpacity="0.9" stroke={colors.edge} strokeWidth="1.5" />
          <polygon points="15,70 50,90 50,50" fill={activeColor} fillOpacity="0.5" stroke={colors.edge} strokeWidth="1.5" />
          <polygon points="85,70 50,90 50,50" fill={activeColor} fillOpacity="0.8" stroke={colors.edge} strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export default IntroScene;
