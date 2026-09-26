import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CopyLinkButtonProps {
  url: string;
  label?: string;
  className?: string;
}

const CopyLinkButton = ({ url, label = "Copy link", className = "" }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label={label}
      title={label}
      className={`bg-card px-3 text-xs ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>Copied</span>
        </>
      ) : (
        <>
          <Link2 className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>Copy</span>
        </>
      )}
    </Button>
  );
};

export default CopyLinkButton;
