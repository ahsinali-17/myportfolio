import React, { useState } from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
<<<<<<< HEAD
    <header className="m-0 text-white h-[10vh] fixed top-0 w-full z-30">
      <nav className="flex px-12 justify-between items-center bg-violet-800 h-full w-screen">
        <div className="logo text-2xl cursor-pointer w-1/3">
=======
    <header className="navbar-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo text-sm md:text-2xl">
>>>>>>> d437a39 (updated)
          <Link
            onClick={closeMenu}
            className="logopic"
            to="home"
            smooth={true}
            duration={500}
            offset={-100}
          >
            Portfolio<span className="dot">.</span>
          </Link>
        </div>

        {/* Burger Icon */}
        <div className="burger cursor-pointer" onClick={toggleMenu}>
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
        </div>

        {/* Navigation Links */}
        <div className={`right ${menuOpen ? "open" : ""}`}>
          {["about", "skills","experience", "projects", "contact"].map((section, index) => (
            <div key={index} className="nav-item">
              <Link
                onClick={closeMenu}
                to={section}
                smooth={true}
                duration={500}
                offset={-100}
                className="hover:text-red-600 cursor-pointer"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </div>
          ))}
          <div className="github2 block md:hidden">
            <a
              href="https://github.com/ahsinali-17"
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
              href="https://github.com/ahsinali-17"
              target="_blank"
              rel="noreferrer"
            >
              <button className="github-button">
                Github Profile
              </button>
            </a>
          </div>
      </nav>
    </header>
  );
};

export default Navbar;
