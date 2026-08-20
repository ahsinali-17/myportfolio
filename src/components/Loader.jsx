import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    // Disable body scroll while loading
   document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        if (loaderRef.current) {
          loaderRef.current.style.display = 'none';
        }
      }
    });

 
      tl.fromTo(textRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "+=0.05"
      )
      .fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.65, ease: "power1.inOut" },
        "-=0.2"
      )
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.25,
        ease: "power2.in"
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 0.45,
        ease: "power4.inOut"
      }, "-=0.2");

  }, { scope: loaderRef });

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] h-screen w-screen flex flex-col items-center justify-center bg-[var(--color-ink)] text-white select-none pointer-events-auto"

    >
      <div className="flex flex-col items-center gap-6">
        {/* Glow effect */}
        <div className="absolute w-[250px] h-[250px] bg-[var(--color-primary)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

        <h1
          ref={textRef}
          className="text-4xl md:text-5xl font-extrabold pb-3 leading-loose tracking-wider text-[var(--color-primary)] drop-shadow-lg text-center"
        >
          Portfolio Loading...
        </h1>
        
        {/* Loader bar container */}
        <div className="w-56 h-[4px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            ref={progressRef}
            className="absolute left-0 top-0 bottom-0 w-full bg-[var(--color-primary)] origin-left"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
