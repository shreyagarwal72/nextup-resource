import { useState, useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import PencilLoader from "@/components/PencilLoader";
import Material3Loader from "@/components/Material3Loader";
import { useBetaUI } from "@/hooks/useBetaUI";
import Material3Layout from "@/components/beta/Material3Layout";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Courses = lazy(() => import("./pages/Courses"));
const Resources = lazy(() => import("./pages/Resources"));
const Ebooks = lazy(() => import("./pages/Ebooks"));
const Apps = lazy(() => import("./pages/Apps"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Contact = lazy(() => import("./pages/Contact"));
const Install = lazy(() => import("./pages/Install"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const AI = lazy(() => import("./pages/AI"));

// Material 3 pages
const BetaIndex = lazy(() => import("./pages/beta/BetaIndex"));
const BetaCourses = lazy(() => import("./pages/beta/BetaCourses"));
const BetaResources = lazy(() => import("./pages/beta/BetaResources"));
const BetaEbooks = lazy(() => import("./pages/beta/BetaEbooks"));
const BetaApps = lazy(() => import("./pages/beta/BetaApps"));
const BetaFAQ = lazy(() => import("./pages/beta/BetaFAQ"));
const BetaSettings = lazy(() => import("./pages/beta/BetaSettings"));
const BetaAI = lazy(() => import("./pages/beta/BetaAI"));
const BetaFavorites = lazy(() => import("./pages/beta/BetaFavorites"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isBetaEnabled, disableBetaUI } = useBetaUI();
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasShownSplash(true);
    sessionStorage.setItem("splashShown", "true");
  };

  const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );

  // Material 3 UI
  if (isBetaEnabled) {
    return (
      <>
        {showSplash && !hasShownSplash && (
          <Material3Loader onComplete={handleSplashComplete} duration={1800} />
        )}
        <BrowserRouter>
          <Material3Layout onExitBeta={disableBetaUI}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<BetaIndex />} />
                <Route path="/courses" element={<BetaCourses />} />
                <Route path="/resources" element={<BetaResources />} />
                <Route path="/ebooks" element={<BetaEbooks />} />
                <Route path="/apps" element={<BetaApps />} />
                <Route path="/favorites" element={<BetaFavorites />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/install" element={<Install />} />
                <Route path="/faq" element={<BetaFAQ />} />
                <Route path="/settings" element={<BetaSettings />} />
                <Route path="/ai" element={<BetaAI />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Material3Layout>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      {showSplash && !hasShownSplash && (
        <PencilLoader onComplete={handleSplashComplete} duration={1800} />
      )}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/ebooks" element={<Ebooks />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/install" element={<Install />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ai" element={<AI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
