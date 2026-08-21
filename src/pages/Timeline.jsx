import { useRef } from "react";
import { education, experience } from "../data/Data";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  const combinedArray = [...experience, ...education];

  return (
    <main className="mb-6 min-h-[70vh] text-white p-0">
      <section className="section-shell fifth flex flex-col justify-center gap-6">
        <div>
          <p className="section-kicker">JOURNEY</p>
          <h1 className="timeline-heading mt-3 text-4xl lg:text-5xl font-semibold">
            Experience & Education
          </h1>
        </div>
        <VerticalTimeline>
          {combinedArray.map((exp, index) => {
            return (
              <VerticalTimelineElement
                id={`${exp.id}`}
                key={index}
                icon={
                  <img
                    src={exp.img}
                    alt={`${exp.role || exp.degree} at ${exp.company || exp.school}`}
                    loading="lazy"
                    className="w-full h-full rounded-full object-contain bg-white"
                  />
                }
                contentStyle={{
                  background: "var(--color-surface)",
                  color: "var(--color-text)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid var(--color-surface)",
                }}
                date={exp.date}
              >
                <h3 className="font-semibold text-lg">
                  {exp?.role ? exp?.role : exp?.degree}
                </h3>
                <h4 className="font-semibold text-md text-[var(--color-secondary)]">
                  {exp?.company ? exp.company : exp.school}
                </h4>
                <p className="text-xs lg:text-sm font-medium text-[var(--color-text-muted)]">
                  {exp.desc}
                </p>
                <span className="flex gap-2 justify-center px-2 flex-wrap text-[var(--color-primary)]">
                  {exp.grade
                    ? exp.grade
                    : exp.skills.map((skill) => (
                        <span
                          className="rounded-full border border-[var(--color-border)] px-2 py-1 text-xs"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                </span>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Timeline;
