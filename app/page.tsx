"use client";

import { useState, useRef, useEffect } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [bgPx, setBgPx] = useState({ x: 0, y: 0 });
  const [showCircle, setShowCircle] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const [logoMaskPx, setLogoMaskPx] = useState({ x: -9999, y: -9999 });
  const [mobileActiveService, setMobileActiveService] = useState<string | null>(null);
  const serviceRefs = useRef<Map<string, HTMLElement>>(new Map());
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isServicesSectionVisible, setIsServicesSectionVisible] = useState(false);

  const CIRCLE_DIAMETER = 220; // px

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver for mobile scroll-based service selection
  useEffect(() => {
    if (!isMobile) return;

    // Observer for individual services
    const serviceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
            const serviceName = entry.target.getAttribute('data-service');
            if (serviceName) {
              setMobileActiveService(serviceName);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0.8,
      }
    );

    // Observer for the entire services section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsServicesSectionVisible(entry.isIntersecting);
          if (!entry.isIntersecting) {
            setMobileActiveService(null);
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0,
      }
    );

    serviceRefs.current.forEach((element) => {
      serviceObserver.observe(element);
    });

    if (servicesSectionRef.current) {
      sectionObserver.observe(servicesSectionRef.current);
    }

    return () => {
      serviceObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [isMobile]);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Convert to UK time (GMT/BST)
      const ukTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
      const hours = String(ukTime.getHours()).padStart(2, "0");
      const minutes = String(ukTime.getMinutes()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

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
    <div className={`${isDarkMode ? "bg-black" : "bg-white"} transition-colors duration-300`}>
      <div className={`min-h-screen pt-14 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full top-0 left-0 z-40 h-14 border-b transition-colors duration-300 ${isDarkMode ? "border-white border-opacity-10 bg-black" : "border-black border-opacity-10 bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <svg id="iD" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.89 841.89">
              <path d="M651.1,269.3c-24.79-44.07-60.2-78.36-106.19-102.88-46.01-24.51-99.58-36.78-160.73-36.78h-68.59v140.49h56.2c47.37,0,84.56,13.09,111.56,39.25,26.99,26.17,40.49,63.22,40.49,111.15s-13.51,84.02-40.49,109.91c-27,25.9-64.19,38.84-111.56,38.84h-56.2v-299.15h-161.97v442.12h230.56c60.6,0,113.9-12.52,159.91-37.6,45.99-25.06,81.53-59.63,106.6-103.71,25.06-44.07,37.6-94.21,37.6-150.4s-12.4-107.15-37.19-151.23Z" fill={isDarkMode ? "white" : "black"} />
            </svg>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 items-center">
            <a href="/work" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>Work</a>
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
              <a href="/work" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>Work</a>
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
        className={`relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-20 overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}
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
            zIndex: 0,
          }}
        />

        <div className="w-full text-center">
          {/* Logo Large (wrapper so overlay can align exactly) */}
          <div
            ref={logoWrapRef}
            className="mb-12 flex justify-center z-10 relative select-none"
            // allow the wrapper to be full width so the SVG can responsively scale
            style={{ width: "100%", height: 450, userSelect: "none", WebkitUserSelect: "none" }}
          >
            {/* Base logo SVG - changes color based on theme */}
            <svg
              id="hero-logo-base"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 795.28 160.75"
              preserveAspectRatio="xMidYMid meet"
              className="z-10 mx-auto block max-w-none"
              style={{ width: "min(1200px, 95vw)", height: "auto" }}
            >
              <path d="M509.05,35.93c-3.26-5.79-7.9-10.29-13.94-13.51-6.04-3.22-13.08-4.83-21.11-4.83h-9.01v18.45h7.38c6.22,0,11.1,1.72,14.65,5.15,3.54,3.44,5.32,8.3,5.32,14.6s-1.77,11.03-5.32,14.43c-3.55,3.4-8.43,5.1-14.65,5.1h-7.38v-39.28h-21.27v58.05h30.28c7.96,0,14.96-1.64,21-4.94,6.04-3.29,10.71-7.83,14-13.62,3.29-5.79,4.94-12.37,4.94-19.75s-1.63-14.07-4.88-19.86Z" fill={isDarkMode ? "#fff" : "#000"} />
              <text fontFamily="Poppins-Bold, Poppins" fontSize="110" fontWeight={700} letterSpacing="-.02em" x="4.51" y="93.77" fill={isDarkMode ? "#fff" : "#000"}>iridesce</text>
              <text fontFamily="Poppins-Bold, Poppins" fontSize="110" fontWeight={700} letterSpacing="-.05em" x="514.89" y="94.09" fill={isDarkMode ? "#fff" : "#000"}>igital</text>
            </svg>

            {/* white overlay logo, masked by circle position relative to this wrapper */}
            <div
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
              style={{
                WebkitMask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 100%, transparent 100%)`,
                mask: `radial-gradient(circle ${CIRCLE_DIAMETER / 2}px at ${logoMaskPx.x}px ${logoMaskPx.y}px, black 100%, transparent 100%)`,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 795.28 160.75"
                preserveAspectRatio="xMidYMid meet"
                className="mx-auto block max-w-none"
                style={{ width: "min(1200px, 95vw)", height: "auto" }}
              >
                <path d="M509.05,35.93c-3.26-5.79-7.9-10.29-13.94-13.51-6.04-3.22-13.08-4.83-21.11-4.83h-9.01v18.45h7.38c6.22,0,11.1,1.72,14.65,5.15,3.54,3.44,5.32,8.3,5.32,14.6s-1.77,11.03-5.32,14.43c-3.55,3.4-8.43,5.1-14.65,5.1h-7.38v-39.28h-21.27v58.05h30.28c7.96,0,14.96-1.64,21-4.94,6.04-3.29,10.71-7.83,14-13.62,3.29-5.79,4.94-12.37,4.94-19.75s-1.63-14.07-4.88-19.86Z" fill="#fff" stroke="#fff" strokeWidth="1" />
                <text fontFamily="Poppins-Bold, Poppins" fontSize="110" fontWeight={700} letterSpacing="-.02em" x="4.51" y="93.77" fill="#fff" stroke="#fff" strokeWidth="2">iridesce</text>
                <text fontFamily="Poppins-Bold, Poppins" fontSize="110" fontWeight={700} letterSpacing="-.05em" x="514.89" y="94.09" fill="#fff" stroke="#fff" strokeWidth="2">igital</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Footer Detail */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <div className="max-w-7xl w-full px-6 flex justify-between items-end">
            <div 
              className="text-xs font-light transition-colors duration-300"
              style={{ color: isDarkMode ? "#ffffff" : "#000000", opacity: 1 }}
            >
              <p style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>53.8008° N, 1.5491° W</p>
            </div>
            <div 
              className="text-xs font-light transition-colors duration-300"
              style={{ color: isDarkMode ? "#ffffff" : "#000000", opacity: 1 }}
            >
              <p style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>Est 2024</p>
            </div>
            <div 
              className="text-right text-xs font-light transition-colors duration-300"
              style={{ color: isDarkMode ? "#ffffff" : "#000000", opacity: 1 }}
            >
              {currentTime && <p style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{currentTime}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className={`border-t transition-colors duration-300 ${isDarkMode ? "border-white border-opacity-10" : "border-black border-opacity-10"}`}></div>

      {/* About Section (stacked: headline then secondary text) */}
      <section className={`max-w-7xl mx-auto px-6 py-20 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <div className="flex flex-col gap-6 items-start">
          <div>
            <h2 
              className={`font-poppins font-700 text-3xl sm:text-4xl leading-tight ${isDarkMode ? "text-white" : "text-black"} transition-all duration-300 max-w-full md:max-w-[48ch]`}
            >
              iridesceDigital blurs the boundries between creative formats
            </h2>
          </div>

          <div className="w-full md:w-2/3 ml-auto">
            <p className={`font-poppins font-600 text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed text-left`}>
              With over 10 years of expertise in graphic design, we've worked across diverse creative industries including music, DJ events, and brand development. Our experience spans branding strategy, web development, social media management, content creation, videography, and photography. We believe in crafting distinct and unique brand experiences that resonate with audiences and set our clients apart in crowded markets.
            </p>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className={`border-t transition-colors duration-300 ${isDarkMode ? "border-white border-opacity-10" : "border-black border-opacity-10"}`}></div>

      {/* Services Section */}
      <section 
        ref={servicesSectionRef}
        className={`max-w-7xl mx-auto px-6 py-20 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start min-h-96">
          {/* Left Column - Image (Desktop only) */}
          <div className="hidden md:flex items-center justify-center">
            {hoveredService && (
              <div className={`w-full h-64 md:h-80 rounded-lg overflow-hidden transition-opacity duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                <div className={`w-full h-full flex items-center justify-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {/* Placeholder for service image */}
                  <div className="text-center">
                    <p className="font-poppins text-lg font-600">{hoveredService}</p>
                    <p className="text-xs mt-2">Image</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Services List */}
          <div className="flex flex-col gap-4">
            {[
              "Branding Strategy",
              "Graphic Design",
              "Web Development",
              "Social Media Management",
              "Content Creation",
              "Videography",
              "Photography"
            ].map((service) => {
              const activeService = isMobile ? mobileActiveService : hoveredService;
              return (
                <div
                  key={service}
                  ref={(el) => {
                    if (el) serviceRefs.current.set(service, el);
                  }}
                  data-service={service}
                  onMouseEnter={() => !isMobile && setHoveredService(service)}
                  onMouseLeave={() => !isMobile && setHoveredService(null)}
                  className={`text-left font-poppins font-600 text-3xl md:text-4xl transition-opacity duration-300 cursor-pointer ${
                    activeService === service 
                      ? isDarkMode ? "text-white opacity-100" : "text-black opacity-100"
                      : isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {service}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Fixed Overlay Image */}
        {isMobile && mobileActiveService && isServicesSectionVisible && (
          <div
            className={`fixed bottom-6 right-6 z-50 w-44 h-44 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}
          >
            <div className={`w-full h-full flex items-center justify-center text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              <div className="text-center p-3">
                <p className="font-poppins text-base font-600 leading-tight">{mobileActiveService}</p>
                <p className="text-xs mt-1">Image</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}