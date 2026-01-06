"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [bgPx, setBgPx] = useState({ x: 0, y: 0 });
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

    // compute pixel position relative to the logo wrapper (for the mask)
    if (logoWrapRef.current) {
      const lw = logoWrapRef.current.getBoundingClientRect();
      setLogoMaskPx({ x: e.clientX - lw.left, y: e.clientY - lw.top });
    }
  };

  const handleHeroLeave = () => {
    setBgPos({ x: 50, y: 50 });
    setBgPx({ x: 0, y: 0 });
    setLogoMaskPx({ x: -9999, y: -9999 });
  };

  return (
    <div className="min-h-screen bg-white pt-14">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 left-0 z-40 h-14 border-b border-black border-opacity-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <svg id="iD" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.89 841.89">
              <path d="M651.1,269.3c-24.79-44.07-60.2-78.36-106.19-102.88-46.01-24.51-99.58-36.78-160.73-36.78h-68.59v140.49h56.2c47.37,0,84.56,13.09,111.56,39.25,26.99,26.17,40.49,63.22,40.49,111.15s-13.51,84.02-40.49,109.91c-27,25.9-64.19,38.84-111.56,38.84h-56.2v-299.15h-161.97v442.12h230.56c60.6,0,113.9-12.52,159.91-37.6,45.99-25.06,81.53-59.63,106.6-103.71,25.06-44.07,37.6-94.21,37.6-150.4s-12.4-107.15-37.19-151.23Z" fill="black" />
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            <a href="#work" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition duration-300">Work</a>
            <a href="#about" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition duration-300">About</a>
            <a href="#contact" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition duration-300">Contact</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 z-50"
          >
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-black border-opacity-10">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a href="#work" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition">Work</a>
              <a href="#about" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition">About</a>
              <a href="#contact" className="font-poppins text-sm font-600 text-black hover:opacity-60 transition">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-20"
        onMouseMove={handleHeroMove}
        onMouseLeave={handleHeroLeave}
      >
        {/* Solid circle that follows the cursor */}
        <div
          aria-hidden
          style={{
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

        <div className="max-w-4xl text-center">
          {/* Logo Large (wrapper so overlay can align exactly) */}
          <div ref={logoWrapRef} className="mb-12 flex justify-center z-10 relative" style={{ width: 120, height: 120 }}>
            <svg
              id="iD-hero"
              width="120"
              height="120"
              className="text-black z-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 841.89 841.89"
            >
              <path d="M651.1,269.3c-24.79-44.07-60.2-78.36-106.19-102.88-46.01-24.51-99.58-36.78-160.73-36.78h-68.59v140.49h56.2c47.37,0,84.56,13.09,111.56,39.25,26.99,26.17,40.49,63.22,40.49,111.15s-13.51,84.02-40.49,109.91c-27,25.9-64.19,38.84-111.56,38.84h-56.2v-299.15h-161.97v442.12h230.56c60.6,0,113.9-12.52,159.91-37.6,45.99-25.06,81.53-59.63,106.6-103.71,25.06-44.07,37.6-94.21,37.6-150.4s-12.4-107.15-37.19-151.23Z" fill="currentColor" />
            </svg>

            {/* white overlay svg, masked by circle position relative to this wrapper */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              style={{
                WebkitMask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 99%, transparent 100%)`,
                mask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 99%, transparent 100%)`,
              }}
            >
              <svg
                width="120"
                height="120"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 841.89 841.89"
                className="text-white"
                style={{ color: "#fff" }}
              >
                <path d="M651.1,269.3c-24.79-44.07-60.2-78.36-106.19-102.88-46.01-24.51-99.58-36.78-160.73-36.78h-68.59v140.49h56.2c47.37,0,84.56,13.09,111.56,39.25,26.99,26.17,40.49,63.22,40.49,111.15s-13.51,84.02-40.49,109.91c-27,25.9-64.19,38.84-111.56,38.84h-56.2v-299.15h-161.97v442.12h230.56c60.6,0,113.9-12.52,159.91-37.6,45.99-25.06,81.53-59.63,106.6-103.71,25.06-44.07,37.6-94.21,37.6-150.4s-12.4-107.15-37.19-151.23Z" fill="currentColor" stroke="#fff" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>

          
        </div>
      </section>

      {/* Divider Line */}
      <div className="border-t border-black border-opacity-10"></div>

      {/* About Section (stacked: headline then secondary text) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-6 items-start">
          <div>
            <h2 
              className="font-poppins font-700 text-3xl sm:text-4xl leading-tight text-black transition-all duration-300 hover:blur-sm"
            >
              iridesceDigital blurs the boundries between creative formats
            </h2>
          </div>

          <div className="w-full md:w-2/3 ml-auto">
            <p className="font-poppins font-600 text-lg text-gray-700 leading-relaxed text-right">
              We offer Branding Strategy, Graphic Design, Web Development, Social Media Management, Content Creation, Videography, Photography
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}