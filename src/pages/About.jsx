import {useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Bio } from '../data/Data';

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const { linkedin, location } = Bio;
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const aboutRef = useRef(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    if (reduceMotion) {
      gsap.set([headingRef.current, ctaRef.current], { autoAlpha: 1, clearProps: 'transform' });
      return;
    }

    tl.fromTo(
      [headingRef.current, ctaRef.current],
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
    );
  }, { scope: aboutRef });

  return (
    <main className="text-white">
      <section ref={aboutRef} className="section-shell" aria-labelledby="about-heading">
        <div className="mb-8">
          <p className="section-kicker">ABOUT</p>
          <h1 ref={headingRef} id="about-heading" className="mt-3 text-4xl lg:text-5xl font-semibold">
            Thoughtful products, carefully shipped.
          </h1>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(15rem,0.8fr)] lg:items-start">
          <div className="prose-width text-[var(--color-text-muted)]">
            <p>
              I am a full-stack developer who enjoys turning rough ideas into dependable, responsive web products. My work spans React and Next.js interfaces, Node.js APIs, databases, and AI-assisted experiences. I care about clear interaction design, maintainable code, and shipping work that feels considered.
            </p>
            <a className="button button-secondary mt-7" href={linkedin} target="_blank" rel="noreferrer">
              <img src="/linkedin.svg" width={24} height={24} alt="" aria-hidden="true" className='pr-2 sm:pr-3'/>
              Let&apos;s connect
            </a>
          </div>
          <ul className="surface flex flex-col gap-4 p-5 text-sm" aria-label="Professional details">
            <li><span className="section-kicker block mb-1">Experience</span>Nearly two years building for the web</li>
            <li><span className="section-kicker block mb-1">Core stack</span>React, Next.js, Node.js, MongoDB</li>
            <li><span className="section-kicker block mb-1">Location</span>{location.city}, {location.country}</li>
          </ul>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
}

export default About;
