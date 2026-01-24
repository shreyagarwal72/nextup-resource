import { getPlatformFromLink } from "@/hooks/useFavorites";

interface PlatformBadgeProps {
  link: string;
  className?: string;
}

const PlatformBadge = ({ link, className = "" }: PlatformBadgeProps) => {
  const platform = getPlatformFromLink(link);

  if (platform === "other") return null;

  return (
    <div
      className={`absolute bottom-3 right-3 w-10 h-10 rounded-xl glass-heavy flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300 ${className}`}
    >
      {platform === "telegram" && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-foreground"
          fill="currentColor"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )}
      {platform === "drive" && (
        <svg
          viewBox="0 0 87.3 78"
          className="w-5 h-5 text-foreground"
          fill="currentColor"
        >
          <path d="M6.6 66.85L0 53.9 28.1 0h16.6L6.6 66.85z" />
          <path d="M21.8 78l8.3-14.4h57.2l-8.3 14.4H21.8z" />
          <path d="M57.6 0l29.7 51.5-8.3 14.4L49.2 14.5H57.6L57.6 0zM28.1 0h21.5L79 51.5H57.5L28.1 0z" />
        </svg>
      )}
      {platform === "mega" && (
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-foreground"
          fill="currentColor"
        >
          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.82 16.32h-2.04V9.96l-2.88 4.2h-.96l-2.88-4.2v6.36H7.02V7.68h2.16l2.82 4.2 2.82-4.2h2.16v8.64z" />
        </svg>
      )}
    </div>
  );
};

export default PlatformBadge;
