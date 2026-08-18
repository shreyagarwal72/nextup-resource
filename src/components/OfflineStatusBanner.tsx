import React, { useState, useEffect } from "react";
import { WifiOff, CheckCircle2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { springPresets } from "./MotionEffects";
import { refreshContentFromBackend } from "@/lib/contentBridge";

export const OfflineStatusBanner = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const [showRestored, setShowRestored] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      setShowRestored(true);
      setIsSyncing(true);
      try {
        await refreshContentFromBackend();
      } catch (err) {
        console.error("Auto-sync failed:", err);
      } finally {
        setIsSyncing(false);
      }
      setTimeout(() => setShowRestored(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          key="offline-banner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={springPresets.bouncy}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="bg-card border-2 border-foreground/80 shadow-pop p-3.5 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary text-tertiary-foreground flex items-center justify-center font-bold border-2 border-foreground/80 shrink-0">
                <WifiOff className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground font-heading">
                  You are offline
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Showing cached data. Works offline!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showRestored && (
        <motion.div
          key="online-banner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={springPresets.bouncy}
          className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-sm pointer-events-auto"
        >
          <div className="bg-card border-2 border-foreground/80 shadow-pop p-3.5 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-quaternary text-quaternary-foreground flex items-center justify-center font-bold border-2 border-foreground/80 shrink-0">
                {isSyncing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                ) : (
                  <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-foreground font-heading">
                  Back online!
                </p>
                <p className="text-[11px] text-muted-foreground font-medium">
                  {isSyncing ? "Syncing latest data..." : "Content updated automatically."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
