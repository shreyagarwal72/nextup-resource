import { useDesignSystem } from "@/components/ThemeProvider";

const MinecraftBackground = () => {
  const { designSystem } = useDesignSystem();
  if (designSystem !== "minecraft") return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {/* Dirt texture base wallpaper with dark gradient overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundColor: "#2a1d12",
          backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(/minecraft/dirt.png)",
          backgroundSize: "64px 64px",
          imageRendering: "pixelated",
        }}
      />

      {/* Floating pixel clouds */}
      <div
        className="absolute top-10 left-0 right-0 h-32 opacity-25"
        style={{
          backgroundImage: "url(/minecraft/cloud.png)",
          backgroundRepeat: "repeat-x",
          backgroundSize: "160px auto",
          imageRendering: "pixelated",
        }}
      />

      {/* Retro pixel XP orb watermark in top right corner */}
      <img
        src="/minecraft/xp.png"
        alt=""
        className="absolute top-20 right-10 w-16 h-16 opacity-30 animate-mc-bob pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Diamond ore watermark in bottom left */}
      <img
        src="/minecraft/diamond.png"
        alt=""
        className="absolute bottom-16 left-10 w-16 h-16 opacity-25 animate-mc-bob pointer-events-none"
        style={{ imageRendering: "pixelated", animationDelay: "-1s" }}
      />
    </div>
  );
};

export default MinecraftBackground;
