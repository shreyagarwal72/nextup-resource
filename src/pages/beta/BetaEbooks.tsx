import { allEbooks as ebooks, sortByPreference, groupByCategory } from "@/data/content";
import { Download, BookText } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const studyCategories = ["Education", "Business", "Technology", "Development", "Learning", "Guide"];

const BetaEbooks = () => {
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();
  
  const filteredEbooks = isStudyMode
    ? ebooks.filter(ebook => 
        studyCategories.some(cat => 
          ebook.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : ebooks;

  const sortedEbooks = sortByPreference(filteredEbooks, sortPreference);
  const isCategoryView = sortPreference === 'category';
  const grouped = isCategoryView ? groupByCategory(sortedEbooks) : null;

  return (
    <div className="min-h-screen">
      <section 
        className="relative py-16 px-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-tertiary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center md3-animate-enter"
               style={{ background: "hsl(var(--md-sys-color-tertiary))" }}>
            <BookText className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="md3-display-small mb-4 md3-animate-enter md3-stagger-1" 
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            Free Ebooks
          </h1>
          
          <p className="md3-body-large max-w-2xl mx-auto md3-animate-enter md3-stagger-2"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Educational ebooks to enhance your learning journey."
              : "Download premium ebooks completely free. Enhance your knowledge with our curated collection."}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {sortedEbooks.length === 0 ? (
            <div className="text-center py-16">
              <BookText className="w-16 h-16 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
              <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                No study-related ebooks found. Toggle off Study Mode to see all content.
              </p>
            </div>
          ) : isCategoryView && grouped ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-10">
                <h2 className="md3-headline-small mb-6" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((ebook, index) => (
                    <a key={ebook.title} href={ebook.link} target="_blank" rel="noopener noreferrer"
                       className={`md3-card overflow-hidden md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-500"
                             style={{ transform: "scale(1)" }}
                             onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                             onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} />
                        <div className="absolute top-3 left-3 md3-chip"
                             style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
                          {ebook.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="md3-title-medium mb-2" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>{ebook.title}</h3>
                        <p className="md3-body-small mb-4 line-clamp-2" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{ebook.description}</p>
                        <div className="flex items-center gap-2 md3-filled-button text-sm justify-center"
                             style={{ background: "hsl(var(--md-sys-color-tertiary))" }}>
                          <Download className="w-4 h-4" />Download
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEbooks.map((ebook, index) => (
                <a key={ebook.title} href={ebook.link} target="_blank" rel="noopener noreferrer"
                   className={`md3-card overflow-hidden md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-500"
                         style={{ transform: "scale(1)" }}
                         onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                         onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"} />
                    <div className="absolute top-3 left-3 md3-chip"
                         style={{ background: "hsl(var(--md-sys-color-tertiary-container))", color: "hsl(var(--md-sys-color-on-tertiary-container))" }}>
                      {ebook.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="md3-title-medium mb-2" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>{ebook.title}</h3>
                    <p className="md3-body-small mb-4 line-clamp-2" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>{ebook.description}</p>
                    <div className="flex items-center gap-2 md3-filled-button text-sm justify-center"
                         style={{ background: "hsl(var(--md-sys-color-tertiary))" }}>
                      <Download className="w-4 h-4" />Download
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaEbooks;
