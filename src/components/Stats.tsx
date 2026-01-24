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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6"
        >
          <span className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            {stat.value}
          </span>
          <span className="text-muted-foreground font-medium">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
