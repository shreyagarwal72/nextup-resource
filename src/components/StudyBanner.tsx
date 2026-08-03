import { useEffect, useMemo } from "react";
import { GraduationCap, X } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import { allCourses, allResources, allEbooks, allApps, studyCategories } from "@/data/content";

const matchesStudy = (category: string) =>
  studyCategories.some((cat) => category.toLowerCase().includes(cat.toLowerCase()));

export const StudyBanner = () => {
  const { isStudyMode, disableStudyMode } = useStudyMode();

  const counts = useMemo(() => {
    if (!isStudyMode) return { courses: 0, resources: 0, ebooks: 0, apps: 0, total: 0 };
    const courses = allCourses.filter((c) => matchesStudy(c.category)).length;
    const resources = allResources.filter((r) => matchesStudy(r.category)).length;
    const ebooks = allEbooks.filter((e) => matchesStudy(e.category)).length;
    const apps = allApps.filter((a) => matchesStudy(a.category)).length;
    return { courses, resources, ebooks, apps, total: courses + resources + ebooks + apps };
  }, [isStudyMode]);

  // Push page content down so the fixed banner never covers the top of a page.
  useEffect(() => {
    if (!isStudyMode) {
      document.body.style.removeProperty("padding-top");
      return;
    }
    document.body.style.paddingTop = "52px";
    return () => {
      document.body.style.removeProperty("padding-top");
    };
  }, [isStudyMode]);


  if (!isStudyMode) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-0 right-0 top-[68px] sm:top-[76px] z-[45] border-y-2 border-foreground/80 bg-tertiary/95 backdrop-blur-md text-tertiary-foreground shadow-pop"
    >
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-foreground/80 bg-card text-foreground shrink-0">
            <GraduationCap className="w-4 h-4" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="font-heading font-bold text-sm sm:text-base leading-tight truncate">
              Study Mode · {counts.total} items
            </p>
            <p className="text-[11px] sm:text-xs opacity-90 truncate">
              {counts.courses} courses · {counts.resources} resources · {counts.ebooks} ebooks · {counts.apps} apps
            </p>
          </div>
        </div>
        <button
          onClick={disableStudyMode}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border-2 border-foreground/80 bg-card text-foreground px-3 py-1.5 text-xs sm:text-sm font-bold shadow-pop-sm hover:-translate-y-0.5 hover:shadow-pop transition-all active:translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Exit Study Mode"
        >
          <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          Exit
        </button>
      </div>
    </div>
  );
};

export default StudyBanner;
