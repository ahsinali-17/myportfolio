import React, { useRef } from 'react';
import Typed from 'typed.js';
import './Home.css'; 

import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Home = () => {
  const el = useRef();

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Web App Developer.', 'MERNstack Developer.','skilled in Next.js.'],
      typeSpeed: 50,
      loop: true,
    });

    AOS.init({duration: 2000});

    return () => {
      typed.destroy();
    };
  }, []);


  return (
    <main className='m-0 min-h-[90vh] text-white p-0  '>
    <section className="first flex justify-around items-center mt-[10vh] min-h-[80vh]">
        <div className="leftSection w-[40%] p-12 px-12 md:px-16 text-xl">Hi! my name is <span
                className='text-violet-400 text-4xl'>M.Ahsin Ali</span>
            <div className='mt-2'>and i am a passionate<div className='text-violet-400 text-lg md:text-2xl lg:text-3xl mt-2'><span ref={el}></span>
                </div>
            </div>
            <div className='text-xs mt-4 text-red-600 text-center'>Creating fast, responsive, and engaging web apps that inspire,<span className='flex mt-2 items-center justify-center'> one line of code at a time. &nbsp;
                    <span className="text-xl" data-aos="flip-up" data-aos-anchor-placement="top-bottom">😁</span></span> </div>
                    <div className="flex justify-center">
                    <a href="./Resume.pdf" target="_blank" data-aos="zoom-in-right"><button className="cv bg-red-600 text-white font-semibold text-sm p-2 rounded-lg mt-4 text-center cursor-pointer">Download CV</button></a> </div>
        </div>

        <div className="rightSection w-[40%]" data-aos="zoom-in-left">
            <img src="./bg.png" alt="coder" className='w-[100%]' />
        </div>
    </section>
    <hr className='mx-20 relative top-10'/>
     
</main>
  );
}

export default Home;
