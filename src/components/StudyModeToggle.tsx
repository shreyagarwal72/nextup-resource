import { GraduationCap, BookOpenCheck } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StudyModeToggleProps {
  variant?: "default" | "material3";
}

export const StudyModeToggle = ({ variant = "default" }: StudyModeToggleProps) => {
  const { isStudyMode, toggleStudyMode } = useStudyMode();

  if (variant === "material3") {
    return (
      <button
        onClick={toggleStudyMode}
        className="md3-tonal-button p-2 rounded-full relative"
        aria-label={isStudyMode ? "Exit Study Mode" : "Enter Study Mode"}
      >
        {isStudyMode ? (
          <BookOpenCheck className="w-5 h-5" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
        ) : (
          <GraduationCap className="w-5 h-5" />
        )}
        {isStudyMode && (
          <span 
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ background: "hsl(var(--md-sys-color-primary))" }}
          />
        )}
      </button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleStudyMode}
          className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-300 ease-apple-spring ${
            isStudyMode
              ? "bg-primary/20 text-primary glass-button border-primary/30"
              : "glass-button text-muted-foreground hover:text-foreground"
          }`}
          aria-label={isStudyMode ? "Exit Study Mode" : "Enter Study Mode"}
        >
          {isStudyMode ? (
            <BookOpenCheck className="h-5 w-5" />
          ) : (
            <GraduationCap className="h-5 w-5" />
          )}
          {isStudyMode && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isStudyMode ? "Exit Study Mode" : "Study Mode"}</p>
      </TooltipContent>
    </Tooltip>
  );
};
