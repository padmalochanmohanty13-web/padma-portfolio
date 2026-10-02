import { GraduationCap, Sparkles, Award } from "lucide-react";
import { motion } from "framer-motion";
import { education } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function Education() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  return (
    <section id="education" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Sparkles size={13} />
            Academic Foundation
          </div>
          <h2
            className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Education & Qualifications.
          </h2>
          <p
            className={`mt-2 max-w-2xl text-sm sm:text-base ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Structured computer science education and foundational science background.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group flex flex-col justify-between rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 ${
                isLight
                  ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-400/20 shadow-sm group-hover:scale-110 transition">
                    <GraduationCap size={24} />
                  </div>
                  <span className="rounded-full bg-cyan-400/10 border border-cyan-400/20 px-3 py-0.5 text-xs font-bold text-cyan-400">
                    {item.status}
                  </span>
                </div>

                <h3
                  className={`mt-5 text-lg font-bold ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  {item.degree}
                </h3>

                <p
                  className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                    isLight ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {item.institution}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
                <span className="text-slate-500 font-medium">{item.board}</span>
                <span className="rounded-lg bg-cyan-500/10 px-2.5 py-1 font-bold text-cyan-400 border border-cyan-500/20">
                  {item.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
