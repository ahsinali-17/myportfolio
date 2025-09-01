import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { skills } from "../data/Data";
import Tilt from "react-parallax-tilt";

const Services = () => {
  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <main className="mb-6 min-h-[30vh] text-white p-0">
      <section className="third w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-12">
        <h1
          className="text-4xl font-semibold w-5/6 mx-auto"
          data-aos="zoom-in-right"
        >
          Skills & Tools
        </h1>
        <p className="text-center text-sm w-5/6 mx-auto" data-aos="fade-in">
          Here are some of the skills and tools I have developed and utilized
          over the journey...
        </p>
        <div className="skills grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`s.${
                  index + 1
                } flex flex-col items-center justify-start bg-gray-700 p-2 lg:py-6 lg:px-2 mt-3 mb-6 min-h-[20vh] w-5/6 xl:w-5/6 mx-auto rounded-lg gap-8`}
                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
              >
                <h1 className="text-2xl text-center font-semibold mb-3">
                  {skill.title}
                </h1>
                <div className="w-full skill grid grid-cols-3 gap-3">
                  {skill.skills.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center"
                      >
                        <Tilt
                          tiltMaxAngleX={40}
                          tiltMaxAngleY={40}
                          glareEnable={true}
                          glareMaxOpacity={1}
                          scale={1.3}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            width={30}
                            height={30}
                            className="rounded-full min-h-14 min-w-14 bg-black bg-opacity-45 object-contain p-2"
                          />
                        </Tilt>
                        <p className="text-xs text-purple-400 text-opacity-55 text-center my-3">
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Services;
