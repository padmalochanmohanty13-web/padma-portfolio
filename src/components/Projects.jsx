import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  FolderGit2,
  ArrowUpRight,
  Info,
  X,
  Globe,
} from "lucide-react";
import { projects } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

/**
 * Individual Project Card with interactive 3D tilt and glare effect.
 * Tracks mouse movement relative to the card center to calculate subtle tilt angles (max 7 deg).
 * Smoothly resets to flat on mouse leave and renders a responsive radial gradient glare overlay.
 */
function ProjectCard({ project, index, isLight, onSelectProject }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      // Calculate normalized mouse coordinates relative to center (-1 to 1)
      const percentX = Math.max(-1, Math.min(1, (x - width / 2) / (width / 2)));
      const percentY = Math.max(-1, Math.min(1, (y - height / 2) / (height / 2)));

      // Subtle tilt angle: max 7 degrees (within 5-8 degrees range)
      const maxTilt = 7;
      const rotateX = (-percentY * maxTilt).toFixed(2);
      const rotateY = (percentX * maxTilt).toFixed(2);

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        cardRef.current.style.transition = "transform 0.08s ease-out, box-shadow 0.3s ease, border-color 0.3s ease";
      }

      // Update radial glare position to follow mouse coordinates
      if (glareRef.current) {
        const glareX = ((x / width) * 100).toFixed(1);
        const glareY = ((y / height) * 100).toFixed(1);
        const gradient = isLight
          ? `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45), rgba(6, 182, 212, 0.12) 35%, transparent 75%)`
          : `radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.14), rgba(6, 182, 212, 0.08) 35%, transparent 75%)`;
        glareRef.current.style.background = gradient;
        glareRef.current.style.opacity = "1";
      }
    });
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease";
    }
    if (glareRef.current) {
      glareRef.current.style.transition = "opacity 0.2s ease-out";
    }
  };

  const handleMouseLeave = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    // Smooth reset back to flat position
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, border-color 0.5s ease";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
      glareRef.current.style.transition = "opacity 0.4s ease-out";
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="h-full"
      style={{ perspective: 1000 }}
    >
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border backdrop-blur-xl ${
          isLight
            ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
            : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          willChange: "transform",
        }}
      >
        {/* Subtle Shine / Glare Effect Overlay */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-300"
        />

        {/* Card Top Banner Picture */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-950 sm:h-52">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-900/30 to-blue-900/40">
              <FolderGit2 className="text-cyan-400" size={32} />
            </div>
          )}

          {/* Gradient Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

          {/* Category Pill on Image */}
          <div className="absolute top-3.5 left-3.5">
            <span className="rounded-full bg-slate-950/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 backdrop-blur-md border border-cyan-400/30 shadow-md">
              {project.category}
            </span>
          </div>

          {/* Quick Action Link Pills on Image */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500 text-white shadow-md transition hover:scale-110"
                title="Open Live Website"
              >
                <Globe size={15} />
              </a>
            )}

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950/80 text-white border border-white/20 backdrop-blur-md shadow-md transition hover:scale-110 hover:border-cyan-400"
              title="View GitHub Code"
            >
              <Github size={15} />
            </a>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3
              className={`text-xl font-bold tracking-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              {project.title}
            </h3>

            <p
              className={`mt-2.5 text-xs sm:text-sm leading-relaxed line-clamp-3 ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {project.description}
            </p>

            {/* Feature checklist */}
            <div className="mt-4 space-y-1.5 border-t border-slate-200/50 dark:border-white/5 pt-3.5">
              {project.features.slice(0, 3).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs text-slate-400"
                >
                  <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-4">
            <button
              onClick={() => onSelectProject(project)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-500 hover:text-cyan-400 hover:underline"
            >
              <Info size={14} /> Full Details
            </button>

            {project.live && project.live !== "#" ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 text-xs font-bold text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} />
              </a>
            ) : (
              <span className="text-[11px] font-medium text-slate-500">
                GitHub Source
              </span>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    if (filter === "featured") return project.featured;
    if (filter === "mern") return project.category.toLowerCase().includes("mern");
    if (filter === "frontend") return project.category.toLowerCase().includes("frontend");
    return true;
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        {/* Header & Filter Controls */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <Sparkles size={13} />
              Portfolio Work
            </div>
            <h2
              className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Featured Applications.
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Real-world full-stack web applications and responsive frontend interfaces with live production deployments.
            </p>
          </div>

          {/* Filter Bar */}
          <div
            className={`flex flex-wrap gap-2 rounded-2xl border p-1.5 backdrop-blur-md ${
              isLight
                ? "border-slate-200 bg-slate-100/80 shadow-inner"
                : "border-white/10 bg-white/5"
            }`}
          >
            {[
              { id: "all", label: "All Work" },
              { id: "featured", label: "Featured" },
              { id: "mern", label: "MERN Stack" },
              { id: "frontend", label: "Frontend / React" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900 hover:bg-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Pictures */}
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isLight={isLight}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal — portaled to body */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div
              className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              style={{ zIndex: 9997 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
                  isLight ? "bg-white border-slate-200" : "bg-slate-950 border-white/10"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Image Header */}
                {selectedProject.image && (
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition hover:scale-110"
                      aria-label="Close project modal"
                    >
                      <X size={18} />
                    </button>
                    <div className="absolute bottom-4 left-6">
                      <span className="rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  {!selectedProject.image && (
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
                      aria-label="Close project modal"
                    >
                      <X size={20} />
                    </button>
                  )}

                  <h3
                    className={`text-2xl font-black ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {selectedProject.title}
                  </h3>

                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {selectedProject.description}
                  </p>

                  <div className="mt-6">
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isLight ? "text-slate-800" : "text-slate-300"
                      }`}
                    >
                      Key Features & Technical Capabilities
                    </h4>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedProject.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs text-slate-400"
                        >
                          <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {selectedProject.live && selectedProject.live !== "#" && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 py-3 text-xs font-bold text-white shadow-md shadow-cyan-500/25 transition hover:scale-102"
                      >
                        <ExternalLink size={15} /> Open Live Application
                      </a>
                    )}

                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-xs font-semibold ${
                        isLight
                          ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                          : "border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <Github size={16} /> GitHub Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
