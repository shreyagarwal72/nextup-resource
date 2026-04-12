import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import BottomNav from "@/components/BottomNav";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-background" style={{ fontFamily: "'Arvo', serif" }}>
      <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet" />
      <section className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-lg text-center">
          <div
            className="w-full h-[300px] sm:h-[400px] bg-center bg-no-repeat bg-contain rounded-2xl border-2 border-foreground/80 shadow-pop overflow-hidden"
            style={{
              backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-[60px] sm:text-[80px] font-extrabold text-foreground mt-8 drop-shadow-md">
              404
            </h1>
          </div>

          <div className="-mt-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
              Look like you're lost
            </h3>
            <p className="text-muted-foreground font-medium mb-6">
              The page you are looking for is not available!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl border-2 border-foreground/80 shadow-pop hover:-translate-y-1 hover:shadow-pop-lg transition-all duration-300"
            >
              Go to Home
            </a>
          </div>
        </div>
      </section>
      <BottomNav />
    </div>
  );
};

export default NotFound;
