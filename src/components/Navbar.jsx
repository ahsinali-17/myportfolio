import { useEffect, useState } from "react";
import "./Navbar.css";
import { Bio } from "../data/Data";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    closeMenu();
    const element = document.getElementById(targetId);
    if (element && window.locoScroll) {
      window.locoScroll.scrollTo(element, {
        offset: -100,
        duration: 1.2,
      });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo text-sm md:text-2xl">
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "home")}
            className="logopic cursor-pointer"
          >
            Portfolio<span className="dot">.</span>
          </a>
        </div>

        {/* Burger Icon */}
        <button
          className="burger cursor-pointer"
          onClick={toggleMenu}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#ffffff"
            fill="none"
          >
            <path
              d="M4 5L20 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12L20 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 19L20 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div id="site-navigation" className={`right ${menuOpen ? "open" : ""}`}>
          {["about", "skills", "projects", "certificates", "experience", "contact"].map((section, index) => (
            <div key={index} className="nav-item">
              <a
                href={`#${section}`}
                onClick={(e) => handleScroll(e, section)}
                className="text-[var(--color-primary)] hover:text-[var(--color-text)] cursor-pointer"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </div>
          ))}
          <div className="github2 block md:hidden">
            <a
              href={Bio.github}
              target="_blank"
              rel="noreferrer"
            >
              <button className="github-button">
                Github Profile
              </button>
            </a>
          </div>
        </div>

        <div className="github">
          <a
              href={Bio.github}
            target="_blank"
            rel="noreferrer"
          >
            <button className="github-button">
              <img src="/github.svg" width={24} alt="github" className="inline-block mr-3" />
              Github Profile
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
