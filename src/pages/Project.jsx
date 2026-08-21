import { useState, useRef } from "react";
import { projects } from "../data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) {
        gsap.set(
          [
            ".section-kicker",
            ".projects-heading",
            ".project-card",
            ".all-proj",
          ],
          { autoAlpha: 1, clearProps: "transform" },
        );
        return;
      }

      // Header animate
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .fromTo(
          ".section-kicker",
          { autoAlpha: 0, y: 15 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
        )
        .fromTo(
          ".projects-heading",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.25",
        );

      // Cards animate - individually on scroll!
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Animate the button at the bottom
      gsap.fromTo(
        ".all-proj",
        { autoAlpha: 0, y: 15 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".all-proj",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { dependencies: [showAll], scope: containerRef },
  );

  const displayedProjects = showAll ? projects : projects.slice(0, 5);

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
    <main
      ref={containerRef}
      className="mb-6 min-h-[70vh] text-white p-0"
      name="projects"
    >
      <section className="section-shell flex flex-col justify-center gap-6">
        <div className="w-full">
          <p className="section-kicker">SELECTED WORK</p>
          <h1 className="projects-heading mt-3 text-4xl lg:text-5xl font-semibold">
            Built for learning, shipping, and solving.
          </h1>
        </div>
        <div className="projects grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          {displayedProjects.map((project, index) => {
            const isSourceLink = project.link?.includes("github.com");
            return (
              <article
                key={project.id}
                className={`project-card surface overflow-hidden flex flex-col ${index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-2" : ""}`}
              >
                <div className="project-media aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5 lg:p-7">
                  <div>
                    <p className="section-kicker">{project.category}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {project.title}
                    </h3>
                  </div>
                  <p className="project-summary text-sm text-[var(--color-text-muted)]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.tags.map((tag) => {
                      return (
                        <span
                          key={tag}
                          className="text-xs text-[var(--color-primary)]"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm font-semibold">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${isSourceLink ? "Source code" : "Live demo"} for ${project.title}`}
                      >
                        {isSourceLink ? "Source code" : "Live demo"}{" "}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Source code for ${project.title}`}
                      >
                        Source code <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="all-proj flex justify-center">
          <button
            className="button button-secondary mt-6"
            onClick={handleToggleShowAll}
          >
            <span>{showAll ? "Show Less" : "Show All"}</span>
          </button>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Project;
