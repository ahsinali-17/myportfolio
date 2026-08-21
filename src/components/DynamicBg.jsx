import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BgAnimation from "./HeroBgAnimation";

gsap.registerPlugin(ScrollTrigger);

const DynamicBg = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) {
        gsap.set(".dyn-blob-1", {
          xPercent: 10,
          yPercent: 10,
          scale: 1,
          backgroundColor: "var(--color-primary)",
        });
        gsap.set(".dyn-blob-2", {
          xPercent: 60,
          yPercent: 60,
          scale: 1,
          backgroundColor: "var(--color-secondary)",
        });
        return;
      }

      // Positions and colors for each section
      const sectionStates = [
        {
          id: "#home",
          blob1: { xPercent: 80, yPercent: 15, scale: 1.0, color: "#5eead4" }, // Teal
          blob2: { xPercent: 10, yPercent: 70, scale: 0.8, color: "#f6a66d" }, // Orange
        },
        {
          id: "#about",
          blob1: { xPercent: 15, yPercent: 20, scale: 1.3, color: "#f6a66d" }, // Orange
          blob2: { xPercent: 75, yPercent: 65, scale: 1.1, color: "#5eead4" }, // Teal
        },
        {
          id: "#skills",
          blob1: { xPercent: 70, yPercent: 55, scale: 0.9, color: "#5eead4" }, // Teal
          blob2: { xPercent: 15, yPercent: 25, scale: 1.2, color: "#fca5a5" }, // Rose/Danger
        },
        {
          id: "#projects",
          blob1: { xPercent: 75, yPercent: 70, scale: 1.4, color: "#86efac" }, // Green
          blob2: { xPercent: 10, yPercent: 15, scale: 0.7, color: "#5eead4" }, // Teal
        },
        {
          id: "#certificates",
          blob1: { xPercent: 20, yPercent: 65, scale: 1.1, color: "#f6a66d" }, // Orange
          blob2: { xPercent: 70, yPercent: 25, scale: 1.0, color: "#5eead4" }, // Teal
        },
        {
          id: "#experience",
          blob1: { xPercent: 45, yPercent: 30, scale: 1.2, color: "#5eead4" }, // Teal
          blob2: { xPercent: 50, yPercent: 75, scale: 1.2, color: "#f6a66d" }, // Orange
        },
        {
          id: "#contact",
          blob1: { xPercent: 45, yPercent: 45, scale: 1.5, color: "#f6a66d" }, // Orange
          blob2: { xPercent: 75, yPercent: 75, scale: 0.7, color: "#5eead4" }, // Teal
        },
      ];

      const isMainPage = !!document.querySelector("#home");

      if (!isMainPage) {
        // Idle drift mode (e.g. Chat page)
        const animateIdle = () => {
          gsap.to(".dyn-blob-1", {
            xPercent: "random(10, 80)",
            yPercent: "random(10, 80)",
            scale: "random(0.8, 1.4)",
            backgroundColor: () =>
              gsap.utils.random(["#5eead4", "#f6a66d", "#fca5a5", "#86efac"]),
            duration: "random(8, 14)",
            ease: "sine.inOut",
            onComplete: animateIdle,
          });

          gsap.to(".dyn-blob-2", {
            xPercent: "random(10, 80)",
            yPercent: "random(10, 80)",
            scale: "random(0.8, 1.4)",
            backgroundColor: () =>
              gsap.utils.random(["#5eead4", "#f6a66d", "#fca5a5", "#86efac"]),
            duration: "random(8, 14)",
            ease: "sine.inOut",
            onComplete: animateIdle,
          });
        };

        animateIdle();
        return;
      }

      // Setup triggers for each section on the main page
      sectionStates.forEach((state) => {
        const element = document.querySelector(state.id);
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => transitionToState(state),
            onEnterBack: () => transitionToState(state),
          });
        }
      });

      function transitionToState(state) {
        gsap.to(".dyn-blob-1", {
          xPercent: state.blob1.xPercent,
          yPercent: state.blob1.yPercent,
          scale: state.blob1.scale,
          backgroundColor: state.blob1.color,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(".dyn-blob-2", {
          xPercent: state.blob2.xPercent,
          yPercent: state.blob2.yPercent,
          scale: state.blob2.scale,
          backgroundColor: state.blob2.color,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Set initial position
      transitionToState(sectionStates[0]);
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none select-none w-screen h-screen"
    >
      {/* Dynamic Blobs */}
      <div className="dyn-blob-1 absolute w-[350px] h-[350px] rounded-full bg-[var(--color-primary)] opacity-20 blur-[130px] will-change-transform left-0 top-0"></div>
      <div className="dyn-blob-2 absolute w-[400px] h-[400px] rounded-full bg-[var(--color-secondary)] opacity-15 blur-[150px] will-change-transform left-0 top-0"></div>

      {/* SVG Tech Grid */}
      <BgAnimation />
    </div>
  );
};

export default DynamicBg;
