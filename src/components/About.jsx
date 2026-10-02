import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import { useTheme, THEMES } from "../context/ThemeContext";

const highlights = [
  {
    icon: Code2,
    title: "Modern Frontend",
    subtitle: "React.js • Tailwind CSS • Responsive UI",
    text: "Crafting highly responsive, accessible, and fluid user interfaces with state management, animations, and component-driven architecture.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    subtitle: "Node.js • Express.js • REST APIs",
    text: "Building structured, modular backends with RESTful routes, error middleware, MVC architecture, and clean controller logic.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: Database,
    title: "Database Engineering",
    subtitle: "MongoDB • Mongoose • CRUD",
    text: "Modeling data schemas, optimizing queries, and handling scalable document-based storage for real-world application requirements.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Security & Auth",
    subtitle: "JWT • Bcrypt • Protected Routes",
    text: "Implementing robust token-based authentication, password hashing, role-based authorization, and secure API endpoints.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function About() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;

  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Sparkles size={13} />
            About Me
          </div>
          <h2
            className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Engineering With Purpose & Precision.
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr]">
          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col justify-between rounded-3xl border p-8 backdrop-blur-xl ${
              isLight
                ? "border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50"
                : "border-white/10 bg-slate-900/60 shadow-2xl"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Terminal size={20} />
                </div>
                <div>
                  <h3
                    className={`font-bold text-base ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    Computer Science Student & Engineer
                  </h3>
                  <p className="text-xs text-slate-500">
                    GIFT Autonomous College, Bhubaneswar
                  </p>
                </div>
              </div>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                I am a focused MERN Stack Developer with a solid foundation in
                Computer Science and software engineering principles. I
                specialize in building complete full-stack web applications
                where polished frontend design meets resilient backend logic.
              </p>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-300"
                }`}
              >
                Currently undergoing a comprehensive{" "}
                <strong>6-month MERN Stack Internship</strong> at Web_Bocket
                Software Pvt. Ltd., turning real-world specs into clean,
                responsive, and deployable web solutions.
              </p>

              <div
                className={`rounded-2xl border p-4 ${
                  isLight
                    ? "border-slate-200 bg-slate-50"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Key Strengths
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Problem Solving",
                    "Clean Code",
                    "RESTful Design",
                    "Rapid Prototyping",
                    "Object-Oriented Java",
                    "Database Optimization",
                  ].map((item) => (
                    <span
                      key={item}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                        isLight
                          ? "bg-white text-slate-700 border border-slate-200"
                          : "bg-white/5 text-slate-300 border border-white/10"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Based in Odisha, India
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
              >
                Get In Touch <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: Modern 4-Card Bento Highlights */}
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                    isLight
                      ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
                      : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-lg shadow-cyan-500/15 mb-4 group-hover:scale-110 transition duration-300`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3
                    className={`font-bold text-lg ${
                      isLight ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-cyan-400">
                    {item.subtitle}
                  </p>

                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      isLight ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
