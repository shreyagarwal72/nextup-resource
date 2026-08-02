import { useEffect } from "react";
import { haptics } from "@/lib/haptics";
import { useSettings } from "@/hooks/useSettings";

const TAP_SELECTOR =
  'button, a, [role="button"], [role="tab"], [role="switch"], input[type="checkbox"], input[type="radio"], summary, label';

/**
 * Fires a light haptic buzz on every tap of an interactive element, site-wide.
 * Delegated at the document level so every button/link on every page gets
 * feedback without per-component wiring. Can be turned off in /settings.
 */
const HapticFeedback = () => {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings.haptics) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(TAP_SELECTOR);
      if (!el || el.closest("[data-no-haptic]")) return;
      if ((el as HTMLButtonElement).disabled) return;
      haptics.light();
    };
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [settings.haptics]);

  return null;
};

export default HapticFeedback;
