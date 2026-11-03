import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { useDesignSystem } from "@/components/ThemeProvider";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const { designSystem } = useDesignSystem();
  return <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      designSystem === "clay" && "clay-switch",
      designSystem === "squid-game" && "data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_0_12px_hsl(var(--primary)/0.7)] data-[state=unchecked]:bg-secondary/40 border-primary/30",
      designSystem === "minecraft" && "!rounded-none border-2 border-black data-[state=checked]:!bg-[#ff5555] data-[state=unchecked]:!bg-[#373737]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        designSystem === "clay"
          ? "shadow-[var(--clay-shadow-control)]"
          : designSystem === "squid-game"
            ? "data-[state=checked]:bg-white data-[state=checked]:shadow-[0_0_8px_hsl(var(--primary))] data-[state=unchecked]:bg-secondary"
            : designSystem === "minecraft"
              ? "!rounded-none !bg-[#c6c6c6] border-2 border-black"
              : "shadow-lg",
      )}
    />
  </SwitchPrimitives.Root>;
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
