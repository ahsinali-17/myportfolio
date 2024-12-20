import React,{ useState, useEffect } from "react";
import AOS from "aos";
import {projects} from "../data/Data";
import "aos/dist/aos.css";
import {Link} from "react-scroll";

const Project = () => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  
  return (
    <main className="mb-6 min-h-[70vh] text-white p-0" name="projects">
    <section className="fifth w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-6">
        <h1
          className="text-4xl font-semibold w-5/6 mx-auto"
          data-aos="flip-up"
        >
          Projects
        </h1>
        <div className="projects grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          {displayedProjects.map((project) => {
            return(
              <div key={project.id} 
              className="pro flex flex-col items-center md:max-xl:justify-center lg:justify-around bg-gray-700 px-2 py-6 min-h-[45vh] md:max-xl:min-h-[35vh] xl:min-h-[40vh] rounded-lg gap-10 xl:gap-6 w-5/6 mx-auto  hover:shadow-lg hover:shadow-black hover:bg-opacity-35"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
            >
             <img src= {project.image} alt="image" className="w-full h-[150px] md:max-lg:h-[300px] lg:h-[150px] object-cover rounded-lg"/>

              <div className="flex flex-col gap-3 justify-center items-center">
                <h3 className=" font-semibold mb-2">
                 <a href={project.github} target="_blank" rel="noreferrer" className="flex flex-wrap justify-center text-center text-2xl lg:text-3xl text-violet-400 hover:text-white hover:brightness-200 cursor-pointer">{project.title} <span className="text-xs lg:text-sm text-red-500 text-center">{"(" + project.category + ")"}</span></a> 
                </h3>
                <p className="text-center">
                  {project.description.slice(0,150) + "..."}
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
         
        <Link to="projects" smooth={true}
            duration={300}
            offset={-100} className="all-proj flex justify-center" onClick={() => setShowAll(!showAll)}>
          <button className="mt-6 text-red-600 flex">
            <span>{showAll ? "Show Less" : "Show All"}</span>
            <img src={showAll ? "./up.svg" : "./down.svg"} alt="." />
          </button>
        </Link>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Project;
