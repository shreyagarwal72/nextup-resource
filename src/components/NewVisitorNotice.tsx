import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

const STORAGE_KEY = "whats-new-notice-seen-v1";
const AUTO_DISMISS_MS = 5000;
const OPEN_DELAY_MS = 600;

/**
 * One-time dialog for new visitors, shown only on the home page. Points
 * people at the notification bell so they notice newly-added pages.
 * Auto-dismisses after 5s; also closable early. Never shows again once
 * seen (tracked in localStorage) unless the user clears site data.
 */
const NewVisitorNotice = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const openTimer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismissTimer = setTimeout(close, AUTO_DISMISS_MS);
    return () => clearTimeout(dismissTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setClosing(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 200);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm transition-opacity duration-200 ${
        closing ? "opacity-0" : "opacity-100 animate-fade-in"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whats-new-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative w-full max-w-sm bg-card border-2 border-foreground/80 rounded-3xl shadow-pop p-6 text-center animate-pop-in">
        <button
          onClick={close}
          aria-label="Close notice"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card border-2 border-foreground/80 shadow-pop-soft flex items-center justify-center hover:-translate-y-0.5 transition-transform"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-foreground/80 shadow-pop mb-4 bg-primary text-primary-foreground">
          <Bell className="w-7 h-7" strokeWidth={2.5} />
        </div>

        <h2 id="whats-new-title" className="text-xl font-extrabold font-heading mb-2">
          New pages just dropped 🎉
        </h2>
        <p className="text-sm text-muted-foreground mb-1">
          Tap the bell icon up top anytime to see what's new — new pages and
          features land there first.
        </p>
        <p className="text-xs text-muted-foreground/70">
          Closing in a few seconds…
        </p>
      </div>
    </div>
  );
};

export default NewVisitorNotice;
