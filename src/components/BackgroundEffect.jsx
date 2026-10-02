import { useTheme, THEMES } from "../context/ThemeContext";

export default function BackgroundEffect() {
  const { theme } = useTheme();

  if (theme === THEMES.LIGHT) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">
        <div className="absolute inset-0 bg-[#f8fafc]" />
        {/* Soft Pearlescent Orbs */}
        <div className="absolute -top-[10%] left-[15%] h-[550px] w-[550px] rounded-full bg-sky-200/40 blur-[130px]" />
        <div className="absolute top-[40%] right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-200/35 blur-[140px]" />
        <div className="absolute -bottom-[10%] left-[25%] h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-[150px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>
    );
  }

  if (theme === THEMES.COSMIC) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">
        <div className="absolute inset-0 bg-[#090514]" />
        {/* Cosmic Nebula Orbs */}
        <div className="absolute -top-[15%] left-[10%] h-[600px] w-[600px] rounded-full bg-purple-600/18 blur-[150px] animate-pulse" />
        <div className="absolute top-[35%] right-[5%] h-[550px] w-[550px] rounded-full bg-pink-600/15 blur-[160px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[650px] w-[650px] rounded-full bg-violet-700/15 blur-[150px]" />
        {/* Star speckles & grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(192,132,252,0.12)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
      </div>
    );
  }

  // Midnight Cyber (Default)
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-700">
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Cyberpunk Glows */}
      <div className="absolute -top-[15%] left-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/12 blur-[150px]" />
      <div className="absolute top-[40%] right-[5%] h-[550px] w-[550px] rounded-full bg-blue-600/15 blur-[160px]" />
      <div className="absolute -bottom-[10%] left-[25%] h-[600px] w-[600px] rounded-full bg-emerald-500/8 blur-[160px]" />
      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
    </div>
  );
}
