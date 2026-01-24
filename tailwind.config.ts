import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        glass: {
          DEFAULT: "hsl(var(--glass-bg))",
          heavy: "hsl(var(--glass-bg-heavy))",
          border: "hsl(var(--glass-border))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
        "3xl": "calc(var(--radius) + 16px)",
      },
      boxShadow: {
        glass: "0 8px 32px hsl(var(--glass-shadow)), inset 0 1px 1px hsl(0 0% 100% / 0.1)",
        "glass-lg": "0 12px 48px hsl(var(--glass-shadow)), inset 0 1px 2px hsl(0 0% 100% / 0.15)",
        "glass-xl": "0 24px 64px hsl(var(--glass-shadow)), inset 0 1px 2px hsl(0 0% 100% / 0.2)",
      },
      backdropBlur: {
        glass: "40px",
        "glass-heavy": "60px",
      },
      // iOS/macOS Timing Functions
      transitionTimingFunction: {
        // Apple's signature spring curve - bouncy, natural
        'apple-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        // macOS smooth ease - refined, elegant
        'apple-ease': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        // iOS decelerate - fast start, slow finish
        'apple-decelerate': 'cubic-bezier(0, 0, 0.2, 1)',
        // iOS accelerate - slow start, fast finish
        'apple-accelerate': 'cubic-bezier(0.4, 0, 1, 1)',
        // iOS standard - balanced motion
        'apple-standard': 'cubic-bezier(0.42, 0, 0.58, 1)',
        // macOS overshoot - subtle bounce past target
        'apple-overshoot': 'cubic-bezier(0.34, 1.3, 0.64, 1)',
        // iOS rubber-band - elastic feel
        'apple-rubber': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        // iOS-style fade with spring
        "ios-fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.96)" },
          "60%": { opacity: "1", transform: "translateY(-2px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "ios-fade-out": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-8px) scale(0.98)" },
        },
        // macOS scale with bounce
        "macos-scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "macos-scale-out": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.95)" },
        },
        // iOS spring pop
        "ios-pop": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "40%": { transform: "scale(1.08)" },
          "70%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        // macOS slide
        "macos-slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "70%": { transform: "translateY(-3px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "macos-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "70%": { transform: "translateY(3px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "macos-slide-left": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "70%": { transform: "translateX(-2px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "macos-slide-right": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "70%": { transform: "translateX(2px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        // iOS rubber band effect
        "ios-rubber-band": {
          "0%": { transform: "scale(1)" },
          "30%": { transform: "scale(1.15, 0.85)" },
          "40%": { transform: "scale(0.9, 1.1)" },
          "50%": { transform: "scale(1.05, 0.95)" },
          "65%": { transform: "scale(0.98, 1.02)" },
          "75%": { transform: "scale(1.02, 0.98)" },
          "100%": { transform: "scale(1)" },
        },
        // iOS pulse glow
        "ios-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        // iOS heart beat for favorites
        "ios-heartbeat": {
          "0%": { transform: "scale(1)" },
          "15%": { transform: "scale(1.25)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.15)" },
          "60%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
        // Float with iOS spring
        "ios-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
        // macOS smooth shimmer
        "macos-shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // iOS liquid blob - more organic
        "ios-blob": {
          "0%": { 
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
          },
          "25%": { 
            transform: "translate(50px, -30px) scale(1.1) rotate(45deg)",
            borderRadius: "60% 40% 30% 70% / 60% 40% 50% 40%"
          },
          "50%": { 
            transform: "translate(-20px, 40px) scale(0.95) rotate(90deg)",
            borderRadius: "50% 50% 60% 40% / 50% 60% 40% 50%"
          },
          "75%": { 
            transform: "translate(-40px, -20px) scale(1.05) rotate(135deg)",
            borderRadius: "40% 60% 50% 50% / 60% 40% 60% 40%"
          },
          "100%": { 
            transform: "translate(0, 0) scale(1) rotate(180deg)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%"
          }
        },
        // iOS button press
        "ios-press": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        // macOS window open
        "macos-window-open": {
          "0%": { opacity: "0", transform: "scale(0.85) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        // iOS notification slide
        "ios-notification": {
          "0%": { opacity: "0", transform: "translateY(-100%) scale(0.95)" },
          "50%": { transform: "translateY(5px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        // Breathing effect
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
        // Legacy keyframes with improved timing
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
      },
      animation: {
        // Accordion
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)",
        // iOS/macOS animations
        "ios-fade-in": "ios-fade-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "ios-fade-out": "ios-fade-out 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "macos-scale-in": "macos-scale-in 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "macos-scale-out": "macos-scale-out 0.25s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "ios-pop": "ios-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "macos-slide-up": "macos-slide-up 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "macos-slide-down": "macos-slide-down 0.5s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "macos-slide-left": "macos-slide-left 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "macos-slide-right": "macos-slide-right 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "ios-rubber-band": "ios-rubber-band 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ios-pulse": "ios-pulse 2s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        "ios-heartbeat": "ios-heartbeat 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ios-float": "ios-float 5s cubic-bezier(0.34, 1.3, 0.64, 1) infinite",
        "macos-shimmer": "macos-shimmer 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        "ios-blob": "ios-blob 15s cubic-bezier(0.42, 0, 0.58, 1) infinite",
        "ios-press": "ios-press 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "macos-window-open": "macos-window-open 0.4s cubic-bezier(0.34, 1.3, 0.64, 1) forwards",
        "ios-notification": "ios-notification 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "breathe": "breathe 4s cubic-bezier(0.42, 0, 0.58, 1) infinite",
        // Legacy with improved timing
        "fade-in": "fade-in 0.5s cubic-bezier(0.34, 1.3, 0.64, 1)",
        "scale-in": "scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        float: "float 6s cubic-bezier(0.42, 0, 0.58, 1) infinite",
        shimmer: "shimmer 3s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
        blob: "blob 8s cubic-bezier(0.42, 0, 0.58, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
