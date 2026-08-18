import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

/** Premium Spring physics presets */
export const springPresets = {
  bouncy: { type: "spring", stiffness: 400, damping: 15 },
  smooth: { type: "spring", stiffness: 260, damping: 20 },
  gentle: { type: "spring", stiffness: 180, damping: 22 },
  snappy: { type: "spring", stiffness: 500, damping: 28 },
};

/** Bouncy card wrapper with 3D tilt hover and spring feedback */
interface BouncyCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotate?: number;
}

export const BouncyCard = ({
  children,
  className = "",
  hoverScale = 1.03,
  hoverRotate = -1.2,
  ...props
}: BouncyCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        rotate: hoverRotate,
        y: -6,
        boxShadow: "10px 10px 0px 0px hsl(var(--border))",
      }}
      whileTap={{
        scale: 0.97,
        rotate: 0,
        y: 2,
        boxShadow: "2px 2px 0px 0px hsl(var(--border))",
      }}
      transition={springPresets.bouncy}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/** Bouncy Button wrapper for tactile spring feedback */
interface BouncyButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  className?: string;
}

export const BouncyButton = ({ children, className = "", ...props }: BouncyButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.94, y: 1 }}
      transition={springPresets.bouncy}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/** Staggered container for grid items / list items */
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Stagger Item for cards or elements within StaggerContainer */
export const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.95 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: springPresets.bouncy,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
