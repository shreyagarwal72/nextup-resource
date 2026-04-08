import { GraduationCap, BookOpenCheck } from "lucide-react";
import { useStudyMode } from "@/hooks/useStudyMode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const StudyModeToggle = () => {
  const { isStudyMode, toggleStudyMode } = useStudyMode();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleStudyMode}
          className={`relative p-2 rounded-full border-2 border-foreground/80 transition-all duration-300 ease-bounce shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5 ${
            isStudyMode
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-foreground"
          }`}
          aria-label={isStudyMode ? "Exit Study Mode" : "Enter Study Mode"}
        >
          {isStudyMode ? (
            <BookOpenCheck className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
          )}
          {isStudyMode && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-tertiary border-2 border-foreground/80" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isStudyMode ? "Exit Study Mode" : "Study Mode"}</p>
      </TooltipContent>
    </Tooltip>
  );
};
