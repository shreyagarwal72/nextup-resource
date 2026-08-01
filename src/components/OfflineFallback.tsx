import { useEffect, useState } from "react";
import { WifiOff, RefreshCw, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Full-screen offline fallback. Shows whenever the browser reports no
 * connectivity, and disappears the moment the connection returns.
 */
const OfflineFallback = () => {
  const [offline, setOffline] = useState(() => typeof navigator !== "undefined" && !navigator.onLine);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!offline) return null;

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      if (navigator.onLine) window.location.reload();
      else setRetrying(false);
    }, 900);
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="You are offline"
      className="fixed inset-0 z-[200] bg-background dot-grid flex items-center justify-center p-5 animate-fade-in"
    >
      <div className="w-full max-w-md bg-card border-2 border-foreground/80 rounded-3xl shadow-pop p-7 text-center animate-pop-in">
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-secondary border-2 border-foreground/80 shadow-pop flex items-center justify-center animate-float">
          <WifiOff className="w-9 h-9 text-secondary-foreground" strokeWidth={2.5} />
        </div>

        <h1 className="font-heading text-2xl font-extrabold text-foreground">You're offline</h1>
        <p className="mt-2 text-sm text-muted-foreground font-medium">
          Nextup Resources can't reach the internet right now. Pages you've already visited stay
          available — everything else will load once you're back online.
        </p>

        <button
          onClick={retry}
          disabled={retrying}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop transition-transform duration-200 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 disabled:opacity-70"
        >
          <RefreshCw className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`} strokeWidth={2.5} />
          {retrying ? "Checking connection…" : "Try again"}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            to="/favorites"
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-card border-2 border-foreground/80 text-sm font-bold shadow-pop-soft transition-transform duration-200 ease-bounce hover:-translate-y-0.5"
          >
            <Heart className="w-4 h-4" strokeWidth={2.5} /> Favorites
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-card border-2 border-foreground/80 text-sm font-bold shadow-pop-soft transition-transform duration-200 ease-bounce hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" strokeWidth={2.5} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfflineFallback;
