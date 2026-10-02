import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Upload,
  FileText,
  CheckCircle2,
  Eye,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  X,
  ExternalLink,
} from "lucide-react";
import { useResume } from "../context/ResumeContext";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function ResumeSection() {
  const {
    resumeData,
    downloadResume,
    uploadResume,
    resetResume,
    previewOpen,
    setPreviewOpen,
    notification,
  } = useResume();
  const { theme } = useTheme();
  const fileInputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isLight = theme === THEMES.LIGHT;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = async (file) => {
    try {
      setUploading(true);
      await uploadResume(file);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <section id="resume" className="section-padding relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <Sparkles size={13} />
              Career & Credentials
            </div>
            <h2 className={`text-3xl font-extrabold tracking-tight sm:text-4xl ${isLight ? "text-slate-900" : "text-white"}`}>
              Resume & CV Portal
            </h2>
            <p className={`mt-2 max-w-2xl text-sm sm:text-base ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              Instant one-click workable download, built-in document previewer, and an interactive future-ready resume upload system — all running 100% in-browser with zero backend dependencies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadResume}
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95"
            >
              <Download size={18} className="transition duration-300 group-hover:-translate-y-0.5" />
              Download Resume
            </button>

            <button
              onClick={() => setPreviewOpen(true)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                isLight
                  ? "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/30 hover:bg-white/10"
              }`}
            >
              <Eye size={17} />
              Preview CV
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 flex items-center gap-3 rounded-xl p-4 text-sm font-medium ${
              notification.type === "error"
                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                : notification.type === "info"
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            }`}
          >
            <CheckCircle2 size={18} />
            {notification.msg}
          </motion.div>
        )}

        {/* Main Grid: Current Resume Status + Future Upload Zone */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Active Resume Card & ATS Snapshot */}
          <div
            className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 backdrop-blur-xl ${
              isLight
                ? "border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50"
                : "border-white/10 bg-slate-900/60 shadow-2xl"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
                  <FileText size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Active Resume File
                    </span>
                    {resumeData.isCustom ? (
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                        Custom Uploaded
                      </span>
                    ) : (
                      <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                        Official CV
                      </span>
                    )}
                  </div>
                  <h3 className={`mt-1 text-lg font-bold truncate max-w-[260px] sm:max-w-xs ${isLight ? "text-slate-900" : "text-white"}`}>
                    {resumeData.name}
                  </h3>
                  <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                    {resumeData.size} • {resumeData.uploadDate}
                  </p>
                </div>
              </div>

              {resumeData.isCustom && (
                <button
                  onClick={resetResume}
                  title="Reset to default resume"
                  className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs transition ${
                    isLight
                      ? "border-slate-300 text-slate-600 hover:bg-slate-100"
                      : "border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <RotateCcw size={13} />
                  Reset
                </button>
              )}
            </div>

            {/* Resume Highlights Bento */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div
                className={`rounded-2xl border p-4 ${
                  isLight ? "border-slate-100 bg-slate-50" : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium">
                  <Briefcase size={14} /> Role Target
                </div>
                <div className={`mt-1.5 text-sm font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  MERN Developer
                </div>
                <div className={`text-[11px] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  Full-Stack Ready
                </div>
              </div>

              <div
                className={`rounded-2xl border p-4 ${
                  isLight ? "border-slate-100 bg-slate-50" : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-medium">
                  <GraduationCap size={14} /> Academics
                </div>
                <div className={`mt-1.5 text-sm font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  B.Tech CSE
                </div>
                <div className={`text-[11px] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  8.52 CGPA
                </div>
              </div>

              <div
                className={`col-span-2 sm:col-span-1 rounded-2xl border p-4 ${
                  isLight ? "border-slate-100 bg-slate-50" : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                  <ShieldCheck size={14} /> ATS Compatibility
                </div>
                <div className={`mt-1.5 text-sm font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                  98% Score
                </div>
                <div className={`text-[11px] ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  Keyword Optimized
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={downloadResume}
                className="flex items-center gap-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-4 py-2.5 text-xs font-semibold transition hover:bg-cyan-500 hover:text-white"
              >
                <Download size={14} /> Download File Direct
              </button>
              <button
                onClick={() => setPreviewOpen(true)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                  isLight
                    ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                    : "border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <Eye size={14} /> In-Browser Preview
              </button>
            </div>
          </div>

          {/* Right: Future Resume Upload Dropzone */}
          <div
            className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
              dragActive
                ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
                : isLight
                ? "border-slate-200/80 bg-white/80 shadow-xl shadow-slate-200/50"
                : "border-white/10 bg-slate-900/60 shadow-2xl"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Future-Ready Resume Upload
                </span>
                <span className="text-[11px] text-slate-500">Client-Side Safe</span>
              </div>
              <h3 className={`mt-2 text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                Upload Updated CV Anytime
              </h3>
              <p className={`mt-1 text-xs sm:text-sm ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Keep your portfolio always up to date. Drop a new PDF here to instantly update all download buttons across the portfolio with zero backend needed.
              </p>
            </div>

            {/* Drop target */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`group my-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
                dragActive
                  ? "border-cyan-400 bg-cyan-500/10"
                  : isLight
                  ? "border-slate-300 bg-slate-50 hover:border-cyan-500 hover:bg-cyan-50/50"
                  : "border-white/15 bg-white/[0.02] hover:border-cyan-400/50 hover:bg-white/[0.05]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-110">
                <Upload size={24} />
              </div>
              <p className={`mt-3 text-sm font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                {uploading ? "Processing resume..." : "Click or drag & drop new resume"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PDF format recommended (Max size: 8 MB)
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5 pt-3">
              <span>✓ Instant local caching</span>
              <span>✓ Zero server storage needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF / Resume Document Preview Modal — portaled to body */}
      {createPortal(
        <AnimatePresence>
          {previewOpen && (
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md" style={{ zIndex: 9997 }} onClick={() => setPreviewOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border shadow-2xl ${
                  isLight ? "bg-white border-slate-300" : "bg-slate-950 border-white/10"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="text-cyan-400" size={20} />
                    <div>
                      <h4 className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                        {resumeData.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">Live Document Preview</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={downloadResume}
                      className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-cyan-400"
                    >
                      <Download size={14} /> Download
                    </button>

                    <a
                      href={resumeData.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`rounded-xl p-2 transition ${
                        isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/10"
                      }`}
                      title="Open in new tab"
                    >
                      <ExternalLink size={18} />
                    </a>

                    <button
                      onClick={() => setPreviewOpen(false)}
                      className={`rounded-xl p-2 transition hover:scale-110 ${
                        isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Content: PDF viewer iframe */}
                <div className="relative flex-1 bg-slate-900/50">
                  <iframe
                    src={resumeData.url}
                    title="Resume Preview"
                    className="h-full w-full border-none"
                  />
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
