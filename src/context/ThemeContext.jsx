import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const THEMES = {
  MIDNIGHT: "midnight", // Dark Cyberpunk / Navy & Electric Cyan
  COSMIC: "cosmic",     // Galactic Purple & Pink Nebula
  LIGHT: "light",       // Modern Crisp Frost & Luxury Light
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("padma_portfolio_theme");
      if (saved && Object.values(THEMES).includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return THEMES.MIDNIGHT;
  });

  useEffect(() => {
    try {
      localStorage.setItem("padma_portfolio_theme", theme);
    } catch {
      // ignore storage error
    }

    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    if (theme === THEMES.LIGHT) {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === THEMES.MIDNIGHT) return THEMES.COSMIC;
      if (prev === THEMES.COSMIC) return THEMES.LIGHT;
      return THEMES.MIDNIGHT;
    });
  };

  const isDark = theme !== THEMES.LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
