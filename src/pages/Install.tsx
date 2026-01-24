import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Monitor, CheckCircle, Share, MoreVertical } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkStandalone = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(checkStandalone);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
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
    { icon: <Smartphone className="w-5 h-5" />, text: "Works offline" },
    { icon: <Download className="w-5 h-5" />, text: "Fast loading" },
    { icon: <Monitor className="w-5 h-5" />, text: "Full screen experience" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "Auto updates" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="liquid-blob w-80 h-80 bg-primary/20 top-20 -left-40" />
        <div className="liquid-blob w-72 h-72 bg-purple-400/20 bottom-20 -right-36" style={{ animationDelay: "-3s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* App Icon */}
            <div className="glass-heavy w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">N</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Install Nextup Resources
            </h1>

            <p className="text-lg text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Get the full app experience on your device. Access courses and resources anytime, even offline.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {features.map((feature, index) => (
                <div key={index} className="glass-button rounded-xl p-4 flex items-center gap-3">
                  <div className="text-primary">{feature.icon}</div>
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Install Status */}
            {isStandalone || isInstalled ? (
              <div className="glass-heavy rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">Already Installed!</h2>
                <p className="text-muted-foreground">
                  You're using the installed version of Nextup Resources.
                </p>
              </div>
            ) : isIOS ? (
              <div className="glass-heavy rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">Install on iOS</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tap the Share button</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Look for <Share className="w-4 h-4" /> at the bottom of Safari
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Select "Add to Home Screen"</p>
                      <p className="text-sm text-muted-foreground">Scroll down in the share menu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tap "Add"</p>
                      <p className="text-sm text-muted-foreground">The app will appear on your home screen</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : deferredPrompt ? (
              <Button
                variant="glassPrimary"
                size="xl"
                onClick={handleInstall}
                className="animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <Download className="w-5 h-5 mr-2" />
                Install App
              </Button>
            ) : (
              <div className="glass-heavy rounded-2xl p-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-xl font-semibold text-foreground mb-4">Install on Android</h2>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tap the menu button</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Look for <MoreVertical className="w-4 h-4" /> in Chrome
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Select "Install app" or "Add to Home Screen"</p>
                      <p className="text-sm text-muted-foreground">Follow the prompts to install</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Install;
