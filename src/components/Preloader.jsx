import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader({ setLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const minDuration = 2000;
    let animationFrameId;
    let exitTimerId;
    let pageLoaded = document.readyState === "complete";

    const handleLoad = () => {
      pageLoaded = true;
    };

    if (!pageLoaded) {
      window.addEventListener("load", handleLoad);
    }

    const fallbackTimeout = setTimeout(() => {
      pageLoaded = true;
    }, 5000);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (!pageLoaded) {
        const currentPct = Math.min((elapsed / minDuration) * 88, 88);
        setProgress(currentPct);
        animationFrameId = requestAnimationFrame(step);
      } else {
        if (elapsed < minDuration) {
          const currentPct = Math.min((elapsed / minDuration) * 100, 99);
          setProgress(currentPct);
          animationFrameId = requestAnimationFrame(step);
        } else {
          setProgress(100);
          exitTimerId = setTimeout(() => {
            if (setLoading) setLoading(false);
          }, 200);
        }
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(exitTimerId);
      clearTimeout(fallbackTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, [setLoading]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
    >
      {/* Subtle ambient cyan glow */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Pulsing / Breathing Animated Logo */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* Breathing aura */}
        <motion.div
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [0.95, 1.1, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -inset-4 rounded-3xl bg-cyan-500/20 blur-xl"
        />

        {/* Logo and Brand Text */}
        <div className="relative flex items-center gap-3.5">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 font-extrabold text-white text-lg sm:text-xl shadow-xl shadow-cyan-500/25 border border-cyan-300/30">
            PD
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-white">Padma</span>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">
              Dev
            </span>
          </h1>
        </div>
      </motion.div>

      {/* Thin Loading Bar */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center">
        <div className="h-1 sm:h-1.5 w-56 sm:w-64 overflow-hidden rounded-full bg-slate-800/90 p-0 shadow-inner border border-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]"
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="mt-3 flex w-56 sm:w-64 items-center justify-between text-xs font-medium text-slate-400">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Loading
          </span>
          <span className="font-mono text-[11px] font-semibold text-cyan-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
