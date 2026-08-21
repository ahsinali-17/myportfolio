import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const containerRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("PENDING");
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const userId = import.meta.env.VITE_PUBLIC_KEY;
    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(() => {
        setStatus("SUCCESS");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        setStatus("FAILED");
      })
      .finally(() => {
        setTimeout(() => {
          setStatus("");
        }, 5000); // Reset status after 5 seconds
      });
  };

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) {
        gsap.set(
          [
            ".section-kicker",
            ".contact-heading",
            ".contact-form-card",
            ".form-control",
            ".contact-btn",
          ],
          { autoAlpha: 1, clearProps: "transform" },
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".section-kicker",
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
      )
        .fromTo(
          ".contact-heading",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.25",
        )
        .fromTo(
          ".contact-form-card",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".form-control",
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .fromTo(
          ".contact-btn",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" },
          "-=0.25",
        );
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="mb-6 min-h-[60vh] text-center text-white"
    >
      <section className="section-shell">
        <p className="section-kicker">GET IN TOUCH</p>
        <h1 className="contact-heading text-4xl font-semibold mx-auto mb-4">
          Contact Me
        </h1>
        <form
          className="contact-form-card surface flex flex-col items-center justify-center gap-3 mt-6 min-h-[50vh] max-w-[42rem] w-full mx-auto p-5 sm:p-8"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="email">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email*"
            autoComplete="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name*"
            autoComplete="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="subject">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject*"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message*"
            rows={5}
            className="form-control"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            className="contact-btn button button-primary w-full sm:w-auto"
            type="submit"
            disabled={status === "PENDING"}
          >
            {status === "PENDING" ? "Sending..." : "Send message"}
          </button>
        </form>
        {status === "SUCCESS" && (
          <p className="text-center text-green-400 mt-6" aria-live="polite">
            Message sent successfully!
          </p>
        )}
        {status === "FAILED" && (
          <p
            className="text-center text-[var(--color-danger)] mt-6"
            aria-live="polite"
          >
            Failed to send message. Please try again.
          </p>
        )}
      </section>
      <footer className="flex justify-center items-center border-t border-[var(--color-border)] py-5 w-full text-sm text-[var(--color-text-muted)]">
        <span>
          <span className="text-[var(--color-secondary)] font-semibold">
            AA
          </span>
          portfolio &#169; 2025. All rights reserved.
        </span>
      </footer>
    </main>
  );
};

export default ContactForm;
