import { useEffect } from "react";
import { haptics } from "@/lib/haptics";

const TAP_SELECTOR =
  'button, a, [role="button"], [role="tab"], [role="switch"], input[type="checkbox"], input[type="radio"], summary, label';

/**
 * Fires a light haptic buzz on every tap of an interactive element, site-wide.
 * Delegated at the document level so every button/link on every page gets
 * feedback without per-component wiring.
 *
 * - Only fires for actual touchscreen taps (pointerType "touch"), never mouse.
 * - Any element (or ancestor) can opt out with a `data-no-haptic` attribute.
 * - For a stronger/distinct pattern on a specific action, call
 *   haptics.medium() / haptics.success() / haptics.error() directly from
 *   that component's handler — it'll fire in addition to this generic tap.
 */
const HapticFeedback = () => {
  useEffect(() => {
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
  }, []);

  return null;
};

export default HapticFeedback;
