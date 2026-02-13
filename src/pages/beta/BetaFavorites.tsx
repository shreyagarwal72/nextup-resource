import { Heart, Trash2, BookOpen, Package, BookText } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites, generateId } from "@/hooks/useFavorites";
import { allCourses, allResources, allEbooks } from "@/data/content";
import Material3CourseCard from "@/components/beta/Material3CourseCard";
import Material3ResourceCard from "@/components/beta/Material3ResourceCard";
import { useState } from "react";
import "@/styles/material3.css";

const tabs = [
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "resources", label: "Resources", icon: Package },
  { key: "ebooks", label: "Ebooks", icon: BookText },
] as const;

type TabKey = (typeof tabs)[number]["key"];

const BetaFavorites = () => {
  const { getFavoritesByType, clearFavorites, totalCount } = useFavorites();
  const [activeTab, setActiveTab] = useState<TabKey>("courses");

  const favoriteCourseIds = getFavoritesByType("course");
  const favoriteResourceIds = getFavoritesByType("resource");
  const favoriteEbookIds = getFavoritesByType("ebook");

  const favoriteCourses = allCourses.filter((c) =>
    favoriteCourseIds.includes(generateId(c.title))
  );
  const favoriteResources = allResources.filter((r) =>
    favoriteResourceIds.includes(generateId(r.title))
  );
  const favoriteEbooks = allEbooks.filter((e) =>
    favoriteEbookIds.includes(generateId(e.title))
  );

  const counts: Record<TabKey, number> = {
    courses: favoriteCourses.length,
    resources: favoriteResources.length,
    ebooks: favoriteEbooks.length,
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--md-sys-color-error-container)) 0%, hsl(var(--md-sys-color-surface)) 100%)",
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center md3-animate-enter"
              style={{ background: "hsl(var(--md-sys-color-error))" }}
            >
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <h1
              className="md3-display-small md3-animate-enter"
              style={{
                color: "hsl(var(--md-sys-color-on-surface))",
                fontWeight: 600,
              }}
            >
              Your Favorites
            </h1>
          </div>
          <p
            className="md3-body-large mb-4 md3-animate-enter md3-stagger-1"
            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
          >
            {totalCount} saved items across courses, resources, and ebooks
          </p>
          {totalCount > 0 && (
            <button
              onClick={clearFavorites}
              className="md3-tonal-button px-4 py-2 rounded-full flex items-center gap-2 md3-animate-enter md3-stagger-2"
            >
              <Trash2 className="w-4 h-4" />
              <span className="md3-label-large">Clear All</span>
            </button>
          )}
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-16 z-30 md3-surface-container">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all whitespace-nowrap"
                  style={{
                    background: isActive
                      ? "hsl(var(--md-sys-color-secondary-container))"
                      : "transparent",
                    color: isActive
                      ? "hsl(var(--md-sys-color-on-secondary-container))"
                      : "hsl(var(--md-sys-color-on-surface-variant))",
                  }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="md3-label-large">{tab.label}</span>
                  <span
                    className="md3-label-small px-2 py-0.5 rounded-full"
                    style={{
                      background: isActive
                        ? "hsl(var(--md-sys-color-primary))"
                        : "hsl(var(--md-sys-color-surface-variant))",
                      color: isActive
                        ? "hsl(var(--md-sys-color-on-primary))"
                        : "hsl(var(--md-sys-color-on-surface-variant))",
                    }}
                  >
                    {counts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {totalCount === 0 ? (
            <div className="text-center py-16">
              <div className="md3-card p-12 max-w-md mx-auto md3-animate-enter">
                <Heart
                  className="w-16 h-16 mx-auto mb-6"
                  style={{ color: "hsl(var(--md-sys-color-outline))" }}
                />
                <h2
                  className="md3-headline-small mb-3"
                  style={{ color: "hsl(var(--md-sys-color-on-surface))" }}
                >
                  No favorites yet
                </h2>
                <p
                  className="md3-body-large mb-8"
                  style={{
                    color: "hsl(var(--md-sys-color-on-surface-variant))",
                  }}
                >
                  Start exploring and save items you like!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/courses"
                    className="md3-filled-button px-6 py-2.5 rounded-full text-center"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    to="/resources"
                    className="md3-tonal-button px-6 py-2.5 rounded-full text-center"
                  >
                    Browse Resources
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "courses" && (
                <>
                  {favoriteCourses.length === 0 ? (
                    <EmptyTabState label="courses" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteCourses.map((course, i) => (
                        <div
                          key={course.title}
                          className={`md3-animate-enter md3-stagger-${(i % 6) + 1}`}
                        >
                          <Material3CourseCard {...course} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === "resources" && (
                <>
                  {favoriteResources.length === 0 ? (
                    <EmptyTabState label="resources" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteResources.map((resource, i) => (
                        <div
                          key={resource.title}
                          className={`md3-animate-enter md3-stagger-${(i % 6) + 1}`}
                        >
                          <Material3ResourceCard {...resource} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === "ebooks" && (
                <>
                  {favoriteEbooks.length === 0 ? (
                    <EmptyTabState label="ebooks" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteEbooks.map((ebook, i) => (
                        <div
                          key={ebook.title}
                          className={`md3-animate-enter md3-stagger-${(i % 6) + 1}`}
                        >
                          <Material3ResourceCard
                            title={ebook.title}
                            description={ebook.description}
                            category={ebook.category}
                            image={ebook.image}
                            link={ebook.link}
                            dateAdded={ebook.dateAdded}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

const EmptyTabState = ({ label }: { label: string }) => (
  <div className="text-center py-16">
    <div className="md3-card p-8 max-w-md mx-auto">
      <p
        className="md3-body-large"
        style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
      >
        No favorite {label} yet. Start exploring!
      </p>
    </div>
  </div>
);

export default BetaFavorites;
