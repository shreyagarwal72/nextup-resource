import { useState } from "react";
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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed z-50 transition-transform duration-500 ${
          isMobile
            ? "inset-x-0 bottom-0 rounded-t-[28px]"
            : "inset-y-0 right-0 w-[420px] rounded-l-[28px]"
        }`}
        style={{
          background: "hsl(var(--md-sys-color-surface-container-low, var(--background)))",
          transform: open
            ? "translateY(0) translateX(0)"
            : isMobile
              ? "translateY(100%)"
              : "translateX(100%)",
          transitionTimingFunction: "cubic-bezier(0.05, 0.7, 0.1, 1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Drag handle (mobile) */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>
        )}

        <div className="p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
                style={{
                  background: "hsl(var(--md-sys-color-primary-container, var(--primary) / 0.1))",
                  color: "hsl(var(--md-sys-color-on-primary-container, var(--primary)))",
                }}
              >
                {tool.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{tool.name}</h2>
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full mt-1"
                  style={{
                    background: "hsl(var(--md-sys-color-secondary-container, var(--secondary)))",
                    color: "hsl(var(--md-sys-color-on-secondary-container, var(--secondary-foreground)))",
                  }}
                >
                  <Tag className="w-3 h-3" />
                  {tool.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Description */}
          <div>
            <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>

          {/* URL preview */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl"
            style={{ background: "hsl(var(--md-sys-color-surface-container, var(--muted)))" }}
          >
            <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <span className="text-sm text-muted-foreground truncate">{tool.url}</span>
          </div>

          {/* CTA */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold transition-all active:scale-95"
            style={{
              background: "hsl(var(--md-sys-color-primary, var(--primary)))",
              color: "hsl(var(--md-sys-color-on-primary, var(--primary-foreground)))",
              boxShadow: "0 4px 16px hsl(var(--md-sys-color-primary, var(--primary)) / 0.3)",
            }}
          >
            <ExternalLink className="w-4 h-4" />
            Visit {tool.name}
          </a>
        </div>
      </div>
    </>
  );
};

export default AIToolBottomSheet;
