import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme, THEMES } from "../context/ThemeContext";

/**
 * ScrollProgress Component
 * Fixed thin (3px) gradient progress bar at the top of the viewport (z-50)
 * Uses framer-motion useScroll and useSpring for smooth animated progression.
 */
export default function ScrollProgress() {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [percent, setPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const initialProgress = scrollYProgress.get();
    if (typeof initialProgress === "number" && !isNaN(initialProgress)) {
      setPercent(Math.round(initialProgress * 100));
    }

    const unsubscribe = scaleX.on("change", (latest) => {
      if (typeof latest === "number" && !isNaN(latest)) {
        setPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
      }
    });

    return () => unsubscribe();
  }, [scaleX, scrollYProgress]);

  const isLight = theme === THEMES.LIGHT;
  const isCosmic = theme === THEMES.COSMIC;

  const getGlowShadow = () => {
    if (isLight) {
      return "shadow-[0_1px_8px_rgba(6,182,212,0.45),0_1px_3px_rgba(59,130,246,0.35)]";
    }
    if (isCosmic) {
      return "shadow-[0_0_12px_rgba(168,85,247,0.7),0_0_20px_rgba(6,182,212,0.4)]";
    }
    return "shadow-[0_0_12px_rgba(6,182,212,0.75),0_0_20px_rgba(59,130,246,0.4)]";
  };

  const getBadgeStyle = () => {
    if (isLight) {
      return "border-slate-300/80 bg-white/95 text-slate-800 shadow-slate-300/50";
    }
    if (isCosmic) {
      return "border-purple-500/30 bg-purple-950/90 text-purple-200 shadow-purple-950/60";
    }
    return "border-cyan-500/30 bg-slate-950/90 text-cyan-300 shadow-cyan-950/60";
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none"
      aria-label="Page scroll progress"
    >
      <div
        className="group relative h-2.5 w-full pointer-events-auto cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Subtle ambient glow layer */}
        <motion.div
          className={`absolute top-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 blur-[2px] transition-[height] duration-200 group-hover:h-[4px] ${
            isLight ? "opacity-35" : "opacity-80"
          }`}
          style={{ scaleX, transformOrigin: "left" }}
          aria-hidden="true"
        />

        {/* Main 3px Gradient Progress Bar */}
        <motion.div
          className={`relative h-[3px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-[height] duration-200 group-hover:h-[4px] ${getGlowShadow()}`}
          style={{ scaleX, transformOrigin: "left" }}
        />
      </div>

      {/* Percentage Badge on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.92 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`fixed top-2.5 right-4 z-50 pointer-events-none flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-wide backdrop-blur-md border shadow-md ${getBadgeStyle()}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>{percent}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
