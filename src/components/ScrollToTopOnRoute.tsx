import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Auto-scrolls to the top of the page whenever the route changes.
// Respects hash links (e.g. /page#section) by leaving scroll to the browser.
const ScrollToTopOnRoute = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTopOnRoute;
