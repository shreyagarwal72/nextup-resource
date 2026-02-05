import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { allCourses, studyCategories } from "@/data/content";
import Material3CourseCard from "@/components/beta/Material3CourseCard";
import { useStudyMode } from "@/hooks/useStudyMode";
import "@/styles/material3.css";

const BetaCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();

  // Filter by study mode first
  const studyFilteredCourses = isStudyMode
    ? allCourses.filter(course => 
        studyCategories.some(cat => 
          course.category.toLowerCase().includes(cat.toLowerCase())
        )
      )
    : allCourses;

  // Then filter by search query
  const filteredCourses = studyFilteredCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section 
        className="py-12 px-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--md-sys-color-primary-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)" }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            {isStudyMode && (
              <div className="w-12 h-12 rounded-full flex items-center justify-center md3-animate-enter"
                   style={{ background: "hsl(var(--md-sys-color-primary))" }}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="md3-display-small md3-animate-enter"
                style={{ color: "hsl(var(--md-sys-color-on-surface))", fontWeight: 600 }}>
              {isStudyMode ? "Study Courses" : "All Courses"}
            </h1>
          </div>
          <p className="md3-body-large mb-8 md3-animate-enter md3-stagger-1"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            {isStudyMode 
              ? "Focused educational courses for productive learning"
              : "Discover our complete collection of premium courses"}
          </p>
          
          {/* Search */}
          <div className="md3-search-bar max-w-xl md3-animate-enter md3-stagger-2">
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

      {/* Courses Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div key={course.title} className={`md3-animate-enter md3-stagger-${(index % 6) + 1}`}>
                  <Material3CourseCard {...course} />
                </div>
              ))}
            </div>
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
