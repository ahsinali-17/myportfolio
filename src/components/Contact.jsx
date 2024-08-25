import React from 'react';

const Contact = () => {
  return (
      <main className="m-0 pt-6 min-h-screen text-white p-0">
        <section className="second w-full mt-[10vh]">
          <h1 className="text-4xl font-semibold w-5/6 mx-auto mb-4">Contact Me</h1>
          <div className="flex flex-col items-center justify-center mt-6 min-h-[60vh] w-5/6 mx-auto">
            <span className="font-light text-xl">
              "Ready to collaborate or have a question? Let's connect!"
            </span>
            <span className="text-red-600 font-semibold mt-8">
              gmail: &nbsp;
              <span className="text-xs text-white"> aahsin739@gmail.com</span>
            </span>
            <div className="links mt-12 flex gap-10">
              <a href="https://github.com/ahsinali-17" target="_blank">
                <img src="github.svg" alt="github" />
              </a>
              <a
                href="https://www.linkedin.com/in/ahsin-ali-3a5135276/"
                target="_blank"
              >
                <img src="linkedin.svg" alt="linkedin" />
              </a>
            </div> 
          </div>
        </section>
        <footer className="flex justify-center items-center bg-gray-500 absolute bottom-4 w-full">
          <span>
            <span className="text-red-600 font-semibold">AA</span>portfolio
            &#169; 2024. All rights reserved.
          </span>
        </footer>
      </main>
  );
}

export default Contact;
