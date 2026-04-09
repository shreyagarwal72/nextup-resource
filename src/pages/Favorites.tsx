import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BottomNav from "@/components/BottomNav";
import SquigglyUnderline from "@/components/SquigglyUnderline";
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
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-card border-2 border-foreground/80 shadow-pop">
              <Heart className="w-5 h-5 text-destructive fill-current" strokeWidth={2.5} />
              <span className="text-sm font-bold text-foreground">{totalCount} Saved Items</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-1 font-heading">Your Favorites</h1>
            <SquigglyUnderline color="hsl(var(--destructive))" width={220} />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-4">
              Access all your saved courses, resources, and ebooks in one place
            </p>
            {totalCount > 0 && (
              <Button variant="outline" size="sm" className="mt-6" onClick={clearFavorites}>
                <Trash2 className="w-4 h-4 mr-2" strokeWidth={2.5} /> Clear All Favorites
              </Button>
            )}
          </div>

          {totalCount === 0 ? (
            <div className="text-center py-20">
              <div className="bg-card border-2 border-foreground/80 rounded-2xl p-12 max-w-md mx-auto shadow-pop-soft">
                <Heart className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-3 font-heading">No favorites yet</h2>
                <p className="text-muted-foreground mb-6">Start exploring and save items you're interested in!</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild><Link to="/courses">Explore Courses</Link></Button>
                  <Button variant="outline" asChild><Link to="/resources">Browse Resources</Link></Button>
                  <Button variant="outline" asChild><Link to="/ebooks">View Ebooks</Link></Button>
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="courses" className="flex items-center gap-2">
                  Courses <span className="px-2 py-0.5 rounded-full text-xs bg-muted font-bold">{favoriteCourses.length}</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  Resources <span className="px-2 py-0.5 rounded-full text-xs bg-muted font-bold">{favoriteResources.length}</span>
                </TabsTrigger>
                <TabsTrigger value="ebooks" className="flex items-center gap-2">
                  Ebooks <span className="px-2 py-0.5 rounded-full text-xs bg-muted font-bold">{favoriteEbooks.length}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses">
                {favoriteCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 max-w-md mx-auto shadow-pop-soft">
                      <p className="text-muted-foreground font-medium">No favorite courses yet.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pop-stagger">
                    {favoriteCourses.map((course) => <CourseCard key={course.title} {...course} />)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources">
                {favoriteResources.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 max-w-md mx-auto shadow-pop-soft">
                      <p className="text-muted-foreground font-medium">No favorite resources yet.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pop-stagger">
                    {favoriteResources.map((resource) => <ResourceCard key={resource.title} {...resource} />)}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ebooks">
                {favoriteEbooks.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 max-w-md mx-auto shadow-pop-soft">
                      <p className="text-muted-foreground font-medium">No favorite ebooks yet.</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pop-stagger">
                    {favoriteEbooks.map((ebook) => <EbookCard key={ebook.title} {...ebook} />)}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <BottomNav />
    </div>
  );
};

export default Favorites;
