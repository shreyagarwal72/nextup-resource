import { ExternalLink, X, Globe, Tag } from "lucide-react";
import { AITool } from "@/data/aiTools";
import { useIsMobile } from "@/hooks/use-mobile";

interface AIToolBottomSheetProps {
  tool: AITool | null;
  open: boolean;
  onClose: () => void;
}

const AIToolBottomSheet = ({ tool, open, onClose }: AIToolBottomSheetProps) => {
  const isMobile = useIsMobile();

  if (!tool) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />

      <div
        className={`fixed z-50 transition-transform duration-500 ${
          isMobile ? "inset-x-0 bottom-0 rounded-t-3xl" : "inset-y-0 right-0 w-[420px] rounded-l-3xl"
        }`}
        style={{
          background: "hsl(var(--card))",
          border: "2px solid hsl(var(--foreground) / 0.8)",
          transform: open ? "translateY(0) translateX(0)" : isMobile ? "translateY(100%)" : "translateX(100%)",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "-8px 0 0px 0px hsl(var(--border))",
        }}
      >
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-foreground/20" />
          </div>
        )}

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop font-heading">
                {tool.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground font-heading">{tool.name}</h2>
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 bg-tertiary text-tertiary-foreground border-2 border-foreground/80">
                  <Tag className="w-3 h-3" strokeWidth={2.5} /> {tool.category}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-foreground/30 hover:bg-muted transition-colors">
              <X className="w-5 h-5 text-muted-foreground" strokeWidth={2.5} />
            </button>
          </div>

          <div className="h-0.5 bg-foreground/10" />

          <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-muted border-2 border-foreground/20">
            <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" strokeWidth={2.5} />
            <span className="text-sm text-muted-foreground truncate font-medium">{tool.url}</span>
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-bold bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-pop-active active:translate-x-0.5 active:translate-y-0.5 transition-all duration-300"
          >
            <ExternalLink className="w-4 h-4" strokeWidth={2.5} /> Visit {tool.name}
          </a>
        </div>
      </div>
    </>
  );
};

export default AIToolBottomSheet;
