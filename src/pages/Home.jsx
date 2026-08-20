import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Typed from 'typed.js';
import './Home.css';
import { Bio } from '../data/Data';
import Tilt from 'react-parallax-tilt';

const Home = () => {
  const el = useRef(null);
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const emojiRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const { roles, resume, name } = Bio;

  useEffect(() => {
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
    const tl = gsap.timeline({
      delay: 3.2,
      defaults: {
        ease: 'power2.out',
        duration: 2.5,
      },
    });

    tl.fromTo(
      leftRef.current,
      { autoAlpha: 0, y: 52 },
      { autoAlpha: 1, y: 0, duration: 0.9 }
    )
      .fromTo(
        [emojiRef.current, ctaRef.current],
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, stagger: 0.3, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        imageRef.current,
        { autoAlpha: 0, x: 40 },
        { autoAlpha: 1, x: 0, duration: 1 },
        "-=1.2"
      );
  }, { scope: sectionRef });

  return (
    <main className="mb-6 min-h-[80vh] text-white">
      <section
        ref={sectionRef}
        className="first flex flex-col gap-[40px] justify-center items-center lg:flex-row lg:justify-around lg:gap-[12px] my-[10vh] min-h-[80vh]"
      >
        <div
          ref={leftRef}
          className="leftSection w-[90%] lg:w-[60%] p-4 lg:p-8 text-lg lg:text-xl text-center max-h-[50vh] lg:max-h-full"
        >
          Hi! my name is <span className="text-violet-400 text-4xl">{name}</span>
          <div className="mt-2">
            and I am a passionate
            <div className="text-violet-400 text-lg md:text-2xl lg:text-3xl mt-2">
              <span ref={el}></span>
            </div>
          </div>
          <div className="text-xs mt-4 text-red-600 text-center">
            Code. Create. Inspire. Crafting the web
            <span className="flex mt-2 items-center justify-center">
              one line of code at a time. &nbsp;
              <span ref={emojiRef} className="text-xl inline-block">
                😁
              </span>
            </span>
          </div>
          <div ref={ctaRef} className="flex justify-center">
            <a href={`${resume}`} target="_blank" rel="noreferrer">
              <button className="cv border-2 border-red-500 rounded-full hover:font-bold hover:shadow-gray-600 shadow-inner text-center bg-transparent hover:bg-white text-blue-500 p-3 w-70 mx-auto mt-6">
                Check Resume
              </button>
            </a>
          </div>
        </div>

        <div
          ref={imageRef}
          className="rightSection flex justify-center items-center w-[90%] lg:w-[40%] my-8 lg:my-0 max-h-[30vh] lg:max-h-full p-0"
        >
          <Tilt>
            <img
              src="images\\photo.jpeg"
              alt="coder"
              className="rounded-full border-4 border-red-500 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-cover object-top"
            />
          </Tilt>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Home;
