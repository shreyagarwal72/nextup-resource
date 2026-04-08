import { allCourses, allResources } from "@/data/content";
import { aiTools } from "@/data/aiTools";

const stats = [
  { value: `${allCourses.length}+`, label: "Expert Courses", color: "border-t-primary" },
  { value: `${allResources.length}+`, label: "Free Resources", color: "border-t-secondary" },
  { value: `${aiTools.length}+`, label: "AI Tools", color: "border-t-tertiary" },
];

const Stats = () => {
  return (
    <div className="bg-card border-2 border-foreground/80 rounded-3xl p-8 md:p-10 shadow-pop-soft">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-4 relative border-t-4 ${stat.color} rounded-lg`}
          >
            <span className="text-4xl md:text-5xl font-extrabold text-foreground mb-2 font-heading">
              {stat.value}
            </span>
            <span className="text-muted-foreground font-bold text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
