import { motion } from "framer-motion";
import { Calendar, Sparkles, Building2 } from "lucide-react";
import { experiences } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

// Devicon CDN mapping for technology logos
const TECH_ICONS = {
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "OOP": null,
  "Inheritance": null,
  "Polymorphism": null,
  "Abstraction": null,
};

export default function Experience() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  return (
    <section id="experience" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Sparkles size={13} />
            Career History
          </div>
          <h2
            className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Professional Experience.
          </h2>
          <p
            className={`mt-2 max-w-2xl text-sm sm:text-base ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Hands-on software development internships bridging academic theory with professional engineering best practices.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative ml-2 sm:ml-4 border-l-2 border-cyan-500/30 pl-5 sm:pl-10 space-y-10">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.role}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Pulsing Timeline Node — centered on border line */}
              <div className="absolute -left-[1px] -translate-x-1/2 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-950 shadow-md shadow-cyan-500/50">
                <span className={`h-2.5 w-2.5 rounded-full ${experience.current ? "bg-emerald-400 animate-ping" : "bg-cyan-400"}`} />
              </div>

              {/* Card */}
              <div
                className={`group rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                  isLight
                    ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
                    : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
                }`}
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    {experience.logo && (
                      <div className={`flex-shrink-0 h-14 w-14 rounded-2xl border overflow-hidden flex items-center justify-center p-1.5 transition group-hover:scale-105 ${
                        isLight
                          ? "border-slate-200 bg-white shadow-sm"
                          : "border-white/10 bg-white/10 backdrop-blur-sm"
                      }`}>
                        <img
                          src={experience.logo}
                          alt={experience.company}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3
                          className={`text-xl font-bold tracking-tight ${
                            isLight ? "text-slate-900" : "text-white"
                          }`}
                        >
                          {experience.role}
                        </h3>

                        {experience.current && (
                          <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-bold text-emerald-400 animate-pulse">
                            Active Role
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-cyan-400">
                        <Building2 size={15} />
                        {experience.company}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold ${
                      isLight
                        ? "border-slate-200 bg-slate-50 text-slate-600"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    <Calendar size={13} className="text-cyan-400" />
                    {experience.duration}
                  </div>
                </div>

                <p
                  className={`mt-4 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {experience.description}
                </p>

                {/* Tech badges */}
                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                  {experience.technologies.map((tech) => {
                    const iconUrl = TECH_ICONS[tech];
                    return (
                      <span
                        key={tech}
                        className={`group/chip inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition duration-200 ${
                          isLight
                            ? "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-sm"
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300"
                        }`}
                      >
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt={tech}
                            className={`object-contain transition group-hover/chip:scale-110 ${
                              tech === "Express.js" && !isLight ? "invert brightness-200" : ""
                            }`}
                            style={{ width: "16px", height: "16px" }}
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-4 w-4 items-center justify-center rounded bg-cyan-500/15 text-[9px] text-cyan-400 font-bold">
                            {tech.charAt(0)}
                          </span>
                        )}
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
