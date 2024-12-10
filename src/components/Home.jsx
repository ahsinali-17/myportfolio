import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import './Home.css'; 
import {Bio} from '../data/Data'
import Tilt from 'react-parallax-tilt';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Home = () => {
  const el = useRef();
  const {roles, resume, name} = Bio;

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [...roles],
      typeSpeed: 50,
      loop: true,
    });

    AOS.init({ duration: 2000 });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main className="mb-6 min-h-[80vh] text-white">
      
      <section className="first flex flex-col gap-[40px] justify-center items-center lg:flex-row lg:justify-around lg:gap-[12px] my-[10vh] min-h-[80vh]">

        {/* Left Section */}
        <div className="leftSection w-[90%] lg:w-[60%] p-4 lg:p-8 text-lg lg:text-xl text-center max-h-[50vh] lg:max-h-full">
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
              <span className="text-xl" data-aos="flip-up" data-aos-anchor-placement="top-bottom">😁</span>
            </span>
          </div>
          <div className="flex justify-center">
            <a href={`${resume}`} target="_blank" data-aos="zoom-in-right">
              <button className="cv bg-red-600 text-white font-semibold text-sm p-2 rounded-full mt-4 text-center cursor-pointer">
                Check Resume
              </button>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="rightSection flex justify-center items-center w-[90%] lg:w-[40%] my-8 lg:my-0 max-h-[30vh] lg:max-h-full p-0 "
          data-aos="zoom-in-left"
        > 
          <Tilt>
          <img
            src="src/images/me1.jpg"
            alt="coder"
            className="rounded-full border-4 border-red-500 w-[200px] h-[200px] md:w-[300px] md:h-[300px] object-contain"
          />
          </Tilt>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Home;
