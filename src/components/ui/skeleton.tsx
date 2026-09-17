import { cn } from "@/lib/utils";
import { useDesignSystem } from "@/components/ThemeProvider";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { designSystem } = useDesignSystem();
  return <div className={cn("animate-pulse bg-muted", designSystem === "clay" ? "rounded-2xl shadow-[var(--clay-shadow-inset)]" : "rounded-md", className)} {...props} />;
}

export { Skeleton };
