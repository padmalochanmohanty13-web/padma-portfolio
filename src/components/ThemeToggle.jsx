import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sparkles, Sun, ChevronDown, Check } from "lucide-react";
import { useTheme, THEMES } from "../context/ThemeContext";

const THEME_OPTIONS = [
  {
    id: THEMES.MIDNIGHT,
    name: "Midnight Cyber",
    desc: "Electric Cyan & Navy Dark",
    icon: Moon,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: THEMES.COSMIC,
    name: "Cosmic Nebula",
    desc: "Galactic Purple & Violet",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: THEMES.LIGHT,
    name: "Crystal Light",
    desc: "Clean Luxe Day Theme",
    icon: Sun,
    color: "from-amber-400 to-sky-500",
  },
];

export default function ThemeToggle({ variant = "navbar" }) {
  const { theme, setTheme, cycleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const currentTheme = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];
  const CurrentIcon = currentTheme.icon;

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (variant === "floating") {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40" ref={menuRef}>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shadow-2xl border border-white/20 bg-slate-900/90 text-white backdrop-blur-xl transition hover:shadow-cyan-500/25"
            title="Change Screen Theme"
            aria-label="Change screen theme"
          >
            <CurrentIcon className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-16 right-0 w-60 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-2xl"
              >
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Switch Appearance
                </div>
                {THEME_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const active = theme === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTheme(item.id);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr ${item.color} text-white shadow-sm`}
                        >
                          <Icon size={14} />
                        </span>
                        <div>
                          <div className="font-medium text-xs text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-500">{item.desc}</div>
                        </div>
                      </div>
                      {active && <Check size={14} className="text-cyan-400" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Navbar variant
  return (
    <div className="relative inline-block" ref={menuRef}>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
        title={`Current Theme: ${currentTheme.name} (Click to switch)`}
        aria-label="Change screen look"
      >
        <CurrentIcon size={15} className="text-cyan-500" />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-2xl z-50"
          >
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Screen Theme
            </div>
            {THEME_OPTIONS.map((item) => {
              const Icon = item.icon;
              const active = theme === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTheme(item.id);
                    setMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                    active
                      ? "bg-white/10 text-white font-medium"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-tr ${item.color} text-white shadow-sm`}
                    >
                      <Icon size={13} />
                    </span>
                    <div>
                      <div className="font-medium text-slate-200">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.desc}</div>
                    </div>
                  </div>
                  {active && <Check size={14} className="text-cyan-400" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
