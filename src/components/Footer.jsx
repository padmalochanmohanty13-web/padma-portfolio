import { Github, Linkedin, Mail, ArrowUp, Heart, Sparkles } from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isLight ? "border-slate-200 bg-white/60" : "border-white/5 bg-slate-950/40"
      }`}
    >
      <div className="section-container flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Brand info */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 font-bold text-white text-xs">
              PD
            </div>
            <h3
              className={`font-bold text-base ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Padma<span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Dev</span>
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            MERN Stack Developer • Building modern web applications with clean code.
          </p>
        </div>

        {/* Right: Social & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={`rounded-xl border p-2.5 transition ${
              isLight
                ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Github size={17} />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={`rounded-xl border p-2.5 transition ${
              isLight
                ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                : "border-white/10 text-slate-400 hover:border-blue-400/30 hover:bg-blue-400/10 hover:text-blue-400"
            }`}
          >
            <Linkedin size={17} />
          </a>

          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send direct email"
            className={`rounded-xl border p-2.5 transition ${
              isLight
                ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-cyan-600"
                : "border-white/10 text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-400"
            }`}
          >
            <Mail size={17} />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`rounded-xl border p-2.5 transition ${
              isLight
                ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                : "border-white/10 text-slate-400 hover:border-white/20 hover:bg-white/5 hover:text-white"
            }`}
            title="Scroll to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>

      <div
        className={`border-t py-6 text-center text-xs ${
          isLight ? "border-slate-200 text-slate-500" : "border-white/5 text-slate-500"
        }`}
      >
        © {new Date().getFullYear()} PadmaDev. Built with React & Tailwind CSS. Designed for high performance with zero backend.
      </div>
    </footer>
  );
}
