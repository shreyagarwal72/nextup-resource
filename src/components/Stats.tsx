const stats = [
  {
    value: "50+",
    label: "Expert Courses",
  },
  {
    value: "10K+",
    label: "Active Learners",
  },
  {
    value: "95%",
    label: "Satisfaction Rate",
  },
];

const Stats = () => {
  return (
    <div className="glass-heavy rounded-3xl p-8 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 relative"
          >
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
              {stat.value}
            </span>
            <span className="text-muted-foreground font-medium">
              {stat.label}
            </span>
            {/* Divider for non-last items on desktop */}
            {index < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
