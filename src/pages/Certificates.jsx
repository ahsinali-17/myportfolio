import { useRef } from "react";
import { certifications } from "../data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        gsap.set(['.section-kicker', '.cert-heading', '.cert-card'], { autoAlpha: 1, clearProps: 'transform' });
        return;
      }

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cert-heading',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      headingTl.fromTo(
        '.section-kicker',
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
      .fromTo(
        '.cert-heading',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.25'
      );

      const cards = gsap.utils.toArray('.cert-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            }
          }
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
      <section className="section-shell flex flex-col justify-center gap-6">
        <div>
          <p className="section-kicker">CREDENTIALS</p>
          <h1 className="cert-heading mt-3 text-4xl lg:text-5xl font-semibold">
          Certifications
          </h1>
        </div>
        <div className="certificates grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
          {certifications.map((cert) => {
            return (
              <div
                key={cert.id}
                className="cert-card surface relative group flex flex-col md:flex-row items-center md:max-xl:justify-center lg:justify-around px-2 py-6 min-h-fit md:max-xl:min-h-[35vh] xl:min-h-[40vh] rounded-lg gap-10 xl:gap-6 w-5/6 mx-auto hover:shadow-lg hover:shadow-black hover:bg-opacity-35 overflow-hidden"
              >
                <img
                  src={cert.img}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="w-full h-full object-contain md:object-cover rounded-lg"
                />

                <div className="cert-desc h-full p-2 md:p-3 bg-black/70 absolute left-0 w-full -bottom-[100%] group-hover:bottom-0 flex flex-col gap-3 justify-center items-center transition-all ease-in-out duration-[0.4s]">
                  <h3 className=" font-semibold mb-2">
                    <span className="flex flex-wrap justify-center text-center text-xl md:text-2xl lg:text-3xl text-[var(--color-primary)] hover:text-white hover:brightness-200 cursor-pointer">
                      {cert.title}{" "}
                    </span>
                  </h3>
                  <p className="text-center text-sm md:text-md">{cert.desc}</p>
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
