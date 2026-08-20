import { useRef } from "react";
import { skills } from "../data/Data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const getSkillLevelMeta = (level) => {
  if (level >= 90) {
    return {
      label: "Expert",
      className: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    };
  }

  if (level >= 85) {
    return {
      label: "Advanced",
      className: "border-sky-400/30 bg-sky-500/10 text-sky-300",
    };
  }

  if (level >= 80) {
    return {
      label: "Intermediate",
      className: "border-amber-400/30 bg-amber-500/10 text-amber-300",
    };
  }

  return {
    label: "Proficient",
    className: "border-[var(--color-border)] bg-white/5 text-[var(--color-text-muted)]",
  };
};

const Services = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      [".skills-title", ".skills-intro", ".skill-card"],
      reduceMotion ? { autoAlpha: 1 } : { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: reduceMotion ? 0 : 0.5, stagger: reduceMotion ? 0 : 0.08, ease: "power3.out" },
    );
  }, sectionRef);

  return (
    <main ref={sectionRef} className="mb-6 min-h-[30vh] text-white p-0">
      <section className="section-shell third flex flex-col justify-center gap-10">
        <div>
          <p className="section-kicker">CAPABILITIES</p>
          <h1 className="skills-title mt-3 text-4xl lg:text-5xl font-semibold">
            Tools I use to build and ship.
          </h1>
          <p className="skills-intro mt-4 max-w-2xl text-[var(--color-text-muted)]">
            A practical toolkit across product interfaces, APIs, data, and AI-assisted workflows.
          </p>
        </div>
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`s.${
                  index + 1
                } skill-card surface flex flex-col items-start justify-start p-5 lg:p-6 gap-5`}
              >
                <h2 className="text-2xl font-semibold">
                  {skill.title}
                </h2>
                <div className="w-full skill grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {skill.skills.map((item, index) => {
                    const levelMeta = getSkillLevelMeta(item.skillLevel ?? 0);

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 border-t border-[var(--color-border)] py-3"
                      >
                        <img src={item.image} alt="" aria-hidden="true" loading="lazy" width={30} height={30} className="h-8 w-8 rounded-md object-contain" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold">{item.name}</p>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] ${levelMeta.className}`}
                              aria-label={`Skill level: ${levelMeta.label}`}
                            >
                              {levelMeta.label}
                            </span>
                          </div>
                          {item.skillExperience && <p className="text-xs text-[var(--color-text-muted)]">{item.skillExperience}</p>}
                        </div>
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
