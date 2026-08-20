import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Typed from 'typed.js';
import './Home.css';
import { Bio } from '../data/Data';

const Home = () => {
  const el = useRef(null);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const { roles, resume, name } = Bio;

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      el.current.textContent = roles[0];
      return undefined;
    }

    const typed = new Typed(el.current, {
      strings: [...roles],
      typeSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [roles]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set([leftRef.current, ctaRef.current, imageRef.current], { autoAlpha: 1, clearProps: 'transform' });
      return;
    }

    const tl = gsap.timeline({
      delay: 0.15,
      defaults: {
        ease: 'power3.out',
      },
    });

    tl.fromTo(
      leftRef.current,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.7 }
    )
      .fromTo(
        ctaRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.45 },
        '-=0.35'
      )
      .fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 24 },
        { autoAlpha: 1, x: 0, duration: 0.8 },
        '-=0.25'
      );
  }, { scope: sectionRef });

  return (
    <main className="hero min-h-[100svh] text-white">
      <section
        ref={sectionRef}
        className="section-shell first flex flex-col gap-12 justify-center items-center lg:flex-row lg:justify-between lg:gap-16 min-h-[100svh]"
      >
        <div
          ref={leftRef}
          className="leftSection w-full lg:w-[62%] p-0 text-center lg:text-left"
        >
          <p className="section-kicker mb-5">FULL-STACK DEVELOPER · {name}</p>
          <h1 className="hero-title">I build fast, scalable web products.</h1>
          <p className="hero-copy prose-width mt-6">
            I am {name}, a full-stack developer focused on responsive interfaces, reliable APIs, and thoughtful AI-powered experiences.
          </p>
          <p className="hero-role mt-5 text-white">Expertise: <span className="text-[var(--color-primary)]" ref={el} /></p>
          <div ref={ctaRef} className="hero-actions flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
            <a className="button button-primary" href="#projects">View selected work</a>
            <a className="button button-secondary" href={resume} target="_blank" rel="noreferrer">Download resume</a>
          </div>
          <div className="proof-row mt-8" aria-label="Core technologies">
            <span>React</span><span>Next.js</span><span>Node.js</span><span>AI</span>
          </div>
        </div>

        <div
          ref={imageRef}
          className="rightSection flex justify-center items-center w-full lg:w-[38%] p-0"
        >
          <img
            src="/images/photo.jpeg"
            alt="Portrait of M. Ahsin Ali"
            className="hero-portrait w-[220px] h-[280px] sm:w-[280px] sm:h-[350px] object-cover object-top"
            width="280"
            height="350"
          />
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Home;
