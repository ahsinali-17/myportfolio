import React, { useState, useRef } from "react";
import { certifications } from "../data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Heading Flip-Up Animation
      gsap.fromTo(
        ".cert-heading",
        {
          rotationX: -80,
          opacity: 0,
          transformPerspective: 1000,
          transformOrigin: "top center",
        },
        {
          rotationX: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".cert-heading",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // 2. Cards Flip-Left Animation
      const cards = gsap.utils.toArray(".cert-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            rotationY: -80,
            opacity: 0,
            transformPerspective: 1000,
            transformOrigin: "center center",
          },
          {
            rotationY: 0,
            opacity: 1,

            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="mb-6 min-h-[70vh] text-white p-0"
      name="certifictes"
    >
      <section className="fifth w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-6">
        <h1 className="cert-heading text-4xl font-semibold w-5/6 mx-auto">
          Certifications
        </h1>
        <div className="certificates grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          {certifications.map((cert) => {
            return (
              <div
                key={cert.id}
                className="cert-card relative group flex flex-col items-center md:max-xl:justify-center lg:justify-around bg-gray-700 px-2 py-6 min-h-[45vh] md:max-xl:min-h-[35vh] xl:min-h-[40vh] rounded-lg gap-10 xl:gap-6 w-5/6 mx-auto hover:shadow-lg hover:shadow-black hover:bg-opacity-35 overflow-hidden"
              >
                <img
                  src={cert.img}
                  alt="image"
                  className="w-full h-full object-cover rounded-lg"
                />

                <div className="cert-desc h-full p-2 md:p-3 bg-black/70 absolute left-0 w-full -bottom-[100%] group-hover:bottom-0 flex flex-col gap-3 justify-center items-center transition-all ease-in-out duration-[0.4s]">
                  <h3 className=" font-semibold mb-2">
                    <span className="flex flex-wrap justify-center text-center text-2xl lg:text-3xl text-violet-400 hover:text-white hover:brightness-200 cursor-pointer">
                      {cert.title}{" "}
                    </span>
                  </h3>
                  <p className="text-center">{cert.desc}</p>
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

export default Certificates;
