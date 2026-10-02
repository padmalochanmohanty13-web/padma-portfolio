import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useTheme, THEMES } from "../context/ThemeContext";

export default function CustomCursor() {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth, fluid spring physics for the solid dot to follow the arrow smoothly
  const springConfig = { damping: 28, stiffness: 280, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only run on devices with a mouse/pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkInteractive = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .clickable"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    checkInteractive();
    const observer = new MutationObserver(checkInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Solid dot styling matching the user's reference image
  const getDotStyle = () => {
    if (theme === THEMES.LIGHT) {
      return {
        bg: "bg-slate-900",
        shadow: "0 0 10px rgba(15, 23, 42, 0.4)",
      };
    }
    // Dark / Midnight Cyber / Cosmic: Clean solid glowing white/cream dot
    return {
      bg: "bg-white",
      shadow: "0 0 12px rgba(255, 255, 255, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)",
    };
  };

  const dotStyle = getDotStyle();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block overflow-hidden">
      {/* Single Smooth Solid Moving Dot (NO hollow circle) */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: dotStyle.shadow,
        }}
        animate={{
          scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={`fixed top-0 left-0 h-3.5 w-3.5 rounded-full ${dotStyle.bg} transition-colors duration-200`}
      />
    </div>
  );
}
