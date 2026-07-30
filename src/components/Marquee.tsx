const keywords = [
  "LEARN", "CREATE", "GROW", "EXPLORE", "BUILD", "DISCOVER", "INNOVATE", "SHARE", "INSPIRE", "CODE"
];

const colors = [
  "text-primary", "text-secondary", "text-tertiary", "text-quaternary",
  "text-primary", "text-secondary", "text-tertiary", "text-quaternary",
  "text-primary", "text-secondary"
];

const Marquee = () => {
  const items = [...keywords, ...keywords]; // duplicate for seamless loop

  return (
    <div className="bg-card border-y-2 border-foreground/80">
      <p className="text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground pt-3">
        What you'll find here
      </p>
      <div
        className="relative overflow-hidden py-4"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
        aria-hidden="true"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((word, i) => (
            <span key={i} className="flex items-center mx-4">
              <span className={`text-lg sm:text-xl font-extrabold font-heading ${colors[i % colors.length]}`}>
                {word}
              </span>
              <span className="mx-4 text-foreground/30 text-xl">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
