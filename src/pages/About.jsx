import React,{useRef} from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Bio} from '../data/Data'

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const {linkedin} = Bio;
  const headingRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);
  const para3Ref = useRef(null);
  const ctaRef = useRef(null);
  const aboutRef = useRef(null);

  useGSAP(() => {
      const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 90%',
        end: 'bottom 75%',
        scrub: 1.5,
        ease: "power1.inout",
      },
    });
  
      tl.fromTo(
        headingRef.current,
        { autoAlpha: 0, y: -50, opacity: 0 },
        { autoAlpha: 1, y: 0, opacity: 1 }
      )
        .fromTo(
          para1Ref.current,
          { autoAlpha: 0, x: 100, opacity: 0 },
          { autoAlpha: 1, x: 0, opacity: 1},
      
        )
        .fromTo(
          para2Ref.current,
          { autoAlpha: 0, x: -100, opacity: 0 },
          { autoAlpha: 1, x: 0, opacity: 1 },
        )
        .fromTo(
          para3Ref.current,
          { autoAlpha: 0, x: 100, opacity: 0 },
          { autoAlpha: 1, x: 0, opacity: 1 },
        )
        .fromTo(
          ctaRef.current,
          { autoAlpha: 0, y: 100, opacity: 0 },
          { autoAlpha: 1, y: 0, opacity: 1},
        
        )
    }, { scope: aboutRef });
  

  return (
    <main className="mb-6 min-h-[30vh] text-white p-0">
    <section ref={aboutRef} className="second w-full h-full my-[10vh] flex flex-col justify-center gap-10">
   <h1 ref={headingRef} className="text-4xl font-semibold w-5/6 mx-auto" >About Me!</h1>
   <p ref={para1Ref} className='text-center w-5/6 mx-auto' >Welcome to my portfolio! I'm <span className='font-semibold text-red-600'>Ahsin </span>, A passionate and dedicated web developer with a strong focus on building robust, responsive, and user-friendly web applications. After nearly two years of immersing myself in web development, I thrive on turning ideas into reality through innovative web solutions.</p>

<p ref={para2Ref} className='text-center w-5/6 mx-auto' >My journey into the world of web development began with a curiosity-driven exploration of HTML, CSS, and JavaScript. Over time, I honed my skills and expanded my expertise to include a wide range of technologies and frameworks, including React.js, Node.js, Express.js, and MongoDB, among others.</p>

<p ref={para3Ref} className='text-center w-5/6 mx-auto' >I'm always eager to learn new technologies and enhance my skills, staying ahead in the ever-evolving world of web development. Excited to collaborate, connect, and bring fresh ideas to life. Let's create something remarkable together!</p>

<button ref={ctaRef} className='border-2 border-red-500 rounded-full hover:font-bold hover:shadow-gray-600  shadow-inner text-center bg-transparent hover:bg-white text-blue-500 p-3 w-44 mx-auto' ><a href={linkedin} target='_blank' className='flex justify-center gap-3 items-center'>
<img src="./linkedin.svg" width={24} alt="linkedin" />Let's Connect</a></button>
</section>
<hr className='mx-20 relative'/> 
</main>
  );
}

export default About;
