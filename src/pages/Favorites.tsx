import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CourseCard from "@/components/CourseCard";
import ResourceCard from "@/components/ResourceCard";
import EbookCard from "@/components/EbookCard";
import { useFavorites, generateId } from "@/hooks/useFavorites";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { allCourses, allResources, allEbooks } from "@/data/content";

const Favorites = () => {
  const { getFavoritesByType, clearFavorites, totalCount } = useFavorites();

  const favoriteCourseIds = getFavoritesByType("course");
  const favoriteResourceIds = getFavoritesByType("resource");
  const favoriteEbookIds = getFavoritesByType("ebook");

  const favoriteCourses = allCourses.filter((course) =>
    favoriteCourseIds.includes(generateId(course.title))
  );

  const favoriteResources = allResources.filter((resource) =>
    favoriteResourceIds.includes(generateId(resource.title))
  );

  const favoriteEbooks = allEbooks.filter((ebook) =>
    favoriteEbookIds.includes(generateId(ebook.title))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 glass-button px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-destructive fill-current" />
              <span className="text-sm font-medium text-foreground">
                {totalCount} Saved Items
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Your Favorites
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access all your saved courses, resources, and ebooks in one place
            </p>
            
            {totalCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-6"
                onClick={clearFavorites}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Favorites
              </Button>
            )}
          </div>

          {totalCount === 0 ? (
            <div className="text-center py-20">
              <div className="glass-heavy rounded-2xl p-12 max-w-md mx-auto">
                <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-foreground mb-3">
                  No favorites yet
                </h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring and save courses, resources, and ebooks you're interested in!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="glassPrimary" asChild>
                    <Link to="/courses">Explore Courses</Link>
                  </Button>
                  <Button variant="glass" asChild>
                    <Link to="/resources">Browse Resources</Link>
                  </Button>
                  <Button variant="glass" asChild>
                    <Link to="/ebooks">View Ebooks</Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  Courses
                  <span className="glass-button px-2 py-0.5 rounded-full text-xs">
                    {favoriteCourses.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  Resources
                  <span className="glass-button px-2 py-0.5 rounded-full text-xs">
                    {favoriteResources.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="ebooks" className="flex items-center gap-2">
                  Ebooks
                  <span className="glass-button px-2 py-0.5 rounded-full text-xs">
                    {favoriteEbooks.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                {favoriteCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
                      <p className="text-muted-foreground">
                        No favorite courses yet. Start exploring!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteCourses.map((course, index) => (
                      <div
                        key={course.title}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <CourseCard {...course} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources">
                {favoriteResources.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
                      <p className="text-muted-foreground">
                        No favorite resources yet. Start exploring!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteResources.map((resource, index) => (
                      <div
                        key={resource.title}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ResourceCard {...resource} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ebooks">
                {favoriteEbooks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass-heavy rounded-2xl p-8 max-w-md mx-auto">
                      <p className="text-muted-foreground">
                        No favorite ebooks yet. Start exploring!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteEbooks.map((ebook, index) => (
                      <div
                        key={ebook.title}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <EbookCard {...ebook} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Favorites;
