import React from "react";
import { skills } from "../data/Data";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = React.useRef(null);
  const circleRef = React.useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
        end: "bottom 150%",
        scrub: 1.5,
      },
    });
    tl.from(".skills-title", {
      x: -80,
      opacity: 0,
      ease: "power3.out",
    });

    tl.from(".skills-intro", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    tl.from(".skill-card", {
      y: 45,
      opacity: 0,
      stagger: 0.14,
      ease: "power3.out",
    });
  }, sectionRef);

  return (
    <main ref={sectionRef} className="mb-6 min-h-[30vh] text-white p-0">
      <section className="third w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-12">
        <h1 className="skills-title text-4xl font-semibold w-5/6 mx-auto">
          Skills & Tools
        </h1>
        <p className="skills-intro text-center text-sm w-5/6 mx-auto">
          Here are some of the skills and tools I have developed and utilized
          over the journey...
        </p>
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`s.${
                  index + 1
                } skill-card flex flex-col items-center justify-start bg-gray-700 p-2 lg:py-6 lg:px-2 mt-3 mb-6 min-h-[20vh] w-5/6 xl:w-5/6 mx-auto rounded-lg gap-8`}
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
                        <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} scale={1.3}>
                          <div ref={circleRef} className="group cursor-pointer">
                            <div
                              className="
        relative h-14 w-14
        transition-transform duration-700
        [transform-style:preserve-3d]
        group-hover:[transform:rotateY(180deg)]
      "
                            >
                              <div
                                className="
          absolute inset-0
          flex items-center justify-center
          rounded-full
          bg-black/45
          [backface-visibility:hidden]
        "
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width={30}
                                  height={30}
                                  className="h-full w-full rounded-full object-contain p-2"
                                />
                              </div>

                              {/* BACK — Percentage */}
                              <div
                                className="
          absolute inset-0
          flex items-center justify-center
          rounded-full
          bg-black/80
          text-[10px] font-semibold text-cyan-300
          [backface-visibility:hidden]
          [transform:rotateY(180deg)]
        "
                              >
                                {item.skillLevel}%
                              </div>
                            </div>
                          </div>
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
