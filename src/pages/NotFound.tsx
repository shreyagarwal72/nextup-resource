import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import desktopImage from "@/assets/404-desktop.webp";
import mobileImage from "@/assets/404-mobile.webp";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Desktop Image */}
      <img 
        src={desktopImage} 
        alt="404 Error - Page Not Found" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      />
      {/* Mobile Image */}
      <img 
        src={mobileImage} 
        alt="404 Error - Page Not Found" 
        className="block md:hidden absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4">
        <Button 
          onClick={() => window.location.href = '/'} 
          size="lg"
          className="bg-foreground hover:bg-foreground/90 text-background font-semibold px-8 py-6 text-lg rounded-full shadow-lg"
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
