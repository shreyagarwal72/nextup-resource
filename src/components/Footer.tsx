import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-lg font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-lg font-semibold">Nextup Resources</span>
          </Link>
          <p className="text-background/70 text-sm mb-6 max-w-md">
            Empowering learners worldwide with premium courses and free resources.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/nextup.resources/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.youtube.com/@NextupResources" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/60 hover:text-background transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Nextup Resources. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
