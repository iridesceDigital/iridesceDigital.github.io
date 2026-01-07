import React from "react";

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  return (
    <>
      {/* Divider Line */}
      <div className={`border-t transition-colors duration-300 ${isDarkMode ? "border-white border-opacity-10" : "border-black border-opacity-10"}`}></div>

      {/* Footer Section */}
      <footer className={`transition-colors duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Contact Details */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <p className={`font-poppins text-sm uppercase tracking-wide ${isDarkMode ? "text-gray-400" : "text-gray-500"} mb-4`}>
                  Get in Touch
                </p>
                <div className={`font-poppins font-600 text-3xl md:text-4xl ${isDarkMode ? "text-white" : "text-black"}`}>
                  <p>
                    <a 
                      href="tel:+447879146510" 
                      className={`${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}
                    >
                      +44 7879 146510
                    </a>
                  </p>
                  <p className="mt-6">
                    <a 
                      href="mailto:hello@iridesce.digital" 
                      className={`${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}
                    >
                      hello@iridesce.digital
                    </a>
                  </p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex gap-4 mt-auto">
                <a 
                  href="https://www.instagram.com/iridesce.digital/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}
                  aria-label="Instagram"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/iridescedigital/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${isDarkMode ? "text-white" : "text-black"} hover:opacity-60 transition duration-300`}
                  aria-label="LinkedIn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column - Image with Copyright */}
            <div className="flex flex-col items-end gap-8">
              <div className="w-full md:w-64 h-64 rounded-lg overflow-hidden">
                <img 
                  src="/images/footer-gradient.png" 
                  alt="Footer gradient" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`text-right font-poppins font-700 text-8xl md:text-9xl leading-none ${isDarkMode ? "text-white" : "text-black"}`}>
                © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;