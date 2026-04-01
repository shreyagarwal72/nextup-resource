import { Link } from "react-router-dom";
import { BookOpen, Package, BookText, Smartphone, ArrowRight, Sparkles, GraduationCap, Bot, TrendingUp, Star, Zap, Globe, Heart } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useTypewriter } from "@/hooks/useTypewriter";
import { allCourses, allResources, allEbooks, allWebsites } from "@/data/content";
import { aiTools } from "@/data/aiTools";
import "@/styles/material3.css";

const BetaIndex = () => {
  const { isStudyMode } = useStudyMode();
  const typewriterText = useTypewriter(["Courses", "Resources", "Ebooks", "Apps & Websites", "AI Tools"], 120, 80, 2000);
  
  const categories = [
    { title: "Courses", description: isStudyMode ? "Educational courses for focused learning" : "Premium courses on AI, development, and more", icon: BookOpen, path: "/courses", color: "primary", count: allCourses.length },
    { title: "Resources", description: isStudyMode ? "Study materials and learning tools" : "Free assets, templates, and tools", icon: Package, path: "/resources", color: "secondary", count: allResources.length },
    { title: "Ebooks", description: isStudyMode ? "Educational guides and textbooks" : "Educational ebooks and guides", icon: BookText, path: "/ebooks", color: "tertiary", count: allEbooks.length },
    { title: "Apps & Websites", description: isStudyMode ? "Productivity and learning apps" : "Curated apps and learning websites", icon: Smartphone, path: "/apps", color: "primary", count: 15 + allWebsites.length },
    { title: "AI Tools", description: "Curated collection of powerful AI tools", icon: Bot, path: "/ai", color: "secondary", count: aiTools.length },
  ];

  const quickActions = [
    { label: "Browse Courses", path: "/courses", icon: BookOpen },
    { label: "AI Tools", path: "/ai", icon: Bot },
    { label: "Websites", path: "/apps", icon: Globe },
    { label: "Favorites", path: "/favorites", icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-24 px-4 overflow-hidden"
        style={{ background: `linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-tertiary-container)) 50%, hsl(var(--md-sys-color-surface)) 100%)` }}
      >
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 md3-hero-float"
             style={{ background: "hsl(var(--md-sys-color-primary))" }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 md3-hero-float"
             style={{ background: "hsl(var(--md-sys-color-tertiary))", animationDelay: "-3s" }} />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 md3-chip md3-animate-enter md3-pulse-glow"
               style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
            {isStudyMode ? <GraduationCap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span className="md3-label-large">{isStudyMode ? "Study Mode" : "Material 3 Expressive"}</span>
          </div>
          
          <h1 className="mb-6 md3-animate-enter md3-stagger-1" 
              style={{ 
                color: "hsl(var(--md-sys-color-on-surface))",
                fontSize: "clamp(1.75rem, 6vw, 4rem)",
                lineHeight: 1.15,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}>
            {isStudyMode ? (
              <>Focused Learning<br />for Success</>
            ) : (
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3">
                <span>Explore</span>
                <span style={{ color: "hsl(var(--md-sys-color-primary))", whiteSpace: "nowrap" }}>
                  {typewriterText}<span className="animate-pulse">|</span>
                </span>
              </span>
            )}
          </h1>
          
          <p className="md3-body-large mb-10 max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Distraction-free learning environment with curated educational content to accelerate your growth."
              : "Discover premium courses, free resources, ebooks, apps, websites, and AI tools — all in one place."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md3-animate-enter md3-stagger-3">
            <Link to="/courses" className="md3-filled-button flex items-center gap-2">
              {isStudyMode ? "Start Studying" : "Explore Courses"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/ai" className="md3-tonal-button flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Tools
            </Link>
            <Link to="/resources" className="md3-outlined-button">
              Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-6 px-4"
               style={{ background: "hsl(var(--md-sys-color-surface-container-low, var(--md-sys-color-surface)))" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-wrap justify-center gap-3 md3-animate-enter">
            {quickActions.map((action, i) => (
              <Link key={action.path} to={action.path}
                    className={`md3-suggestion-chip flex items-center gap-2 md3-stagger-${i + 1} md3-animate-enter`}>
                <action.icon className="w-4 h-4" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="md3-headline-medium mb-3 text-center"
              style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
            {isStudyMode ? "Study Categories" : "Browse Categories"}
          </h2>
          <p className="md3-body-medium text-center mb-10"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            Everything you need to level up
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md3-grid-stagger">
            {categories.map((category, index) => (
              <Link key={category.path} to={category.path}
                className={`md3-card p-6 group md3-animate-enter md3-stagger-${index + 1}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `hsl(var(--md-sys-color-${category.color}-container))` }}>
                    <category.icon className="w-7 h-7" style={{ color: `hsl(var(--md-sys-color-on-${category.color}-container))` }} />
                  </div>
                  <span className="md3-badge-large" style={{ background: "hsl(var(--md-sys-color-primary))", color: "hsl(var(--md-sys-color-on-primary))" }}>
                    {category.count}
                  </span>
                </div>
                <h3 className="md3-title-medium mb-2" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>{category.title}</h3>
                <p className="md3-body-small mb-4" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{category.description}</p>
                <div className="flex items-center gap-1 md3-text-button p-0" style={{ color: "hsl(var(--md-sys-color-primary))" }}>
                  <span className="md3-label-large">Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4" style={{ background: "hsl(var(--md-sys-color-surface-variant))" }}>
        <div className="container mx-auto max-w-4xl">
          <h2 className="md3-title-large text-center mb-10" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
            <Zap className="w-5 h-5 inline-block mr-2" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
            Platform Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${allCourses.length}+`, label: "Courses", icon: BookOpen },
              { value: `${allResources.length}+`, label: "Resources", icon: Package },
              { value: `${aiTools.length}+`, label: "AI Tools", icon: Bot },
              { value: "Free", label: "Forever", icon: Star },
            ].map((stat, index) => (
              <div key={stat.label} className={`md3-card-filled p-6 md3-animate-enter md3-stagger-${index + 1}`}>
                <stat.icon className="w-6 h-6 mx-auto mb-3" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                <div className="mb-2" style={{ color: "hsl(var(--md-sys-color-primary))", fontSize: "2rem", fontWeight: 700, lineHeight: 1 }}>{stat.value}</div>
                <div className="md3-label-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                <TrendingUp className="w-5 h-5 inline-block mr-2" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                Trending AI Tools
              </h2>
              <p className="md3-body-small mt-1" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>Most popular tools this week</p>
            </div>
            <Link to="/ai" className="md3-text-button flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md3-grid-stagger">
            {aiTools.slice(0, 8).map((tool, i) => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                 className={`md3-card-outlined p-4 group md3-animate-enter md3-stagger-${(i % 4) + 1}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ background: "hsl(var(--md-sys-color-primary-container))" }}>
                    <Bot className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-primary-container))" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="md3-title-small truncate" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>{tool.name}</h4>
                  </div>
                </div>
                <p className="md3-body-small line-clamp-1" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{tool.description}</p>
                <span className="md3-chip text-xs mt-3 inline-block" style={{ background: "hsl(var(--md-sys-color-surface-variant))", fontSize: "11px", padding: "2px 10px" }}>{tool.category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Special Thanks */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="md3-card-filled p-6 md3-animate-enter">
            <p className="md3-body-medium" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
              Special thanks to <span style={{ color: "hsl(var(--md-sys-color-primary))", fontWeight: 600 }}>@techinsiderashish</span> for contributing most of the content ❤️
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BetaIndex;
