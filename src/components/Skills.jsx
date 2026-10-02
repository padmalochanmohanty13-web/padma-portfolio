import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Layers,
  Server,
  Database,
  Shield,
  Wrench,
  Cpu,
  Sparkles,
} from "lucide-react";
import { skills } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

const CATEGORY_ICONS = {
  Languages: Code,
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  "APIs & Authentication": Shield,
  Tools: Wrench,
  "Core Concepts": Cpu,
};

// Devicon CDN mapping for actual technology logos
const SKILL_ICONS = {
  // Languages
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Python (Basic)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",

  // Frontend
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Bootstrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",

  // Backend
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",

  // Database
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",

  // APIs & Auth
  "REST APIs": null,
  "JWT Authentication": null,

  // Tools
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",

  // Core Concepts
  "Data Structures": null,
  "CRUD Operations": null,
  "MVC Architecture": null,
  "Responsive Design": null,
};

export default function Skills() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;
  const [activeTab, setActiveTab] = useState("All");

  const categories = Object.keys(skills);

  const filteredCategories =
    activeTab === "All"
      ? categories
      : categories.filter((cat) => cat === activeTab);

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <Sparkles size={13} />
              Core Competencies
            </div>
            <h2
              className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              Technical Arsenal.
            </h2>
            <p
              className={`mt-2 max-w-2xl text-sm sm:text-base ${
                isLight ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Languages, libraries, frameworks, and developer workflows I leverage to build robust full-stack applications.
            </p>
          </div>

          {/* Filter Pills */}
          <div
            className={`flex flex-wrap gap-1.5 rounded-2xl border p-1.5 backdrop-blur-md ${
              isLight
                ? "border-slate-200 bg-slate-100/80 shadow-inner"
                : "border-white/10 bg-white/5"
            }`}
          >
            <button
              onClick={() => setActiveTab("All")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "All"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : isLight
                  ? "text-slate-600 hover:text-slate-900 hover:bg-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All Skills
            </button>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === cat
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : isLight
                    ? "text-slate-600 hover:text-slate-900 hover:bg-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category, index) => {
            const items = skills[category] || [];
            const IconComponent = CATEGORY_ICONS[category] || Code;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                  isLight
                    ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
                    : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
                }`}
              >
                {/* Accent glow corner */}
                <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20 transition duration-500" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/20 shadow-sm group-hover:scale-105 transition">
                    <IconComponent size={20} />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-base ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {category}
                    </h3>
                    <p className="text-[11px] text-slate-500">{items.length} Technologies</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill) => {
                    const iconUrl = SKILL_ICONS[skill];

                    return (
                      <span
                        key={skill}
                        className={`group/chip inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition duration-200 ${
                          isLight
                            ? "border-slate-200 bg-slate-50 text-slate-700 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-md hover:shadow-cyan-500/10"
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-md hover:shadow-cyan-500/10"
                        }`}
                      >
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt={skill}
                            className={`h-4.5 w-4.5 object-contain transition group-hover/chip:scale-110 ${
                              // Invert Express.js & GitHub logos in dark mode for visibility
                              (skill === "Express.js" || skill === "GitHub") && !isLight
                                ? "invert brightness-200"
                                : ""
                            }`}
                            style={{ width: "18px", height: "18px" }}
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-md bg-cyan-500/15 text-[10px] text-cyan-400 font-bold">
                            {skill.charAt(0)}
                          </span>
                        )}
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
