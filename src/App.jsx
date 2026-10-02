import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { ResumeProvider } from "./context/ResumeContext";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import BackgroundEffect from "./components/BackgroundEffect";
import CustomCursor from "./components/CustomCursor";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import ResumeSection from "./components/ResumeSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function AppContent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Preloader Splash Screen */}
      <AnimatePresence mode="wait">
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {/* Main Site — renders only after preloader finishes */}
      {!loading && (
        <div className="relative min-h-screen selection:bg-cyan-500/30">
          {/* Scroll Progress Bar at the top */}
          <ScrollProgress />

          {/* Smooth Trailing Mouse Dot Pointer */}
          <CustomCursor />

          {/* Dynamic Animated Ambient Background */}
          <BackgroundEffect />

          {/* Fixed Sticky Header with Theme & Download Controls */}
          <Navbar />

          {/* Main Portfolio Content Flow */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Achievements />
            <ResumeSection />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Screen Theme Change Switcher Button */}
          <ThemeToggle variant="floating" />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;
