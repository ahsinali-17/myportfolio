import React, { useEffect } from "react";
import { education, experience } from "../data/Data";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const Timeline = () => {
  const combinedArray = [...experience, ...education]

  return (
    <main className="mb-6 min-h-[70vh] text-white p-0">
      <section className="fifth w-[90%] mx-auto my-[10vh] flex flex-col justify-center gap-6">
        <h1 className="text-4xl font-semibold w-5/6 mx-auto" data-aos="flip-up">
          Experience & Education
        </h1>
        <VerticalTimeline >
            {combinedArray.map((exp, index) => {
               return( 
              <VerticalTimelineElement
              id={`${exp.id}`}
              key={index}
              
              icon={
                <img
                  src={exp.img}
                  alt="icon"
                  className="w-full h-full rounded-full object-contain bg-white"
                />
              }

                contentStyle={{
                  background: "rgba(78, 80, 81, 0.537)",
                  color: "#b067bf",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  border: "1px solid rgb(146, 147, 148)",
                  borderRadius: "6px"
                }}
                contentArrowStyle={{
                    borderRight: "7px solid rgb(104, 104, 104)"
                }}
                date={exp.date}
              >
                <h3 className="font-semibold text-lg">{exp?.role ? exp?.role : exp?.degree}</h3>
                <h4 className="font-semibold text-md text-violet-300 text-opacity-45">{exp?.company ? exp.company : exp.school}</h4>
                <p className="text-xs lg:text-sm font-medium text-white">{exp.desc}</p>
                <span className="flex gap-2 justify-center px-2 flex-wrap text-sky-400">{exp.grade ? exp.grade : exp.skills.map((skill,index)=> <span key={index}>{skill}</span>
            )}</span>
              </VerticalTimelineElement>
               )
            })}
          </VerticalTimeline>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Timeline;
