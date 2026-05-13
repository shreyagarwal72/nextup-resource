import { useState } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X, Sparkles } from "lucide-react";

const Resourcly = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Bubble button — identical to original */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close Resourcly" : "Open Resourcly"}
        className="fixed z-[60] right-4 bottom-[5.5rem] md:bottom-6 w-14 h-14 rounded-full bg-primary text-primary-foreground border-2 border-foreground/80 shadow-pop hover:-translate-y-0.5 transition-transform flex items-center justify-center font-heading"
      >
        {open ? (
          <X className="w-6 h-6" strokeWidth={2.5} />
        ) : (
          <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
        )}
      </button>

      {/* Chat panel */}
      {open &&
        createPortal(
          <div className="fixed z-[59] right-4 bottom-[10.5rem] md:bottom-24 w-[min(360px,calc(100vw-2rem))] max-h-[70vh] bg-card border-2 border-foreground/80 rounded-2xl shadow-pop flex flex-col overflow-hidden font-body">
            {/* Header — identical to original */}
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-foreground/20 bg-tertiary text-tertiary-foreground">
              <div className="w-8 h-8 rounded-full bg-card border-2 border-foreground/80 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold font-heading leading-none">Resourcly</p>
                <p className="text-[10px] font-bold opacity-80">Your Nextup guide</p>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* ThinkStack iframe */}
            <iframe
              src="https://app.thinkstack.ai/bot/index.html?chatbot_id=6a049dd43d6f16778a17219b&type=inline"
              frameBorder="0"
              style={{
                flex: 1,
                border: "none",
                minHeight: "420px",
                width: "100%",
              }}
              allow="microphone"
            />
          </div>,
          document.body
        )}
    </>
  );
};

export default Resourcly;