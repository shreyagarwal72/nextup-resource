import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updatePageMeta, pageSEOConfigs, routeSEOMap } from "@/lib/og-image";

/**
 * Sets title/description/OG/canonical tags for every route from a single
 * place, keyed off the current path. Mount this once near the router root.
 *
 * Why this exists: previously each page had to remember to call
 * updatePageMeta itself in a useEffect. Most didn't — 21 of 28 pages never
 * set a canonical tag, so on direct load or client-side navigation they
 * either kept the previous page's canonical or fell back to "/" from
 * index.html, telling search engines the wrong page (or the homepage) was
 * canonical. A route-level manager makes it impossible to forget: add a
 * route to routeSEOMap and it's covered, no per-page code required.
 *
 * Dynamic routes (e.g. /collection/:slug) aren't in routeSEOMap on purpose —
 * they set their own canonical/title once their data has loaded, since the
 * title needs the actual collection name. If a path isn't in the map, this
 * component does nothing and leaves that page's own meta call in charge.
 */
export const SEOManager = () => {
  const location = useLocation();

  useEffect(() => {
    const configKey = routeSEOMap[location.pathname];
    if (!configKey) return; // dynamic route — handled by the page itself

    updatePageMeta(pageSEOConfigs[configKey]);
  }, [location.pathname]);

  return null;
};
