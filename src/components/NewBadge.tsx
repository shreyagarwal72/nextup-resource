import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface NewBadgeProps {
  dateAdded?: string;
  className?: string;
}

const NewBadge = ({ dateAdded, className = "" }: NewBadgeProps) => {
  if (!dateAdded) return null;

  const addedDate = new Date(dateAdded);
  const now = new Date();
  const diffTime = now.getTime() - addedDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 7) return null;

  return (
    <Badge
      className={`bg-quaternary text-quaternary-foreground border-2 border-foreground/80 text-xs font-bold px-2 py-0.5 flex items-center gap-1 rounded-full ${className}`}
    >
      <Sparkles className="w-3 h-3" strokeWidth={2.5} />
      New
    </Badge>
  );
};

export default NewBadge;
