import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { useBetaUI } from "@/hooks/useBetaUI";

const NothingFooter = () => {
  const { isBetaEnabled, toggleBetaUI } = useBetaUI();
  const [tapCount, setTapCount] = useState(0);

  const handleSecretTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      toggleBetaUI();
      setTapCount(0);
    }
    setTimeout(() => setTapCount(0), 2000);
  };

  return (
    <footer className="relative py-16" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashed divider */}
        <div className="nth-divider mb-12" />

        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="relative flex h-10 w-10 items-center justify-center border border-dashed border-border group-hover:border-primary transition-colors">
              <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">N</span>
              <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-primary" />
              <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-primary" />
              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-primary" />
              <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-primary" />
            </div>
            <span className="text-sm font-bold text-foreground uppercase tracking-[0.15em]">
              Nextup Resources
            </span>
          </Link>

          <p className="text-xs text-muted-foreground mb-6 max-w-sm" style={{ letterSpacing: "0.05em" }}>
            Empowering learners worldwide with premium courses and free resources.
          </p>

          {/* Social */}
          <div className="flex gap-3 mb-8">
            <a
              href="https://www.instagram.com/nextup.resources/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@NextupResources"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-all duration-200"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>

          {/* Bottom line */}
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
            <span className="cursor-default select-none" onClick={handleSecretTap}>
              © {new Date().getFullYear()} Nextup Resources
            </span>
            <span className="nth-dot-sep" />
            <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            {isBetaEnabled && (
              <>
                <span className="nth-dot-sep" />
                <span className="text-primary">M3</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NothingFooter;
