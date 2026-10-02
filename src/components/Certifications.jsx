import { useState } from "react";
import { createPortal } from "react-dom";
import { Award, Sparkles, CheckCircle2, Calendar, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "../data/portfolioData";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function Certifications() {
  const { theme } = useTheme();
  const isLight = theme === THEMES.LIGHT;
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <section className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Sparkles size={13} />
            Verified Credentials
          </div>
          <h2
            className={`text-3xl font-extrabold tracking-tight sm:text-5xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Certifications.
          </h2>
          <p
            className={`mt-2 max-w-2xl text-sm sm:text-base ${
              isLight ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Specialized courses and government-certified technical credentials from India's premier engineering institutes.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {certifications.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group flex flex-col rounded-3xl border backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 overflow-hidden ${
                isLight
                  ? "border-slate-200/80 bg-white/80 shadow-md hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10"
              }`}
            >
              {/* Certificate Image Preview */}
              {certificate.image && (
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setPreviewImage(certificate.image)}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="h-44 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                      <ZoomIn size={14} />
                      View Certificate
                    </span>
                  </div>

                  {/* Grade badge */}
                  {certificate.grade && (
                    <span
                      className={`absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-lg backdrop-blur-sm ${
                        certificate.grade === "Elite"
                          ? "bg-amber-500/90 text-white"
                          : "bg-emerald-500/90 text-white"
                      }`}
                    >
                      {certificate.grade}
                    </span>
                  )}
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 group-hover:scale-110 transition">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold leading-snug ${
                          isLight ? "text-slate-900" : "text-white"
                        }`}
                      >
                        {certificate.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-semibold text-cyan-400">
                        {certificate.organization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer with score & duration */}
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <CheckCircle2 size={13} />
                      {certificate.score || "Certified"}
                    </span>
                    {certificate.duration && (
                      <span className={`flex items-center gap-1 ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        <Calendar size={11} />
                        {certificate.duration}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">NPTEL · SWAYAM</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Certificate Image Preview Modal — portaled to body */}
      {createPortal(
        <AnimatePresence>
          {previewImage && (
            <div key="cert-modal">
              {/* Backdrop Layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                style={{ zIndex: 9997 }}
                onClick={() => setPreviewImage(null)}
              />

              {/* Image Layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 pointer-events-none"
                style={{ zIndex: 9998 }}
              >
                <img
                  src={previewImage}
                  alt="Certificate Preview"
                  className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl pointer-events-auto"
                />
              </motion.div>

              {/* Close Button — always on top */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                onClick={() => setPreviewImage(null)}
                className="fixed top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-sm transition hover:bg-white/30 hover:scale-110 cursor-pointer"
                style={{ zIndex: 9999 }}
                aria-label="Close preview"
              >
                <X size={22} />
              </motion.button>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
