import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

/** Applies global preference side-effects (motion) to the document root. */
const SettingsEffects = () => {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduce-motion", !settings.animations);
    return () => root.classList.remove("reduce-motion");
  }, [settings.animations]);

  return null;
};

export default SettingsEffects;
