import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-lg font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-lg font-semibold">Nextup Resources</span>
            </Link>
            <p className="text-background/70 text-sm mb-6">
              Empowering learners worldwide with premium courses and free resources.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/courses" className="text-background/70 hover:text-background transition-colors text-sm">
                  All Courses
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-background/70 hover:text-background transition-colors text-sm">
                  Free Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-background transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  AI & Machine Learning
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  Data Science
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors text-sm">
                  UI/UX Design
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@nextupresources.com</span>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
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
