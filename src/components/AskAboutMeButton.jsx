import React, { useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const AskAboutMeButton = () => {
  const spanRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(containerRef.current, { width: "12rem", opacity: 1, duration: 0.3 });
   gsap.to(spanRef.current, { opacity: 1, x: 0, display: "inline-block", duration: 0.5 });
  };

  const handleMouseLeave = () => {
    gsap.to(spanRef.current, { opacity: 0, x: -20, display: "none", duration: 0.2 });
    gsap.to(containerRef.current, { width: "3.5rem", opacity: 1, duration: 0.5 });
  };

  return (
    <Link
      to="/chat"
      ref={containerRef}
      className="fixed bottom-8 right-8 flex gap-3 items-center cursor-pointer z-50 bg-[#c33ddb]  rounded-full  shadow-lg overflow-hidden text-nowrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src="/bot.png" alt="bot" className="w-14 h-14 rounded-full bg-black" />
      <span
        ref={spanRef}
        className="hidden group-hover:block -translate-x-5 text-sm font-semibold text-white"
      >
        Ask about me
      </span>
    </Link>
  );
};
 
export default AskAboutMeButton;
