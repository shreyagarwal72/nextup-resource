import { useState } from "react";
import CourseCard from "./CourseCard";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import { allCourses, studyCategories } from "@/data/content";
import { useStudyMode } from "@/hooks/useStudyMode";

const CoursesSection = () => {
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
    <section id="courses" className="py-20 relative overflow-hidden">
      {/* Subtle background blobs */}
      <div className="liquid-blob w-80 h-80 bg-primary/10 -top-20 -right-40" />
      <div className="liquid-blob w-96 h-96 bg-purple-400/10 -bottom-40 -left-48" style={{ animationDelay: "-3s" }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            {isStudyMode && (
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-ios-pop">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {isStudyMode ? "Study Courses" : "Featured Courses"}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isStudyMode
              ? "Focused educational courses for productive learning sessions."
              : "Explore our curated collection of premium courses designed to help you master new skills and advance your career."}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                {searchQuery 
                  ? `No courses found matching "${searchQuery}"`
                  : "No study-related courses found. Toggle off Study Mode to see all content."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
