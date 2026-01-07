"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [bgPx, setBgPx] = useState({ x: 0, y: 0 });
  const [showCircle, setShowCircle] = useState(false);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const [logoMaskPx, setLogoMaskPx] = useState({ x: -9999, y: -9999 });

  const CIRCLE_DIAMETER = 220; // px

  const handleHeroMove = (e: any) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({ x, y });

    // compute pixel position relative to hero (for the visible circle)
    setBgPx({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // ensure circle is visible while moving
    setShowCircle(true);

    // compute pixel position relative to the logo wrapper (for the mask)
    if (logoWrapRef.current) {
      const lw = logoWrapRef.current.getBoundingClientRect();
      setLogoMaskPx({ x: e.clientX - lw.left, y: e.clientY - lw.top });
    }
  };

  const handleHeroLeave = () => {
    // hide the circle and clear mask when leaving the hero
    setShowCircle(false);
    setBgPos({ x: 50, y: 50 });
    setBgPx({ x: 0, y: 0 });
    setLogoMaskPx({ x: -9999, y: -9999 });
  };

  return (
    <div className={isDarkMode ? "min-h-screen bg-black pt-14" : "min-h-screen bg-white pt-14"}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full top-0 left-0 z-40 h-14 border-b ${isDarkMode ? "border-white border-opacity-10 bg-black" : "border-black border-opacity-10 bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <svg id="iD" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.89 841.89">
              <path d="M651.1,269.3c-24.79-44.07-60.2-78.36-106.19-102.88-46.01-24.51-99.58-36.78-160.73-36.78h-68.59v140.49h56.2c47.37,0,84.56,13.09,111.56,39.25,26.99,26.17,40.49,63.22,40.49,111.15s-13.51,84.02-40.49,109.91c-27,25.9-64.19,38.84-111.56,38.84h-56.2v-299.15h-161.97v442.12h230.56c60.6,0,113.9-12.52,159.91-37.6,45.99-25.06,81.53-59.63,106.6-103.71,25.06-44.07,37.6-94.21,37.6-150.4s-12.4-107.15-37.19-151.23Z" fill={isDarkMode ? "white" : "black"} />
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            <a href="#work" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>Work</a>
            <a href="#about" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>About</a>
            <a href="#contact" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>Contact</a>

            {/* Theme Toggle Switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-4 relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${isDarkMode ? "bg-white" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-black transition-transform ${isDarkMode ? "translate-x-7" : "translate-x-1"}`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50"
          >
            <div className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 ${isDarkMode ? "bg-white" : "bg-black"} transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? "border-t border-white border-opacity-10" : "border-t border-black border-opacity-10"}`}>
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#work" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>Work</a>
              <a href="#about" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>About</a>
              <a href="#contact" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>Contact</a>
              {/* Theme Toggle for Mobile */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`mt-2 relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${isDarkMode ? "bg-white" : "bg-gray-300"}`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-black transition-transform ${isDarkMode ? "translate-x-7" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className={`relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-20 overflow-hidden ${isDarkMode ? "bg-black" : "bg-white"}`}
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
        onMouseEnter={() => setShowCircle(true)}
      >
        {/* Solid circle that follows the cursor */}
        <div
          aria-hidden
          style={{
            display: showCircle ? "block" : "none",
            position: "absolute",
            left: `${bgPos.x}%`,
            top: `${bgPos.y}%`,
            width: `${CIRCLE_DIAMETER}px`,
            height: `${CIRCLE_DIAMETER}px`,
            transform: "translate(-50%, -50%)",
            background: "#B6FF00",
            borderRadius: "50%",
            pointerEvents: "none",
            transition: "none",
            mixBlendMode: "normal",
            zIndex: 0,
          }}
        />

        <div className="w-full text-center">
          {/* Logo Large (wrapper so overlay can align exactly) */}
          <div
            ref={logoWrapRef}
            className="mb-12 flex justify-center z-10 relative"
            // allow the wrapper to be full width so the SVG can responsively scale
            style={{ width: "100%", height: 240 }}
          >
            {/* Base text SVG - changes color based on theme */}
            <svg
              id="hero-text-base"
              className={isDarkMode ? "text-white" : "text-black"}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1400 240"
              preserveAspectRatio="xMidYMid meet"
              className="z-10 mx-auto block max-w-none"
              style={{ width: "min(1400px, 90vw)", height: "auto", color: isDarkMode ? "#fff" : "#000" }}
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Poppins-Bold, Poppins"
                fontSize="160"
                fontWeight={700}
                letterSpacing="-.02em"
                fill="currentColor"
              >
                iridesceDigital
              </text>
            </svg>

            {/* white overlay text, masked by circle position relative to this wrapper */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              style={{
                WebkitMask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 99%, transparent 100%)`,
                mask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 99%, transparent 100%)`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1400 240"
                preserveAspectRatio="xMidYMid meet"
                className="mx-auto block max-w-none"
                style={{ color: "#fff", width: "min(1400px, 90vw)", height: "auto" }}
              >
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="Poppins-Bold, Poppins"
                  fontSize="160"
                  fontWeight={700}
                  letterSpacing="-.02em"
                  fill="currentColor"
                  stroke="#fff"
                  strokeWidth={3}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  iridesceDigital
                </text>
              </svg>
            </div>
          </div>

          
        </div>
      </section>

      {/* Divider Line */}
      <div className={`border-t ${isDarkMode ? "border-white border-opacity-10" : "border-black border-opacity-10"}`}></div>

      {/* About Section (stacked: headline then secondary text) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-6 items-start">
          <div>
            <h2 
              className={`font-poppins font-700 text-3xl sm:text-4xl leading-tight ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 max-w-full md:max-w-[48ch]`}
            >
              iridesceDigital blurs the boundries between creative formats
            </h2>
          </div>

          <div className="w-full md:w-2/3 ml-auto">
            <p className={`font-poppins font-600 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-right`}>
              We offer Branding Strategy, Graphic Design, Web Development, Social Media Management, Content Creation, Videography, Photography
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}