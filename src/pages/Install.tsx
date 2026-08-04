import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Smartphone,
  Monitor,
  CheckCircle,
  Share,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstall
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  };

  const features = [
    {
      icon: <Smartphone className="w-5 h-5" strokeWidth={2.5} />,
      text: "Works offline",
      color: "border-t-primary",
    },
    {
      icon: <Download className="w-5 h-5" strokeWidth={2.5} />,
      text: "Fast loading",
      color: "border-t-secondary",
    },
    {
      icon: <Monitor className="w-5 h-5" strokeWidth={2.5} />,
      text: "Full screen",
      color: "border-t-tertiary",
    },
    {
      icon: <CheckCircle className="w-5 h-5" strokeWidth={2.5} />,
      text: "Auto updates",
      color: "border-t-quaternary",
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header />

      <main className="pt-32 pb-20 relative overflow-hidden dot-grid">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-2xl mx-auto mb-8 flex items-center justify-center bg-primary border-2 border-foreground/80 shadow-pop animate-fade-in">
              <span className="text-3xl font-extrabold text-primary-foreground font-heading">
                N
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-1 font-heading animate-fade-in delay-100">
              Install Nextup Resources
            </h1>

            <SquigglyUnderline
              color="hsl(var(--quaternary))"
              width={260}
            />

            <p className="text-lg text-muted-foreground mb-8 mt-4 animate-fade-in delay-200">
              Get the full app experience on your device.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10 animate-fade-in delay-300">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-card border-2 border-foreground/80 rounded-xl p-4 flex items-center gap-3 shadow-pop-soft border-t-4 ${feature.color}`}
                >
                  <div className="text-primary">{feature.icon}</div>
                  <span className="text-sm font-bold text-foreground">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {isStandalone || isInstalled ? (
              <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 shadow-pop-soft">
                <CheckCircle
                  className="w-16 h-16 text-quaternary mx-auto mb-4"
                  strokeWidth={2.5}
                />
                <h2 className="text-2xl font-bold">
                  Already Installed!
                </h2>
                <p className="text-muted-foreground">
                  You're using the installed version.
                </p>
              </div>
            ) : isIOS ? (
              <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 shadow-pop-soft">
                <h2 className="text-xl font-bold mb-4">
                  Install on iOS
                </h2>

                <div className="space-y-4 text-left">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <p className="font-bold">Tap the Share button</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Look for <Share className="w-4 h-4" /> in Safari
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <p className="font-bold">
                        Add to Home Screen
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 shadow-pop-soft">
                <h2 className="text-xl font-bold mb-4">
                  Install on Android
                </h2>

                <div className="space-y-4">
                  {deferredPrompt && (
                    <Button
                      size="xl"
                      onClick={handleInstall}
                      className="w-full"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Install PWA
                    </Button>
                  )}

                  <Button
                    asChild
                    size="xl"
                    variant="outline"
                    className="w-full"
                  >
                    <a
                      href="https://github.com/shreyagarwal72/nextup-resource/releases/download/1.0.2/Nextup.apk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download APK
                    </a>
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Install as a PWA or download the APK directly from GitHub.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};
export default Install;