/**
 * Detects automated environments, headless browsers, bots, crawlers,
 * Lighthouse audits, Sitepeel screenshot runners, and explicit ?no-modal params.
 */
export const isBotOrScreenshotEnv = (): boolean => {
  if (typeof window === "undefined") return true;

  // 1. W3C WebDriver flag (Puppeteer, Playwright, Selenium, Chrome Headless)
  if (navigator.webdriver) return true;

  // 2. Automation scripts and headless browser variables
  const w = window as any;
  if (
    w.__puppeteer_evaluation_script__ ||
    w.__playwright ||
    w._phantom ||
    w.__nightmare ||
    w.callPhantom ||
    w.__selenium_evaluate ||
    w.domAutomation ||
    w.domAutomationController
  ) {
    return true;
  }

  // 3. User-Agent string detection
  const ua = (navigator.userAgent || "").toLowerCase();
  const botKeywords = [
    "bot",
    "crawl",
    "spider",
    "slurp",
    "lighthouse",
    "headlesschrome",
    "sitepeel",
    "screaming",
    "phantom",
    "screenshot",
    "googlebot",
    "bingbot",
    "yandex",
    "baiduspider",
    "bytespider",
    "vercel",
    "prerender",
    "ptst",
    "gtmetrix",
    "pingdom",
  ];
  if (botKeywords.some((k) => ua.includes(k))) return true;

  // 4. URL query params for testing or disabling modals
  try {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("no-modal") ||
      params.has("screenshot") ||
      params.has("preview") ||
      params.has("audit") ||
      params.has("bot") ||
      params.has("headless")
    ) {
      return true;
    }
  } catch {
    /* ignore */
  }

  return false;
};
