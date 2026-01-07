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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Contact Details */}
            <div className="flex flex-col gap-6">
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