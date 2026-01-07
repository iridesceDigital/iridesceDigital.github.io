import React from "react";

const SideScroller = () => {
  const sampleLogos = [
    "/logos/Lamda.svg",
    "/logos/LoyerSur.svg",
    "/logos/MbM.svg",
    "/logos/Sequel.svg",
  ];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="relative w-full">
        <div className="flex gap-12 animate-scroll">
          {sampleLogos.concat(sampleLogos).map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ 
                minWidth: "200px", 
                height: "80px",
                backgroundImage: `url('${logo}')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                filter: "invert(1) brightness(0.9)",
                opacity: 0.7
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
          width: fit-content;
        }
      `}</style>
    </section>
  );
};

export default SideScroller;