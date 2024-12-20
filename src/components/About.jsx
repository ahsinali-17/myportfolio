import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import {Bio} from '../data/Data'

const About = () => {

  const {linkedin} = Bio;
  React.useEffect(() => {
    AOS.init({duration: 2000});
  }, []);

  return (
    <main className="mb-6 min-h-[30vh] text-white p-0">
    <section className="second w-full h-full my-[10vh] flex flex-col justify-center gap-10">
   <h1 className="text-4xl font-semibold w-5/6 mx-auto" data-aos="fade-right">About Me!</h1>
   <p className='text-center w-5/6 mx-auto' data-aos="fade-left">Welcome to my portfolio! I'm <span className='font-semibold text-red-600'>Ahsin </span>, A passionate and dedicated web developer with a strong focus on building robust, responsive, and user-friendly web applications. After nearly two years of immersing myself in web development, I thrive on turning ideas into reality through innovative web solutions.</p>

<p className='text-center w-5/6 mx-auto' data-aos="fade-right">My journey into the world of web development began with a curiosity-driven exploration of HTML, CSS, and JavaScript. Over time, I honed my skills and expanded my expertise to include a wide range of technologies and frameworks, including React.js, Node.js, Express.js, and MongoDB, among others.</p>

<p className='text-center w-5/6 mx-auto' data-aos="fade-left">I'm always eager to learn new technologies and enhance my skills, staying ahead in the ever-evolving world of web development. Excited to collaborate, connect, and bring fresh ideas to life. Let's create something remarkable together!</p>

<button className='border-2 border-red-500 rounded-full hover:font-bold hover:shadow-gray-600  shadow-inner text-center bg-transparent hover:bg-white text-blue-500 p-3 w-44 mx-auto' data-aos="fade-in"><a href={linkedin} target='_blank' className='flex justify-center gap-3 items-center'>
<img src="./linkedin.svg" width={24} alt="linkedin" />Let's Connect</a></button>
</section>
<hr className='mx-20 relative'/> 
</main>
  );
}

export default About;
