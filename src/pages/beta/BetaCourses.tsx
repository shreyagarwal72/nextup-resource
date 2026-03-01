import { useState } from "react";
import { Search, BookOpen, Clock, Users, ExternalLink } from "lucide-react";
import { allCourses, studyCategories, sortByPreference, groupByCategory } from "@/data/content";
import Material3CourseCard from "@/components/beta/Material3CourseCard";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";
import "@/styles/material3.css";

const BetaCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();

  const studyFilteredCourses = isStudyMode
    ? allCourses.filter(course => 
        studyCategories.some(cat => 
          course.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : allCourses;

  const searchFiltered = studyFilteredCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCourses = sortByPreference(searchFiltered, sortPreference);
  const isCategoryView = sortPreference === 'category' && !searchQuery;
  const grouped = isCategoryView ? groupByCategory(filteredCourses) : null;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-secondary-container)) 50%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="absolute inset-0 opacity-20"
             style={{ background: "radial-gradient(circle at 20% 80%, hsl(var(--md-sys-color-tertiary) / 0.3), transparent 50%)" }} />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center md3-animate-enter"
                 style={{ background: "hsl(var(--md-sys-color-primary))", boxShadow: "0 8px 32px hsl(var(--md-sys-color-primary) / 0.3)" }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="md3-display-small md3-animate-enter md3-stagger-1"
                  style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 700 }}>
                {isStudyMode ? "Study Courses" : "All Courses"}
              </h1>
              <p className="md3-body-large md3-animate-enter md3-stagger-2"
                 style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                {filteredCourses.length} courses available
              </p>
            </div>
          </div>
          
          <div className="md3-search-bar max-w-xl md3-animate-enter md3-stagger-3">
            <Search className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none md3-body-large"
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredCourses.length > 0 ? (
            isCategoryView && grouped ? (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-12 md3-animate-enter">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                         style={{ background: "hsl(var(--md-sys-color-tertiary-container))" }}>
                      <BookOpen className="w-4 h-4" style={{ color: "hsl(var(--md-sys-color-on-tertiary-container))" }} />
                    </div>
                    <h2 className="md3-headline-small" style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
                      {category}
                    </h2>
                    <span className="md3-chip text-xs ml-auto">{items.length}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((course, index) => (
                      <div key={course.title} className={`md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                        <Material3CourseCard {...course} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <div key={course.title} className={`md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                    <Material3CourseCard {...course} />
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="md3-card p-8 max-w-md mx-auto">
                <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: "hsl(var(--md-sys-color-outline))" }} />
                <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  {searchQuery 
                    ? `No courses found matching "${searchQuery}"`
                    : "No study-related courses found. Toggle off Study Mode to see all content."}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BetaCourses;