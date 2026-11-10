import * as React from "react";
import { cn } from "@/lib/utils";
import { useDesignSystem } from "@/components/ThemeProvider";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const { designSystem } = useDesignSystem();
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl bg-input border-2 border-foreground/30 px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary focus-visible:shadow-[4px_4px_0px_0px_hsl(var(--primary)/0.3)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300 font-medium",
          designSystem === "clay" && "clay-input",
          designSystem === "looseleaf" && "ll-input",
          designSystem === "squid-game" && "border-primary/40 rounded-lg focus-visible:border-primary focus-visible:shadow-[0_0_15px_hsl(var(--primary)/0.35)] font-mono",
          designSystem === "minecraft" && "!rounded-none border-2 border-black bg-[#101010] text-[#ffff55] font-mono focus-visible:!outline-[#ffff55] focus-visible:!outline-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
