import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, BookOpen, Package, Bot, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { springPresets } from "./MotionEffects";

const ConfettiCircle = ({ className }: { className: string }) => (
  <motion.div
    animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute w-6 h-6 rounded-full border-2 border-foreground/80 ${className}`}
  />
);

const ConfettiTriangle = ({ className }: { className: string }) => (
  <motion.div
    animate={{ y: [0, 14, 0], rotate: [0, -15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    className={`absolute w-0 h-0 ${className}`}
    style={{
      borderLeft: "12px solid transparent",
      borderRight: "12px solid transparent",
      borderBottom: "20px solid currentColor",
    }}
  />
);

const ConfettiSquare = ({ className }: { className: string }) => (
  <motion.div
    animate={{ y: [0, -10, 0], rotate: [12, 28, 12] }}
    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    className={`absolute w-5 h-5 border-2 border-foreground/80 ${className}`}
  />
);

const Hero = () => {
  const typewriterText = useTypewriter(["Courses", "Resources", "Ebooks", "Apps & Websites", "AI Tools"], 120, 80, 2000);

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 dot-grid">
      {/* Decorative ambient blurred blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-8 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-tertiary/20 border-2 border-foreground/10 hidden sm:block pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-12 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-secondary/15 border-2 border-foreground/10 hidden sm:block pointer-events-none"
      />

      {/* Floating confetti shapes */}
      <ConfettiCircle className="bg-secondary/30 top-32 right-[20%] hidden lg:block" />
      <ConfettiTriangle className="text-tertiary top-40 left-[15%] hidden lg:block" />
      <ConfettiSquare className="bg-quaternary/30 bottom-40 left-[10%] hidden lg:block" />
      <ConfettiCircle className="bg-primary/20 bottom-60 right-[15%] hidden lg:block" />
      <ConfettiTriangle className="text-secondary bottom-32 right-[30%] hidden lg:block" />

      <div className="container px-4 py-10 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springPresets.bouncy}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            transition={springPresets.bouncy}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold bg-card border-2 border-foreground/80 shadow-pop mb-8 cursor-pointer"
          >
            <Sparkles className="h-4 w-4 text-tertiary animate-pulse" strokeWidth={2.5} />
            <span>Welcome to Nextup Resources</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground mb-6 font-heading">
            Explore{" "}
            <span className="text-primary inline-block min-w-[200px] text-left">
              {typewriterText}
              <span className="animate-pulse text-secondary">|</span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-body">
            Discover premium courses, free resources, ebooks, apps, websites, and AI tools — all in one place. Start your learning journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springPresets.bouncy}>
              <Button size="xl" asChild className="shadow-pop hover:shadow-pop-hover">
                <Link to="/courses" className="flex items-center gap-2">
                  Explore Courses
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={springPresets.snappy}
                    className="w-7 h-7 rounded-full bg-primary-foreground/20 flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={springPresets.bouncy}>
              <Button variant="outline" size="xl" asChild className="shadow-pop hover:shadow-pop-hover">
                <Link to="/ai" className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" /> AI Tools
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {[
              { to: "/resources", icon: Package, label: "Resources", color: "hover:bg-quaternary hover:text-quaternary-foreground" },
              { to: "/apps", icon: Globe, label: "Apps & Websites", color: "hover:bg-secondary hover:text-secondary-foreground" },
              { to: "/courses", icon: BookOpen, label: "Courses", color: "hover:bg-tertiary hover:text-tertiary-foreground" },
            ].map((item, idx) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPresets.bouncy, delay: 0.2 + idx * 0.08 }}
              >
                <Link
                  to={item.to}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-foreground/80 bg-card shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 ${item.color}`}
                >
                  <item.icon className="w-4 h-4" strokeWidth={2.5} />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Special Thanks Badges */}
          <div className="flex flex-col gap-3 mt-10 items-center">
            {[
              {
                url: "https://t.me/techinsiderAs",
                text: "@techinsiderashish",
                desc: "contributing most of the content ❤️",
              },
              {
                url: "https://t.me/CoolAppStore",
                text: "@coolappstore",
                desc: "curating amazing FOSS finds on Telegram 💙",
              },
              {
                url: "https://t.me/SeedOSS",
                text: "@SeedOSS",
                desc: "being a trusted hub for open-source apps and privacy tools 🌱",
              },
            ].map((thanks, i) => (
              <motion.a
                key={thanks.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springPresets.bouncy, delay: 0.35 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={thanks.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card border-2 border-foreground/80 rounded-2xl px-6 py-3 shadow-pop-soft hover:shadow-pop transition-all inline-block"
              >
                <p className="text-sm text-muted-foreground font-medium">
                  Special thanks to <span className="text-primary font-bold underline decoration-wavy underline-offset-4">{thanks.text}</span> for {thanks.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
