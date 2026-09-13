import { useDesignSystem } from "@/components/ThemeProvider";

const ClayBackground = () => {
  const { designSystem } = useDesignSystem();
  if (designSystem !== "clay") return null;

  return (
    <div className="clay-ambient" aria-hidden="true">
      <span className="clay-blob clay-blob-primary" />
      <span className="clay-blob clay-blob-secondary" />
      <span className="clay-blob clay-blob-tertiary" />
      <span className="clay-blob clay-blob-success" />
    </div>
  );
};

export default ClayBackground;