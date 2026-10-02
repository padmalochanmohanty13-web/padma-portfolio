import { CheckCircle2, Sparkles, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";
import { achievements } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function Achievements() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative overflow-hidden rounded-3xl border p-8 sm:p-12 backdrop-blur-xl ${
            isLight
              ? "border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50"
              : "border-white/10 bg-slate-900/60 shadow-2xl"
          }`}
        >
          {/* Subtle background ambient light */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">
              <Trophy size={13} />
              Key Strengths & Value
            </div>

            <h2
              className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              What I Bring To Engineering Teams.
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement}
                  className={`flex items-start gap-3.5 rounded-2xl border p-5 backdrop-blur-md transition duration-300 hover:border-cyan-400/30 ${
                    isLight
                      ? "border-slate-200 bg-slate-50/80 text-slate-800"
                      : "border-white/5 bg-white/[0.02] text-slate-200"
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
