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

  // Only show badge if added within the last 7 days
  if (diffDays > 7) return null;

  return (
    <Badge 
      className={`bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs font-semibold px-2 py-0.5 flex items-center gap-1 animate-pulse ${className}`}
    >
      <Sparkles className="w-3 h-3" />
      New
    </Badge>
  );
};

export default NewBadge;
