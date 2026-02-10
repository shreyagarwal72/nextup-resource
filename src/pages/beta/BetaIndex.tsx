import { Link } from "react-router-dom";
import { BookOpen, Package, BookText, Smartphone, ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useTypewriter } from "@/hooks/useTypewriter";
import "@/styles/material3.css";
import "@/styles/material3.css";

const BetaIndex = () => {
  const { isStudyMode } = useStudyMode();
  const typewriterText = useTypewriter(["Courses", "Resources", "Ebooks", "Apps"], 120, 80, 2000);
  
  const categories = [
    { 
      title: "Courses", 
      description: isStudyMode ? "Educational courses for focused learning" : "Premium courses on AI, development, and more",
      icon: BookOpen,
      path: "/courses",
      color: "primary"
    },
    { 
      title: "Resources", 
      description: isStudyMode ? "Study materials and learning tools" : "Free assets, templates, and tools",
      icon: Package,
      path: "/resources",
      color: "secondary"
    },
    { 
      title: "Ebooks", 
      description: isStudyMode ? "Educational guides and textbooks" : "Educational ebooks and guides",
      icon: BookText,
      path: "/ebooks",
      color: "tertiary"
    },
    { 
      title: "Apps", 
      description: isStudyMode ? "Productivity and learning apps" : "Curated mobile applications",
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
        style={{ background: `linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)` }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 md3-chip md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
            {isStudyMode ? <GraduationCap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span className="md3-label-large">{isStudyMode ? "Study Mode" : "Material 3"}</span>
          </div>
          
          <h1 className="mb-6 md3-animate-enter md3-stagger-1" 
              style={{ 
                color: "hsl(var(--md-sys-color-on-surface))",
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}>
            {isStudyMode ? (
              <>Focused Learning<br />for Success</>
            ) : (
              <>Explore{" "}
                <span style={{ color: "hsl(var(--md-sys-color-primary))" }}>
                  {typewriterText}<span className="animate-pulse">|</span>
                </span>
              </>
            )}
          </h1>
          
          <p className="md3-body-large mb-8 max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Distraction-free learning environment with curated educational content to accelerate your growth."
              : "Discover premium courses, free resources, ebooks, and apps to accelerate your learning journey."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md3-animate-enter md3-stagger-3">
            <Link to="/courses" className="md3-filled-button flex items-center gap-2">
              {isStudyMode ? "Start Studying" : "Explore Courses"}
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
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
            {isStudyMode ? "Study Categories" : "Browse Categories"}
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
                    style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
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
                <div className="mb-2"
                     style={{ 
                       color: "hsl(var(--md-sys-color-primary))",
                       fontSize: "2.5rem",
                       fontWeight: 700,
                       lineHeight: 1
                     }}>
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
