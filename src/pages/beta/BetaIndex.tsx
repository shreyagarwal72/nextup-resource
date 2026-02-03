import { Link } from "react-router-dom";
import { BookOpen, Package, BookText, Smartphone, ArrowRight, Sparkles } from "lucide-react";
import "@/styles/material3.css";

const BetaIndex = () => {
  const categories = [
    { 
      title: "Courses", 
      description: "Premium courses on AI, development, and more",
      icon: BookOpen,
      path: "/courses",
      color: "primary"
    },
    { 
      title: "Resources", 
      description: "Free assets, templates, and tools",
      icon: Package,
      path: "/resources",
      color: "secondary"
    },
    { 
      title: "Ebooks", 
      description: "Educational ebooks and guides",
      icon: BookText,
      path: "/ebooks",
      color: "tertiary"
    },
    { 
      title: "Apps", 
      description: "Curated mobile applications",
      icon: Smartphone,
      path: "/apps",
      color: "primary"
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 md3-chip md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
            <Sparkles className="w-4 h-4" />
            <span className="md3-label-large">Material 3 Beta</span>
          </div>
          
          <h1 className="md3-display-medium mb-6 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            Quality Education<br />for Everyone
          </h1>
          
          <p className="md3-body-large mb-8 max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            Discover premium courses, free resources, ebooks, and apps to accelerate your learning journey.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md3-animate-enter md3-stagger-3">
            <Link to="/courses" className="md3-filled-button flex items-center gap-2">
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/resources" className="md3-tonal-button">
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="md3-headline-medium mb-8 text-center"
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            Browse Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.path}
                to={category.path}
                className={`md3-card p-6 text-center md3-animate-enter md3-stagger-${index + 1}`}
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `hsl(var(--md-sys-color-${category.color}-container))` }}
                >
                  <category.icon 
                    className="w-8 h-8" 
                    style={{ color: `hsl(var(--md-sys-color-on-${category.color}-container))` }}
                  />
                </div>
                <h3 className="md3-title-medium mb-2"
                    style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                  {category.title}
                </h3>
                <p className="md3-body-small"
                   style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-16 px-4"
        style={{ background: "hsl(var(--md-sys-color-surface-variant))" }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Courses" },
              { value: "30+", label: "Resources" },
              { value: "15+", label: "Apps" },
              { value: "Free", label: "Forever" },
            ].map((stat, index) => (
              <div key={stat.label} className={`md3-animate-enter md3-stagger-${index + 1}`}>
                <div className="md3-display-small mb-2"
                     style={{ color: "hsl(var(--md-sys-color-primary))" }}>
                  {stat.value}
                </div>
                <div className="md3-label-large"
                     style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BetaIndex;
