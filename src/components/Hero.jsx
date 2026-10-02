import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Code2,
  Database,
  FileText,
} from "lucide-react";
import { personalInfo } from "../data/portfolioData";
import { useResume } from "../context/ResumeContext";
import { useTheme, THEMES } from "../context/ThemeContext";

const ROLES = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Web Application Builder",
];

export default function Hero() {
  const { downloadResume } = useResume();
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTyping = useCallback(() => {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      } else {
        setIsDeleting(true);
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % ROLES.length);
      }
    }
  }, [roleIndex, isDeleting, displayText]);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timerDelay = 100;

    if (!isDeleting && displayText === currentRole) {
      // Pause for 2 seconds after role is typed out
      timerDelay = 2000;
    } else if (isDeleting && displayText === "") {
      // Pause before typing next role
      timerDelay = 500;
    } else if (isDeleting) {
      // Deleting speed
      timerDelay = 50;
    } else {
      // Typing speed (short initial delay on empty string)
      timerDelay = displayText === "" ? 300 : 100;
    }

    const timer = setTimeout(() => {
      handleTyping();
    }, timerDelay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, handleTyping]);

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center min-h-[90vh] overflow-hidden pt-28 pb-12"
    >
      <div className="section-container relative z-10 w-full mx-auto">
        {/* Main 2-Column Hero Grid: Left Content, Right Balanced Profile */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Left Column: Intro, Badges & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-500 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for Opportunities & Internships
            </div>

            <p
              className={`text-xs sm:text-sm font-bold uppercase tracking-widest ${
                isLight ? "text-cyan-700" : "text-cyan-400"
              }`}
            >
              Hello, I'm
            </p>

            {/* Name */}
            <h1
              className={`mt-1.5 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Padmalochan{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
                Mohanty
              </span>
            </h1>

            {/* Role & Location pills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
              <span
                className={`inline-flex items-center min-h-[30px] rounded-xl border px-3 py-1 text-xs sm:text-sm font-bold ${
                  isLight
                    ? "border-slate-200 bg-slate-100 text-slate-800"
                    : "border-white/10 bg-white/5 text-slate-200"
                }`}
                aria-label={ROLES[roleIndex]}
              >
                <span>{displayText}</span>
                <span
                  className={`ml-0.5 inline-block font-semibold animate-cursor-blink ${
                    isLight ? "text-cyan-600" : "text-cyan-400"
                  }`}
                  aria-hidden="true"
                >
                  |
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <MapPin size={13} className="text-cyan-400" />
                {personalInfo.location}
              </span>
            </div>

            {/* Bio Tagline */}
            <p
              className={`mt-4 max-w-xl text-sm leading-relaxed sm:text-base ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {personalInfo.tagline} Experienced in building full-stack applications with React, Node.js, Express, MongoDB, and modern responsive UI engineering.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-105 active:scale-95"
              >
                Explore Projects
                <ArrowRight
                  size={15}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </a>

              {/* Workable Download Button */}
              <button
                onClick={downloadResume}
                className={`group flex items-center gap-2 rounded-xl border px-5 py-3 text-xs sm:text-sm font-bold transition duration-300 hover:scale-105 active:scale-95 ${
                  isLight
                    ? "border-slate-300 bg-white text-slate-800 shadow-sm hover:border-cyan-500 hover:text-cyan-600"
                    : "border-white/15 bg-white/5 text-white hover:border-cyan-400/40 hover:bg-white/10"
                }`}
                title="Download active resume"
              >
                <Download size={15} className="text-cyan-400 transition group-hover:-translate-y-0.5" />
                Download Resume
              </button>

              <a
                href="#resume"
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-3 text-xs font-semibold transition ${
                  isLight
                    ? "border-slate-200 text-slate-600 hover:bg-slate-100"
                    : "border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <FileText size={14} /> CV Center
              </a>
            </div>

            {/* Social Links & CGPA Pill */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className={`rounded-xl border p-2.5 transition ${
                    isLight
                      ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-400"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
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
                      ? "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-400 hover:text-blue-600"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-blue-400/30 hover:text-blue-400"
                  }`}
                >
                  <Linkedin size={17} />
                </a>
              </div>

              <div className="h-5 w-px bg-slate-300/30 dark:bg-white/10" />

              <div
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium ${
                  isLight
                    ? "border-slate-200 bg-white/80 text-slate-700"
                    : "border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                <span className="font-extrabold text-cyan-500">8.52 CGPA</span>
                <span className="text-slate-400">•</span>
                <span>B.Tech CSE</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Properly Sized, Balanced Circular Profile Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center p-4"
          >
            <div className="relative">
              {/* Soft Ambient Glow Ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-500/20 to-purple-500/25 blur-xl" />

              {/* Decorative Gradient Border */}
              <div className="relative rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500 shadow-2xl">
                <div
                  className={`h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 overflow-hidden rounded-full ${
                    isLight ? "bg-white" : "bg-slate-900"
                  }`}
                >
                  <img
                    src="/profile.jpeg"
                    alt="Padmalochan Mohanty"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Floating Badges with Safe Offsets */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className={`absolute -top-2 right-1 sm:-top-3 sm:right-2 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-xl ${
                  isLight
                    ? "border-slate-200 bg-white/95 text-slate-800"
                    : "border-cyan-400/30 bg-slate-950/90 text-white"
                }`}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-md bg-cyan-500/20 text-cyan-400 text-[10px]">
                  ⚛
                </span>
                <span>React.js</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className={`absolute -bottom-2 left-2 sm:-bottom-3 sm:left-3 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-xl ${
                  isLight
                    ? "border-slate-200 bg-white/95 text-slate-800"
                    : "border-emerald-400/30 bg-slate-950/90 text-white"
                }`}
              >
                <Database size={13} className="text-emerald-400" />
                <span>MongoDB</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                className={`absolute top-1/2 -left-5 sm:-left-8 -translate-y-1/2 flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold shadow-lg backdrop-blur-xl ${
                  isLight
                    ? "border-slate-200 bg-white/95 text-slate-800"
                    : "border-blue-400/30 bg-slate-950/90 text-white"
                }`}
              >
                <Code2 size={13} className="text-blue-400" />
                <span>Node & Express</span>
              </motion.div>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
