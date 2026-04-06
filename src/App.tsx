import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useBetaUI } from "@/hooks/useBetaUI";
import Material3Layout from "@/components/beta/Material3Layout";
import "@/styles/theme-nothing.css";

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

// Nothing pages
const NothingIndex = lazy(() => import("./pages/nothing/NothingIndex"));

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
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('nextup-app-theme') : null;
  const isNothingTheme = storedTheme === 'nothing';

  useEffect(() => {
    if (isNothingTheme) {
      document.documentElement.classList.add('theme-nothing');
    } else {
      document.documentElement.classList.remove('theme-nothing');
    }
  }, [isNothingTheme]);

  const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-3 h-3 bg-primary" style={{ animation: `nth-dot-pulse 0.8s ${i * 0.15}s ease infinite` }} />
        ))}
      </div>
    </div>
  );

  // Material 3 UI
  if (isBetaEnabled && !isNothingTheme) {
    return (
      <>
        
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

  // Nothing theme - uses NothingIndex for homepage, shared pages for rest
  if (isNothingTheme) {
    return (
      <>
        
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<NothingIndex />} />
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
  }

  // Liquid Glass (default)
  return (
    <>
      
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
