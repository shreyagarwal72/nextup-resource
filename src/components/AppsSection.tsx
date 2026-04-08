import { useState } from "react";
import AppCard from "./AppCard";
import { Input } from "@/components/ui/input";
import { Search, Smartphone } from "lucide-react";
import { allApps, sortByPreference, groupByCategory } from "@/data/content";
import { useStudyMode } from "@/hooks/useStudyMode";
import { useSortPreference } from "@/hooks/useSortPreference";

const studyAppCategories = ["Development", "Utility", "Productivity", "Education"];

const AppsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isStudyMode } = useStudyMode();
  const { sortPreference } = useSortPreference();

  const studyFilteredApps = isStudyMode
    ? allApps.filter(app => studyAppCategories.some(cat => app.category.toLowerCase().includes(cat.toLowerCase())))
    : allApps;

  const searchFiltered = studyFilteredApps.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApps = sortByPreference(searchFiltered, sortPreference);
  const isCategoryView = sortPreference === 'category' && !searchQuery;
  const grouped = isCategoryView ? groupByCategory(filteredApps) : null;

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {isStudyMode && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary border-2 border-foreground/80 flex items-center justify-center shadow-pop">
                <Smartphone className="w-5 h-5 text-secondary-foreground" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">Productivity Apps</h2>
            </div>
          </div>
        )}

        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input type="text" placeholder="Search apps..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12" />
        </div>

        {filteredApps.length > 0 ? (
          isCategoryView && grouped ? (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="mb-10">
                <h3 className="text-xl font-bold text-foreground mb-5 px-1 font-heading">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pop-stagger">
                  {items.map((app, index) => <AppCard key={index} {...app} />)}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pop-stagger">
              {filteredApps.map((app, index) => <AppCard key={index} {...app} />)}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <div className="bg-card border-2 border-foreground/80 rounded-2xl p-8 max-w-md mx-auto shadow-pop-soft">
              <Smartphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg font-medium">
                {searchQuery ? `No apps found matching "${searchQuery}"` : "No productivity apps found."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppsSection;
