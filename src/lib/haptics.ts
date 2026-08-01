// Thin wrapper around the Web Vibration API (navigator.vibrate).
// Supported on Android Chrome/WebView; silently no-ops on iOS Safari and
// desktop browsers where it doesn't exist — always safe to call anywhere.
const supported = typeof navigator !== "undefined" && "vibrate" in navigator;

const vibrate = (pattern: number | number[]) => {
  if (!supported) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers throw if called outside a user gesture — ignore.
  }
};

export const haptics = {
  /** Generic tap acknowledgment — used automatically on every button/link site-wide. */
  light: () => vibrate(10),
  /** A slightly firmer tap, for toggles/switches. */
  medium: () => vibrate(20),
  /** A distinct double-pulse for positive confirmations (added, saved, sent). */
  success: () => vibrate([10, 40, 10]),
  /** A sharper triple-pulse for errors/failures. */
  error: () => vibrate([20, 30, 20, 30, 20]),
};
