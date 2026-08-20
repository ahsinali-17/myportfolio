import React, { useState, useRef } from "react";
import { projects } from "../data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Heading Flip-Up Animation
    gsap.fromTo(".projects-heading",
      {
        rotationX: -80,
        opacity: 0,
        transformPerspective: 1000,
        transformOrigin: "top center"
      },
      {
        rotationX: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        }
      }
    );

    // 2. Cards Flip-Left Animation
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card) => {
      gsap.fromTo(card,
        {
          rotationY: -80,
          opacity: 0,
          transformPerspective: 1000,
          transformOrigin: "center center"
        },
        {
          rotationY: 0,
          opacity: 1,

          scrollTrigger: {
            trigger: card,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,

          }
        }
      );
    });
  }, { dependencies: [showAll], scope: containerRef });

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
    setTimeout(() => {
      const element = document.getElementById("projects");
      if (element && window.locoScroll) {
        window.locoScroll.scrollTo(element, {
          offset: -100,
          duration: 0.3,
        });
      } else if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <main ref={containerRef} className="mb-6 min-h-[70vh] text-white p-0" name="projects">
      <section className="fifth w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-6">
        <h1
          className="projects-heading text-4xl font-semibold w-5/6 mx-auto"
        >
          Projects
        </h1>
        <div className="projects grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          {displayedProjects.map((project) => {
            return (
              <div key={project.id}
                className="project-card flex flex-col items-center md:max-xl:justify-center lg:justify-around bg-gray-700 px-2 py-6 min-h-[45vh] md:max-xl:min-h-[35vh] xl:min-h-[40vh] rounded-lg gap-10 xl:gap-6 w-5/6 mx-auto  hover:shadow-lg hover:shadow-black hover:bg-opacity-35"
              >
                <img src={project.image} alt="image" className="w-full h-[150px] md:max-lg:h-[300px] lg:h-[150px] object-cover rounded-lg" />

                <div className="flex flex-col gap-3 justify-center items-center">
                  <h3 className=" font-semibold mb-2">
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex flex-wrap justify-center text-center text-2xl lg:text-3xl text-violet-400 hover:text-white hover:brightness-200 cursor-pointer">{project.title} <span className="text-xs lg:text-sm text-red-500 text-center">{"(" + project.category + ")"}</span></a>
                  </h3>
                  <p className="text-center">
                    {project.description.slice(0, 150) + "..."}
                  </p>
                  <div className="flex flex-wrap text-center justify-center">
                    {project.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="text-violet-400 p-1 text-xs lg:text-sm"
                        >
                          {tag}
                        </span>
                      )
                    })}

                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="all-proj flex justify-center">
          <button className="mt-6 text-red-600 flex" onClick={handleToggleShowAll}>
            <span>{showAll ? "Show Less" : "Show All"}</span>
            <img src={showAll ? "./up.svg" : "./down.svg"} alt="." />
          </button>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Project;
