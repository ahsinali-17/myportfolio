import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InteractiveCanvas from "./InteractiveCanvas";

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
          left: "10vw",
          top: "10vh",
          scale: 1,
          backgroundColor: "var(--color-primary)",
        });
        gsap.set(".dyn-blob-2", {
          left: "60vw",
          top: "60vh",
          scale: 1,
          backgroundColor: "var(--color-secondary)",
        });
        return;
      }

      // Positions and colors for each section - alternating viewport coordinates for full screen crossover sweep
      const sectionStates = [
        {
          id: "#home",
          blob1: { left: 80, top: 15, scale: 1.0, color: "#5eead4" }, // Right
          blob2: { left: 70, top: 20, scale: 0.9, color: "#f6a66d" }, // Left
        },
        {
          id: "#about",
          blob1: { left: 10, top: 60, scale: 1.2, color: "#945dd6" }, // Left
          blob2: { left: 15, top: 65, scale: 1.1, color: "#5eead4" }, // Right
        },
        {
          id: "#skills",
          blob1: { left: 80, top: 25, scale: 1.1, color: "#ec4899" }, // Right
          blob2: { left: 75, top: 20, scale: 1.2, color: "#f6a66d" }, // Left
        },
        {
          id: "#projects",
          blob1: { left: 10, top: 65, scale: 1.3, color: "#3b82f6" }, // Left
          blob2: { left: 15, top: 60, scale: 1.0, color: "#86efac" }, // Mint Green
        },
        {
          id: "#certificates",
          blob1: { left: 75, top: 20, scale: 1.2, color: "#f59e0b" }, // Right
          blob2: { left: 70, top: 22, scale: 1.1, color: "#ec4899" }, // Magenta
        },
        {
          id: "#experience",
          blob1: { left: 10, top: 65, scale: 1.2, color: "#8b5cf6" }, // Left
          blob2: { left: 15, top: 60, scale: 1.3, color: "#3b82f6" }, // Vibrant Blue
        },
        {
          id: "#contact",
          blob1: { left: 80, top: 25, scale: 1.4, color: "#f6a66d" }, // Right
          blob2: { left: 85, top: 20, scale: 0.9, color: "#fca5a5" }, // Rose Red
        },
      ];

      const isMainPage = !!document.querySelector("#home");

      function transitionToState(state) {
        gsap.to(".dyn-blob-1", {
          left: `${state.blob1.left}vw`,
          top: `${state.blob1.top}vh`,
          scale: state.blob1.scale,
          backgroundColor: state.blob1.color,
          duration: 2.2,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(".dyn-blob-2", {
          left: `${state.blob2.left}vw`,
          top: `${state.blob2.top}vh`,
          scale: state.blob2.scale,
          backgroundColor: state.blob2.color,
          duration: 2.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Idle Mode animation
      const animateIdle = () => {
        gsap.to(".dyn-blob-1", {
          left: `${gsap.utils.random(10, 85)}vw`,
          top: `${gsap.utils.random(10, 85)}vh`,
          scale: gsap.utils.random(0.8, 1.4),
          backgroundColor: gsap.utils.random([
            "#5eead4",
            "#f6a66d",
            "#fca5a5",
            "#86efac",
          ]),
          duration: gsap.utils.random(3, 8),
          ease: "sine.inOut",
          onComplete: animateIdle,
        });

        gsap.to(".dyn-blob-2", {
          left: `${gsap.utils.random(10, 85)}vw`,
          top: `${gsap.utils.random(10, 85)}vh`,
          scale: gsap.utils.random(0.8, 1.4),
          backgroundColor: gsap.utils.random([
            "#5eead4",
            "#f6a66d",
            "#fca5a5",
            "#86efac",
          ]),
          duration: gsap.utils.random(8, 12),
          ease: "sine.inOut",
          onComplete: animateIdle,
        });
      };

      if (!isMainPage) {
        animateIdle();
      } else {
        // Setup triggers for each section on the main page
        sectionStates.forEach((state) => {
          const element = document.querySelector(state.id);
          if (element) {
            ScrollTrigger.create({
              trigger: element,
              start: "top 50%",
              end: "bottom 50%",
              onToggle: (self) => {
                if (self.isActive) {
                  transitionToState(state);
                }
              },
            });
          }
        });

        // Set initial position
        transitionToState(sectionStates[0]);
      }

      // Force recalculation of ScrollTrigger coordinates to account for lazy-loaded pages loading in
      const refreshTimer1 = setTimeout(() => ScrollTrigger.refresh(), 800);
      const refreshTimer2 = setTimeout(() => ScrollTrigger.refresh(), 2500);

      return () => {
        clearTimeout(refreshTimer1);
        clearTimeout(refreshTimer2);
      };
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

      {/* Interactive 3D Particles */}
      <InteractiveCanvas />
    </div>
  );
};

export default DynamicBg;
