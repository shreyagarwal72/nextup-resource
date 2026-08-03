import { useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";

/** Applies global preference side-effects (motion) to the document root. */
const SettingsEffects = () => {
  const { settings } = useSettings();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduce-motion", !settings.animations);
  }, [settings.animations]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.navLabels = String(settings.navLabels);
    root.dataset.haptics = String(settings.haptics);
  }, [settings.navLabels, settings.haptics]);

  return null;
};

export default SettingsEffects;
