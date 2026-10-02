import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Menu, X, Linkedin, Download, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useResume } from "../context/ResumeContext";
import { useTheme, THEMES } from "../context/ThemeContext";

const links = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Resume", id: "resume" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { downloadResume, resumeData } = useResume();
  const { theme } = useTheme();

  const isLight = theme === THEMES.LIGHT;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Top of page resets active section
      if (window.scrollY < 100) {
        setActiveSection("");
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        // Bottom of page activates contact section
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to detect which section is currently in view
  useEffect(() => {
    const sectionIds = ["home", ...links.map((link) => link.id)];
    const intersectingSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.set(entry.target.id, entry);
          } else {
            intersectingSections.delete(entry.target.id);
          }
        });

        // If at top of the page, hero ("home") is active
        if (window.scrollY < 100) {
          setActiveSection("");
          return;
        }

        if (intersectingSections.size === 0) return;

        // Find the visible section whose top is closest to the focal reading area (~100px)
        const visibleList = Array.from(intersectingSections.values());
        visibleList.sort((a, b) => {
          return (
            Math.abs(a.boundingClientRect.top - 100) -
            Math.abs(b.boundingClientRect.top - 100)
          );
        });

        const activeId = visibleList[0].target.id;
        setActiveSection(activeId === "home" ? "" : activeId);
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (id) => {
    setOpen(false);
    setActiveSection(id === "home" ? "" : id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-4 py-3 sm:px-6 transition-all duration-300">
      <div
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled
            ? isLight
              ? "border border-slate-200/90 bg-white/85 shadow-lg shadow-slate-200/50 backdrop-blur-xl"
              : "border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl"
            : isLight
            ? "border border-slate-200/60 bg-white/60 backdrop-blur-md"
            : "border border-white/5 bg-slate-950/40 backdrop-blur-md"
        }`}
      >
        {/* Left: Minimalist Brand Logo */}
        <button
          onClick={() => handleClick("home")}
          className="group flex items-center gap-2.5 transition active:scale-95"
          aria-label="Back to top"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 font-bold text-white text-xs shadow-md shadow-cyan-500/20 transition group-hover:scale-105">
            PD
          </div>
          <span
            className={`font-bold text-sm tracking-tight transition ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Padma<span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Dev</span>
          </span>
        </button>

        {/* Center: Refined Navigation Links (Clean Sentence Case) */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className={`relative rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? isLight
                      ? "text-cyan-700 font-bold"
                      : "text-cyan-400 font-bold"
                    : isLight
                    ? "text-slate-600 hover:bg-slate-100 hover:text-cyan-700"
                    : "text-slate-300 hover:bg-white/5 hover:text-cyan-400"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute bottom-0.5 left-2.5 right-2.5 h-0.5 rounded-full ${
                      isLight
                        ? "bg-cyan-600 shadow-sm shadow-cyan-600/30"
                        : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Social & Theme Switch */}
        <div className="hidden items-center gap-2.5 sm:flex">
          {/* Compact Theme Switcher */}
          <ThemeToggle variant="navbar" />

          {/* Social Links Divider */}
          <div className="flex items-center gap-1 border-l border-slate-300/40 dark:border-white/10 pl-2">
            <a
              href="https://github.com/padmalochanmohanty13-web"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className={`rounded-lg p-1.5 transition ${
                isLight
                  ? "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Github size={16} />
            </a>

            <a
              href="https://linkedin.com/in/padmalochan-mohanty"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className={`rounded-lg p-1.5 transition ${
                isLight
                  ? "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  : "text-slate-400 hover:bg-blue-400/10 hover:text-blue-400"
              }`}
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Direct Workable Download Resume Button */}
          <button
            onClick={downloadResume}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition duration-200 hover:scale-105 active:scale-95"
            title="Download active resume file"
          >
            <Download size={13} />
            <span>Resume</span>
            {resumeData.isCustom && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-300" title="Custom CV active" />
            )}
          </button>
        </div>

        {/* Mobile Hamburger & Quick Theme */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle variant="navbar" />

          <button
            onClick={() => setOpen(!open)}
            className={`rounded-xl border p-1.5 transition ${
              isLight
                ? "border-slate-200 bg-white text-slate-800"
                : "border-white/10 bg-white/5 text-white"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          className={`mx-auto mt-2 max-w-6xl rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl transition sm:hidden ${
            isLight
              ? "border-slate-200 bg-white/95 text-slate-900"
              : "border-white/10 bg-slate-950/95 text-white"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2 text-left text-xs font-semibold transition ${
                    isActive
                      ? isLight
                        ? "bg-cyan-50 font-bold text-cyan-700"
                        : "bg-cyan-500/10 font-bold text-cyan-400"
                      : isLight
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isLight
                          ? "bg-cyan-600"
                          : "bg-cyan-400 shadow-[0_0_6px_#22d3ee]"
                      }`}
                    />
                  )}
                </button>
              );
            })}

            <div className="mt-3 flex items-center justify-between border-t border-slate-200/50 dark:border-white/10 pt-3">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/padmalochanmohanty13-web"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-2 text-slate-400 hover:text-white"
                >
                  <Github size={17} />
                </a>
                <a
                  href="https://linkedin.com/in/padmalochan-mohanty"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg p-2 text-slate-400 hover:text-blue-400"
                >
                  <Linkedin size={17} />
                </a>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  downloadResume();
                }}
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-3.5 py-2 text-xs font-bold text-white shadow-md"
              >
                <Download size={14} /> Download Resume
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
