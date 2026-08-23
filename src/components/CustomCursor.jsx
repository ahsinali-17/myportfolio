import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Disable on touch-only devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    if (!cursorDot || !cursorRing) return;

    // Set initial pivot to center
    gsap.set(cursorDot, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    gsap.set(cursorRing, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Use highly optimized gsap.quickTo for instant rendering loop
    const xDotTo = gsap.quickTo(cursorDot, "x", {
      duration: 0.1,
      ease: "power3.out",
    });
    const yDotTo = gsap.quickTo(cursorDot, "y", {
      duration: 0.1,
      ease: "power3.out",
    });

    const xRingTo = gsap.quickTo(cursorRing, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yRingTo = gsap.quickTo(cursorRing, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const onMouseMove = (e) => {
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Dynamic hover states
    const onMouseEnter = () => {
      gsap.to(cursorRing, {
        scale: 1.6,
        backgroundColor: "rgba(94, 234, 212, 0.15)",
        borderColor: "#5eead4",
        borderWidth: "1px",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 0.5,
        backgroundColor: "#f6a66d",
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "#5eead4",
        borderWidth: "1.5px",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: "#5eead4",
        duration: 0.3,
      });
    };

    // Attach listeners dynamically to cover routing / re-renders
    const attachListeners = () => {
      const targets = document.querySelectorAll(
        'a, button, [role="button"], .project-card, .hero-portrait',
      );
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnter);
        target.removeEventListener("mouseleave", onMouseLeave);
        target.addEventListener("mouseenter", onMouseEnter);
        target.addEventListener("mouseleave", onMouseLeave);
      });
    };

    attachListeners();

    // Re-check DOM for new elements (e.g. dynamic projects or route changes)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll(
        'a, button, [role="button"], .project-card, .hero-portrait',
      );
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", onMouseEnter);
        target.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-[#5eead4] hidden md:block"
        style={{ mixBlendMode: "screen" }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9999] border-[1.5px] border-[#5eead4] hidden md:block"
        style={{ mixBlendMode: "screen" }}
      />
    </>
  );
};

export default CustomCursor;
