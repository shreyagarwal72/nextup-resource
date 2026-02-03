import { useState } from "react";
import { Search } from "lucide-react";
import { allCourses } from "@/data/content";
import Material3CourseCard from "@/components/beta/Material3CourseCard";
import "@/styles/material3.css";

const BetaCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = allCourses.filter((course) =>
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
          <h1 className="md3-display-small mb-4 md3-animate-enter"
              style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
            All Courses
          </h1>
          <p className="md3-body-large mb-8 md3-animate-enter md3-stagger-1"
             style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
            Discover our complete collection of premium courses
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
                <p className="md3-body-large" style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}>
                  No courses found matching "{searchQuery}"
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
