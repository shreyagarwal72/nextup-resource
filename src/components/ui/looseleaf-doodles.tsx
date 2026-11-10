import React from "react";
import { cn } from "@/lib/utils";

/**
 * Hand-drawn tape types, inspired by kevintngo/looseleaf.
 */
export type TapeVariant =
  | "masking"
  | "washi-stripes"
  | "washi-dots"
  | "washi-mint"
  | "washi-yellow"
  | "washi-pink"
  | "washi-blue"
  | "kraft"
  | "clear";

export type TapePosition =
  | "top-center"
  | "top-left"
  | "top-right"
  | "corner-left"
  | "corner-right"
  | "inline";

export interface TapeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TapeVariant;
  position?: TapePosition;
  tilt?: number; // degrees
  width?: number | string;
  height?: number | string;
}

export const Tape: React.FC<TapeProps> = ({
  variant = "masking",
  position = "top-center",
  tilt,
  width,
  height,
  className,
  style,
  ...props
}) => {
  const defaultTilt =
    tilt ??
    (position === "corner-left"
      ? -35
      : position === "corner-right"
      ? 35
      : position === "top-left"
      ? -2.5
      : position === "top-right"
      ? 3.2
      : -1.2);

  const posClass =
    position === "top-center"
      ? "absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      : position === "top-left"
      ? "absolute -top-3 left-6 z-20 pointer-events-none"
      : position === "top-right"
      ? "absolute -top-3 right-6 z-20 pointer-events-none"
      : position === "corner-left"
      ? "absolute -top-2 -left-6 z-20 pointer-events-none"
      : position === "corner-right"
      ? "absolute -top-2 -right-6 z-20 pointer-events-none"
      : "relative inline-block";

  return (
    <div
      aria-hidden="true"
      data-slot="tape"
      data-variant={variant}
      className={cn("ll-tape", `ll-tape-${variant}`, posClass, className)}
      style={{
        transform:
          position === "top-center"
            ? `translateX(-50%) rotate(${defaultTilt}deg)`
            : `rotate(${defaultTilt}deg)`,
        width: width ?? (position.startsWith("corner") ? "70px" : "80px"),
        height: height ?? "22px",
        ...style,
      }}
      {...props}
    />
  );
};

/**
 * Hand-drawn Pushpin / Thumbtack SVG pinned into paper.
 */
export const Pushpin: React.FC<{
  color?: "red" | "blue" | "yellow" | "green";
  className?: string;
  style?: React.CSSProperties;
}> = ({ color = "red", className, style }) => {
  const pinColors = {
    red: { fill: "#dc2626", highlight: "#f87171", shadow: "#991b1b" },
    blue: { fill: "#2563eb", highlight: "#60a5fa", shadow: "#1e40af" },
    yellow: { fill: "#eab308", highlight: "#fde047", shadow: "#a16207" },
    green: { fill: "#16a34a", highlight: "#4ade80", shadow: "#166534" },
  };

  const { fill, highlight, shadow } = pinColors[color];

  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none drop-shadow-sm select-none", className)}
      style={style}
      aria-hidden="true"
    >
      {/* Metal needle tip */}
      <path
        d="M13.5 16L12 30L15.5 16"
        stroke="#4a423b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pin shadow */}
      <ellipse cx="14" cy="15" rx="7" ry="2.5" fill="rgba(42,36,32,0.25)" />
      {/* Lower rim */}
      <path
        d="M7 14C7 11.5 9 10 14 10C19 10 21 11.5 21 14C21 16.5 19 17 14 17C9 17 7 16.5 7 14Z"
        fill={shadow}
        stroke="#2a2420"
        strokeWidth="1.8"
      />
      {/* Waist */}
      <path
        d="M10 10C10 7.5 11 5 14 5C17 5 18 7.5 18 10Z"
        fill={fill}
        stroke="#2a2420"
        strokeWidth="1.8"
      />
      {/* Top bulb / head */}
      <circle
        cx="14"
        cy="5.5"
        r="4.5"
        fill={fill}
        stroke="#2a2420"
        strokeWidth="1.8"
      />
      {/* Light glint */}
      <ellipse cx="12.5" cy="4" rx="1.5" ry="1" fill={highlight} opacity="0.9" />
    </svg>
  );
};

/**
 * Hand-drawn Wire Paperclip SVG slipping over a card edge.
 */
export const Paperclip: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className, style }) => {
  return (
    <svg
      width="24"
      height="44"
      viewBox="0 0 24 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none drop-shadow-sm select-none", className)}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M8 12V32C8 35.5 10 38 13 38C16 38 18 35.5 18 32V6C18 3.5 15.5 2 12.5 2C9.5 2 6 3.5 6 7V35C6 39.5 9.5 42 14 42C18.5 42 22 39.5 22 34V14"
        stroke="#5a554e"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12V32C8 35.5 10 38 13 38C16 38 18 35.5 18 32V6C18 3.5 15.5 2 12.5 2C9.5 2 6 3.5 6 7V35C6 39.5 9.5 42 14 42C18.5 42 22 39.5 22 34V14"
        stroke="#8e887f"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 3 Binder Ring Punch Holes along the left edge of a notebook sheet.
 */
export const NotebookHoles: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute left-3 inset-y-0 flex flex-col justify-between py-8 pointer-events-none z-10",
        className
      )}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3.5 h-3.5 rounded-full border border-foreground/60 bg-background shadow-[inset_0_1.5px_2.5px_rgba(0,0,0,0.4)]"
        />
      ))}
    </div>
  );
};

/**
 * Hand-drawn rubber stamp badge (e.g. "RECOMMENDED", "CURATED", "DEFAULT", "VERIFIED").
 */
export const RubberStamp: React.FC<{
  text: string;
  color?: "red" | "green" | "marker" | "blue";
  tilt?: number;
  className?: string;
}> = ({ text, color = "red", tilt = -4, className }) => {
  const colorMap = {
    red: "text-red-700 border-red-700/80 bg-red-100/40 dark:text-red-400 dark:border-red-400/80",
    green: "text-emerald-700 border-emerald-700/80 bg-emerald-100/40 dark:text-emerald-400 dark:border-emerald-400/80",
    marker: "text-orange-700 border-orange-700/80 bg-orange-100/40 dark:text-orange-400 dark:border-orange-400/80",
    blue: "text-blue-700 border-blue-700/80 bg-blue-100/40 dark:text-blue-400 dark:border-blue-400/80",
  };

  return (
    <div
      data-slot="stamp"
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider select-none border-2 rounded border-dashed opacity-90",
        colorMap[color],
        className
      )}
      style={{
        transform: `rotate(${tilt}deg)`,
        borderRadius: "6px 2px 5px 3px / 2px 6px 3px 5px",
      }}
    >
      <span>★</span>
      <span>{text}</span>
      <span>★</span>
    </div>
  );
};

/**
 * Hand-drawn marker highlighter swipe behind text.
 */
export const Highlighter: React.FC<{
  children: React.ReactNode;
  color?: "yellow" | "pink" | "green" | "blue";
  className?: string;
}> = ({ children, color = "yellow", className }) => {
  const bgColors = {
    yellow: "bg-[#fef08a]/85 dark:bg-[#ca8a04]/40 text-foreground",
    pink: "bg-[#fbcfe8]/85 dark:bg-[#db2777]/40 text-foreground",
    green: "bg-[#bbf7d0]/85 dark:bg-[#16a34a]/40 text-foreground",
    blue: "bg-[#bae6fd]/85 dark:bg-[#0284c7]/40 text-foreground",
  };

  return (
    <span
      className={cn(
        "relative inline px-1 py-0.5 rounded-sm font-semibold box-decoration-clone",
        bgColors[color],
        className
      )}
      style={{
        borderRadius: "4px 8px 3px 6px / 6px 3px 7px 4px",
      }}
    >
      {children}
    </span>
  );
};

/**
 * Hand-drawn organic Arrow SVG.
 */
export const DoodleArrow: React.FC<{
  direction?: "right" | "down-right" | "curved-down" | "up-right";
  className?: string;
  strokeWidth?: number;
  color?: string;
}> = ({ direction = "right", className, strokeWidth = 2, color = "currentColor" }) => {
  if (direction === "down-right") {
    return (
      <svg
        width="38"
        height="32"
        viewBox="0 0 38 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("pointer-events-none select-none", className)}
        aria-hidden="true"
      >
        <path
          d="M3 6C12 5 28 8 32 26"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="0.5 0.5"
        />
        <path
          d="M23 23L32 26L34 16"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (direction === "curved-down") {
    return (
      <svg
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("pointer-events-none select-none", className)}
        aria-hidden="true"
      >
        <path
          d="M6 3C18 8 26 20 18 34"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M12 28L18 34L26 31"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Default "right" or "up-right"
  return (
    <svg
      width="36"
      height="22"
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <path
        d="M2 12C10 11 24 10 32 11"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M25 4L33 11L24 18"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Hand-drawn 5-point sketch star.
 */
export const DoodleStar: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className, color = "currentColor", size = 20 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none inline-block", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2.5L14.8 8.8L21.5 9.4L16.4 13.9L18 20.5L12.2 17L6.4 20.5L8 13.9L2.8 9.4L9.5 8.8L12 2.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Hand-drawn wobbly circle or oval wrapping around text or an icon.
 */
export const DoodleCircle: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className, color = "currentColor" }) => {
  return (
    <span className={cn("relative inline-block px-1", className)}>
      {children}
      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none select-none"
        aria-hidden="true"
      >
        <path
          d="M12 22C10 10 26 4 52 4C82 4 96 12 94 24C92 34 72 38 46 37C20 36 6 30 7 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

/**
 * Hand-drawn squiggly underline.
 */
export const DoodleUnderline: React.FC<{
  children: React.ReactNode;
  className?: string;
  color?: string;
}> = ({ children, className, color = "#df6b3c" }) => {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 -bottom-2 w-full h-3 pointer-events-none select-none"
        aria-hidden="true"
      >
        <path
          d="M2 7C14 2 26 11 38 7C50 3 62 10 74 6C86 2 98 9 110 5C114 4 118 6 119 7"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

/**
 * Full Looseleaf Notebook Page Box component with ruled lines, red margin line, and binder punch holes.
 */
export const PageBox: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    tapeVariant?: TapeVariant;
    showHoles?: boolean;
  }
> = ({
  children,
  className,
  tapeVariant = "masking",
  showHoles = true,
  ...props
}) => {
  return (
    <div
      data-slot="page-box"
      className={cn("ll-page relative p-6 sm:p-8", className)}
      {...props}
    >
      <Tape variant={tapeVariant} position="top-center" width={88} height={24} />
      {showHoles && <NotebookHoles />}
      {children}
    </div>
  );
};

/**
 * Post-it style Sticky Note container.
 */
export const StickyNote: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    color?: "yellow" | "pink" | "mint" | "cyan";
    tilt?: number;
    pinColor?: "red" | "blue" | "yellow" | "green";
  }
> = ({
  children,
  color = "yellow",
  tilt = -1.8,
  pinColor = "red",
  className,
  style,
  ...props
}) => {
  const colorMap = {
    yellow: "bg-[#fef08a] text-[#2a2420]",
    pink: "bg-[#fbcfe8] text-[#2a2420]",
    mint: "bg-[#bbf7d0] text-[#2a2420]",
    cyan: "bg-[#bae6fd] text-[#2a2420]",
  };

  return (
    <div
      data-slot="sticky-note"
      className={cn(
        "ll-sticky relative p-5 border-2 border-foreground/80 shadow-pop-soft",
        colorMap[color],
        className
      )}
      style={{
        transform: `rotate(${tilt}deg)`,
        ...style,
      }}
      {...props}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <Pushpin color={pinColor} />
      </div>
      {children}
    </div>
  );
};
