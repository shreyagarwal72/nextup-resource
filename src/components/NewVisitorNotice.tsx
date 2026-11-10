import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { isBotOrScreenshotEnv } from "@/lib/botDetection";

const STORAGE_KEY = "whats-new-notice-seen-v1";
const AUTO_DISMISS_MS = 6000;
const OPEN_DELAY_MS = 2000;

/**
 * Non-intrusive floating notice for new visitors.
 * Points users to the notification bell without blocking the screen or interfering with screenshots.
 * Completely disabled in bot, crawler, and automated screenshot environments.
 */
const NewVisitorNotice = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Never show for screenshot bots, crawlers, or automated environments
    if (isBotOrScreenshotEnv()) return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    let triggered = false;
    let timer: any = null;

    const triggerNotice = () => {
      if (triggered) return;
      triggered = true;
      cleanup();
      timer = setTimeout(() => {
        try {
          if (!localStorage.getItem(STORAGE_KEY)) {
            setOpen(true);
          }
        } catch {
          /* ignore */
        }
      }, OPEN_DELAY_MS);
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerNotice);
      window.removeEventListener("pointerdown", triggerNotice);
    };

    window.addEventListener("scroll", triggerNotice, { passive: true });
    window.addEventListener("pointerdown", triggerNotice, { passive: true });

    return () => {
      cleanup();
      if (timer) clearTimeout(timer);
    };
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
    }, 250);
  };

  if (!open) return null;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-[80] max-w-xs sm:max-w-sm pointer-events-auto transition-all duration-300 ${
        closing ? "opacity-0 translate-y-3" : "opacity-100 animate-slide-up-pop"
      }`}
      role="region"
      aria-label="New catalogs announcement"
    >
      <div className="relative bg-card border-2 border-foreground/80 rounded-2xl shadow-pop p-4 text-left">
        <button
          onClick={close}
          aria-label="Close notice"
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-card border-2 border-foreground/80 shadow-pop-soft flex items-center justify-center hover:-translate-y-0.5 transition-transform"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
        </button>

        <div className="flex items-start gap-3 pr-4">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl border-2 border-foreground/80 shadow-pop-soft shrink-0 bg-primary text-primary-foreground">
            <Bell className="w-4 h-4" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold font-heading mb-0.5 text-foreground">
              New Catalogs Available
            </h3>
            <p className="text-xs text-muted-foreground leading-snug">
              Tap the bell icon in the header anytime to see new courses, tools, and updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVisitorNotice;
