import React from 'react';

const Services = () => {
  return (
    <main className="m-0 py-6 min-h-[100vh] text-white p-0">
    <section className="second w-full mt-[10vh] mb-6">
      <h1 className="text-4xl font-semibold w-5/6 mx-auto mb-4">Services</h1>
      <div className="services flex flex-wrap items-center justify-center gap-8 w-full">
        <div className="s.one flex flex-col items-center justify-center bg-gray-500 p-2 lg:p-6 mt-3 lg:w-2/5  min-h-[40vh] lg:min-h-[37vh] rounded-lg gap-8 w-5/6">
          <img src="./data.png" alt="website" width="30px" height="30px" />
          <div className="text">
            <h1 className="text-2xl font-semibold text-center">
              Custom Web App Dev.
            </h1>
            <p className="text-center text-sm">
              Building dynamic and scalable web applications from scratch
              using a combination of React.js, Next.js, Node.js, Express.js,
              and MongoDB. Creating robust and feature-rich applications
              tailored to client requirements.
            </p> 
          </div>
        </div>
        <div className="s.two flex flex-col items-center justify-center bg-gray-500 p-2 lg:p-6 mt-3 lg:w-2/5  min-h-[40vh] lg:min-h-[37vh] rounded-lg gap-8 w-5/6">
          <img src="./web-design.png" alt="website"width="30px" height="30px" />
          <div className="text">
            <h1 className="text-2xl font-semibold text-center">
            Responsive Web Design
            </h1>
            <p className="text-center text-sm">
             Creating websites that are optimized for various devices and screen sizes to ensure a consistent and enjoyable user experience across desktops, tablets, and smartphones.
            </p>
          </div>
        </div>
        <div className="s.three flex flex-col items-center justify-center bg-gray-500 p-2 lg:p-6 lg:w-2/5  min-h-[40vh] lg:min-h-[37vh] rounded-lg lg:gap-4 gap-8 w-5/6">
          <img src="./design.png" alt="website"width="30px" height="30px"/>
          <div className="text">
            <h1 className="text-2xl font-semibold text-center">
            UI/UX Design
            </h1>
            <p className="text-center text-sm">
            Creating intuitive UIs and crafting engaging UX to boost usability and drive user satisfaction. This involves designing interfaces that are easy to navigate, ultimately enhancing user satisfaction. Aim to optimize user interaction through thoughtful design decisions.
            </p>
          </div>
        </div>
        <div className="s.three flex flex-col items-center justify-center bg-gray-500 p-2 lg:p-6 lg:w-2/5  min-h-[40vh] lg:min-h-[37vh] rounded-lg lg:gap-4 gap-8 w-5/6">
          <img src="./handshake.png" alt="website"width="30px" height="30px" />
          <div className="text">
            <h1 className="text-2xl font-semibold text-center">
            Consultation & Training
            </h1>
            <p className="text-center text-sm">
            Providing consultation services to clients on technology stack selection, architecture design, and best practices, as well as offering training sessions or workshops to teams on JavaScript frameworks and development methods.
            </p>
          </div>
        </div>
      </div>
      
    </section>
    <hr className='mx-20 relative'/> 
  </main>
  );
}

export default Services;
