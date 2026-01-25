import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden py-16">
      {/* Subtle background blob */}
      <div className="liquid-blob w-96 h-96 bg-primary/5 -bottom-48 left-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-heavy rounded-3xl p-10">
          <div className="flex flex-col items-center text-center">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110">
                <span className="text-xl font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Nextup Resources</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Empowering learners worldwide with premium courses and free resources.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/nextup.resources/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button p-3 rounded-xl text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/@NextupResources" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button p-3 rounded-xl text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-border/30 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Nextup Resources. All rights reserved.
            </p>
            <Link 
              to="/faq" 
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
