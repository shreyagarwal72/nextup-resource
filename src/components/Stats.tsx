import { allCourses, allResources } from "@/data/content";
import { aiTools } from "@/data/aiTools";
import { useDesignSystem } from "@/components/ThemeProvider";
import { Tape } from "@/components/ui/tape";

const stats = [
  {
    value: `${allCourses.length}+`,
    label: "Verified Courses",
    source: "Audited across tech, engineering & design",
  },
  {
    value: `${allResources.length}+`,
    label: "Developer & Design Assets",
    source: "Templates, icon packs, cheat sheets & guides",
  },
  {
    value: `${aiTools.length}+`,
    label: "AI Tools & Native Apps",
    source: "Categorized with direct links & privacy checks",
  },
];

const Stats = () => {
  const { designSystem } = useDesignSystem();
  const isLL = designSystem === "looseleaf";

  return (
    <div
      className={`relative p-8 md:p-10 ${
        isLL
          ? "ll-card text-card-foreground"
          : designSystem === "clay"
          ? "clay-card text-card-foreground"
          : designSystem === "squid-game"
          ? "squid-card text-card-foreground"
          : designSystem === "minecraft"
          ? "mc-panel-card text-card-foreground !rounded-none"
          : "bg-card border-2 border-foreground/80 rounded-3xl shadow-pop-soft"
      }`}
    >
      {isLL && <Tape variant="washi-stripes" position="top-center" width={90} height={24} />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-5 rounded-2xl border-2 border-foreground/20 bg-background/50 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="text-4xl md:text-5xl font-extrabold text-foreground mb-1.5 font-heading">
              {stat.value}
            </span>
            <span className="text-foreground font-bold text-sm mb-1">
              {stat.label}
            </span>
            <span className="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
              {stat.source}
            </span>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <span className="inline-block text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
          Catalog updated weekly • Verified public resources
        </span>
      </div>
    </div>
  );
};

export default Stats;
