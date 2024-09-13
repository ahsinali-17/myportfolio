import React from "react";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const handleClick = () => {
    const Links = document.querySelector(".right");
    if (Links.style.display === "block") {
      Links.style.display = "none";
    } else {
      Links.style.display = "block";
    }
  };

  const handleShow = () => {
    const Links = document.querySelector(".right");
    if(Links.style.display === "block") 
    Links.style.display = "none";
  };

  return (
    <header className="m-0 text-white h-[10vh] fixed top-0 w-full overflow-hidden">
      <nav className="flex px-12 justify-between items-center bg-violet-800 h-full w-screen">
        <div className="logo text-2xl cursor-pointer w-1/3">
          <Link
          onClick={handleShow}
            className="logopic hover:text-red-600"
            to="home"
            smooth={true}
            duration={500}
            offset={-70}
          >
            Portfolio<span className="dot text-4xl text-red-600">.</span>
          </Link>
        </div>

        <div className="burger" onClick={handleClick}>
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

        <div className="right">
          <div>
            <Link
            onClick={handleShow}
              to="about"
              smooth={true}
              duration={500}
              className="hover:text-red-600 cursor-pointer"
            >
              About
            </Link>
          </div>
          <div>
            <Link
            onClick={handleShow}
              to="services"
              smooth={true}
              duration={500}
              className="hover:text-red-600 cursor-pointer"
            >
              Services
            </Link>
          </div>
          <div>
            <Link
            onClick={handleShow}
              to="projects"
              smooth={true}
              duration={500}
              className="hover:text-red-600 cursor-pointer"
            >
              Projects
            </Link>
          </div>
          <div>
            <Link
            onClick={handleShow}
              to="contact"
              smooth={true}
              duration={500}
              className="hover:text-red-600 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
