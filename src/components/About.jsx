import React from 'react';

const About = () => {
  return (
    <main className="mb-6 pt-6 min-h-[90vh] text-white p-0 flex flex-col justify-center">
    <section className="second w-full h-full mt-[10vh] mb-6">
   <h1 className="text-4xl font-semibold w-5/6 mx-auto mb-4">About Me!</h1>
   <p className='text-center mb-6 w-5/6 mx-auto'>Welcome to my portfolio! I'm <span className='font-semibold text-red-600'>Ahsin </span>, a passionate and dedicated web developer with a knack for crafting exceptional digital experiences. With 1.5 years of experience in the industry, I thrive on turning ideas into reality through innovative web solutions.</p>

<p className='text-center mb-6 w-5/6 mx-auto'>My journey into the world of web development began with a curiosity-driven exploration of HTML, CSS, and JavaScript. Over time, I honed my skills and expanded my expertise to include a wide range of technologies and frameworks, including React.js, Node.js, Express.js, and MongoDB, among others.</p>

<p className='text-center mb-6 w-5/6 mx-auto'>I specialize in creating responsive and user-friendly web applications that not only look great but also perform flawlessly across all devices.I'm excited about the opportunity to collaborate on your next web project and bring your ideas to life. Let's work together to create something extraordinary!</p>
</section>
<hr className='mx-20 relative'/> 
</main>
  );
}

export default About;
