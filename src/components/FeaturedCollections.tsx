import { Link } from "react-router-dom";
import { ArrowRight, Package, Briefcase, Gamepad2, Bot } from "lucide-react";
import { collections } from "@/data/content";

const getCollectionIcon = (slug: string) => {
  switch (slug) {
    case "placement-material":
      return <Briefcase className="w-5 h-5 text-primary" strokeWidth={2.5} />;
    case "gta-collection":
      return <Gamepad2 className="w-5 h-5 text-secondary" strokeWidth={2.5} />;
    case "ai-tools-for-everything":
    case "30-ai-tools":
      return <Bot className="w-5 h-5 text-tertiary" strokeWidth={2.5} />;
    default:
      return <Package className="w-5 h-5 text-primary" strokeWidth={2.5} />;
  }
};

interface Props {
  title?: string;
  subtitle?: string;
  filterSlugs?: string[];
}

const FeaturedCollections = ({
  title = "Featured Collections",
  subtitle = "Curated bundles: every verified resource in one place.",
  filterSlugs,
}: Props) => {
  const items = filterSlugs
    ? collections.filter((c) => filterSlugs.includes(c.slug))
    : collections;

  if (items.length === 0) return null;

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading mb-2">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-x-12 pop-stagger dashed-grid cols-2">
          {items.map((c) => (
            <Link
              key={c.slug}
              to={`/collection/${c.slug}`}
              className="pop-card group p-6 flex items-start gap-4 relative overflow-visible"
            >
              <div className="shrink-0 pt-0.5">
                {getCollectionIcon(c.slug)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {c.tagline}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                  {c.description}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-foreground/70">
                  <Package className="w-3 h-3 text-primary" strokeWidth={2.5} />
                  <span>{c.items.length} verified items</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
