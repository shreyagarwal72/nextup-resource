import { useEffect, useRef, useState } from "react";
import { WifiOff, RefreshCw, Wifi } from "lucide-react";

/**
 * Full-screen offline fallback. When connectivity returns it automatically
 * reloads the page the user was on (the route is remembered while offline),
 * after a short "Back online" confirmation.
 */
const OfflineFallback = () => {
  const [offline, setOffline] = useState(() => typeof navigator !== "undefined" && !navigator.onLine);
  const [reconnected, setReconnected] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const lastPath = useRef<string>(
    typeof window !== "undefined" ? window.location.pathname + window.location.search : "/",
  );

  // Remember the route the user was on before losing connectivity.
  useEffect(() => {
    if (offline) return;
    lastPath.current = window.location.pathname + window.location.search;
  });

  const restore = () => {
    const target = lastPath.current || "/";
    const current = window.location.pathname + window.location.search;
    if (target !== current) window.location.replace(target);
    else window.location.reload();
  };

  useEffect(() => {
    const goOnline = () => {
      setOffline(false);
      setReconnected(true);
      // Give the network a beat to settle, then return to the last page.
      window.setTimeout(() => {
        if (navigator.onLine) restore();
        else setReconnected(false);
      }, 1200);
    };
    const goOffline = () => {
      lastPath.current = window.location.pathname + window.location.search;
      setReconnected(false);
      setOffline(true);
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // Some browsers keep navigator.onLine stale — poll a tiny same-origin
    // request while offline so we recover even without an `online` event.
    let poll: number | undefined;
    if (offline) {
      poll = window.setInterval(async () => {
        try {
          await fetch(`/favicon.ico?ping=${Date.now()}`, { cache: "no-store" });
          goOnline();
        } catch {
          /* still offline */
        }
      }, 5000);
    }

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      if (poll) window.clearInterval(poll);
    };
  }, [offline]);

  if (!offline && !reconnected) return null;

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      if (navigator.onLine) restore();
      else setRetrying(false);
    }, 900);
  };

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={reconnected ? "Back online" : "You are offline"}
      className="fixed inset-0 z-[200] bg-background dot-grid flex items-center justify-center p-5 animate-fade-in"
    >
      <div className="w-full max-w-md bg-card border-2 border-foreground/80 rounded-3xl shadow-pop p-7 text-center animate-pop-in">
        <div
          className={`mx-auto mb-5 w-20 h-20 rounded-full border-2 border-foreground/80 shadow-pop flex items-center justify-center animate-float ${
            reconnected ? "bg-tertiary text-tertiary-foreground" : "bg-secondary text-secondary-foreground"
          }`}
        >
          {reconnected ? (
            <Wifi className="w-9 h-9" strokeWidth={2.5} />
          ) : (
            <WifiOff className="w-9 h-9" strokeWidth={2.5} />
          )}
        </div>

        <h1 className="font-heading text-2xl font-extrabold text-foreground">
          {reconnected ? "Back online" : "You're offline"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground font-medium">
          {reconnected
            ? "Connection restored — taking you back to where you left off…"
            : "Nextup Resources can't reach the internet right now. We'll bring you straight back to this page the moment you're reconnected."}
        </p>

        {!reconnected && (
          <button
            onClick={retry}
            disabled={retrying}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-bold border-2 border-foreground/80 shadow-pop transition-transform duration-200 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 disabled:opacity-70"
          >
            <RefreshCw className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`} strokeWidth={2.5} />
            {retrying ? "Checking connection…" : "Try again"}
          </button>
        )}

        {reconnected && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground">
            <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={2.5} /> Restoring your page…
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineFallback;
