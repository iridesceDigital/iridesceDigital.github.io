"use client";

import { useState } from "react";
import Footer from "../../components/Footer";

// All available filter tags
const allTags = [
  "Branding Strategy",
  "Graphic Design",
  "Web Development",
  "Social Media Management",
  "Content Creation",
  "Videography",
  "Photography",
];

// Sample project data with descriptions and multiple tags
const projects = [
  { 
    id: 1, 
    name: "Sample Company 1", 
    description: "Complete brand overhaul including visual identity, website redesign, and social media presence for a leading tech startup.",
    tags: ["Branding Strategy", "Web Development", "Graphic Design"] 
  },
  { 
    id: 2, 
    name: "Sample Company 2", 
    description: "E-commerce platform development with integrated content management and product photography for a fashion retailer.",
    tags: ["Web Development", "Photography", "Content Creation"] 
  },
  { 
    id: 3, 
    name: "Sample Company 3", 
    description: "Social media campaign management and video content creation for a music festival's promotional materials.",
    tags: ["Social Media Management", "Videography", "Content Creation"] 
  },
  { 
    id: 4, 
    name: "Sample Company 4", 
    description: "Product photography and brand identity design for an artisan coffee roastery expanding their market presence.",
    tags: ["Photography", "Branding Strategy", "Graphic Design"] 
  },
  { 
    id: 5, 
    name: "Sample Company 5", 
    description: "Full-service brand identity package including logo design, brand guidelines, and website development.",
    tags: ["Graphic Design", "Branding Strategy", "Web Development"] 
  },
  { 
    id: 6, 
    name: "Sample Company 6", 
    description: "Promotional video production and photography for a new restaurant launch campaign.",
    tags: ["Videography", "Photography", "Social Media Management"] 
  },
  { 
    id: 7, 
    name: "Sample Company 7", 
    description: "Content strategy and social media management for a wellness brand looking to grow their online community.",
    tags: ["Content Creation", "Social Media Management", "Graphic Design"] 
  },
  { 
    id: 8, 
    name: "Sample Company 8", 
    description: "Website redesign and development with integrated booking system for a creative agency.",
    tags: ["Web Development", "Branding Strategy"] 
  },
];

export default function Work() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Toggle filter selection
  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Filter projects based on active filters
  const filteredProjects = activeFilters.length === 0
    ? projects
    : projects.filter((project) =>
        activeFilters.some((filter) => project.tags.includes(filter))
      );

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
              <a href="/#about" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>About</a>
              <a href="/#contact" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}>Contact</a>

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
            <div className={`md:hidden ${isDarkMode ? "border-t border-white border-opacity-10 bg-black" : "border-t border-black border-opacity-10 bg-white"}`}>
              <div className="px-6 py-4 flex flex-col gap-4">
                <a href="/work" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>Work</a>
                <a href="/#about" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>About</a>
                <a href="/#contact" className={`font-poppins text-sm font-600 ${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition`}>Contact</a>
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

        {/* Hero Header Section */}
        <section className={`relative min-h-[50vh] flex flex-col items-center justify-center px-6 py-20 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          <h1 
            className={`font-poppins font-700 text-7xl sm:text-8xl md:text-9xl leading-none select-none ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Work
          </h1>
        </section>

        {/* Divider Line */}
        <div className={`border-t transition-colors duration-300 ${isDarkMode ? "border-white border-opacity-10" : "border-black border-opacity-10"}`}></div>

        {/* Filter Section */}
        <section className={`max-w-7xl mx-auto px-6 py-8 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          <div className="flex flex-wrap gap-3 items-center">
            <span className={`font-poppins text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mr-2`}>Filter by:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={`font-poppins text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeFilters.includes(tag)
                    ? isDarkMode
                      ? "bg-white text-black border-white"
                      : "bg-black text-white border-black"
                    : isDarkMode
                      ? "bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white"
                      : "bg-transparent text-gray-600 border-gray-300 hover:border-black hover:text-black"
                }`}
              >
                {tag}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                onClick={clearFilters}
                className={`font-poppins text-xs px-4 py-2 ml-2 transition-opacity duration-300 ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
              >
                Clear all
              </button>
            )}
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className={`max-w-7xl mx-auto px-6 py-12 transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className={`group cursor-pointer transition-all duration-300`}
              >
                {/* Project Image */}
                <div className={`w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
                  <div className={`w-full h-full flex items-center justify-center ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
                    <div className="text-center">
                      <svg 
                        className="w-16 h-16 mx-auto mb-2 opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm opacity-50">Sample Image</p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-col gap-3">
                  <h3 className={`font-poppins font-600 text-2xl ${isDarkMode ? "text-white" : "text-black"} group-hover:opacity-60 transition-opacity duration-300`}>
                    {project.name}
                  </h3>
                  <p className={`font-poppins text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`font-poppins text-xs px-3 py-1 rounded-full ${isDarkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-600"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className={`text-center py-20 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              <p className="font-poppins text-lg">No projects found with the selected filters.</p>
              <button
                onClick={clearFilters}
                className={`font-poppins text-sm mt-4 underline ${isDarkMode ? "text-white" : "text-black"}`}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <Footer isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
