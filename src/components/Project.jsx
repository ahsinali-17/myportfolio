import React from "react";
import "./Projects.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Project = () => {
  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const showAll = () => {
    const hprojects = document.querySelector(".h-projects");
    const show = document.getElementById("show");
    const hide = document.getElementById("hide");
    if (hprojects?.style.display === "none") {
      hprojects.style.display = "flex";
      hide.src = "./up.svg";
      show.innerHTML = "Show Less";
    } else if (hprojects?.style.display === "flex") {
      hprojects.style.display = "none";
      hide.src = "./down.svg";
      show.innerHTML = "Show All";
    }
  };

  return (
    <main className="m-0 py-6 min-h-[100vh] text-white p-0">
      <section className="second w-full mt-[10vh] mb-6">
        <h1
          className="text-4xl font-semibold w-5/6 mx-auto mb-4"
          data-aos="flip-up"
        >
          Projects
        </h1>
        <div className="projects flex flex-wrap items-center justify-center gap-8 w-full -z-20">
          <div
            className="pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="connectify shadoww"
              href="https://github.com/ahsinali-17/connectify"
              target="_blank"
            ></a>
            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Connectify
              </h3>
              <p>
                A feature-rich MERN-stack social media application with complete
                user authentication/ authorization.
              </p>
            </div>
          </div>

          <div
            className="pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="pass shadoww"
              href="https://github.com/ahsinali-17/Password-Manager.git"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Password - Manager
              </h3>
              <p>
                A MERN-stack app to store passwords and related info using
                mongoDb. Features like Edit, delete and copy are enabled.
              </p>
            </div>
          </div>

          <div
            className="pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="todolist shadoww"
              href="https://github.com/ahsinali-17/TSK-000-42"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                TodoList
              </h3>
              <p>
                A Firebase + react app to keep record of your daily tasks(done
                or to be done!) with user authentication and history access.
              </p>
            </div>
          </div>
        </div>

        <div
          className="h-projects flex-wrap items-center justify-center gap-8 w-full"
          style={{ display: "none" }}
        >
          <div
            className="h-pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="spotify shadoww"
              href="https://github.com/ahsinali-17/SPOTIFY---clone.git"
              target="_blank"
            ></a>
            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Spotify - clone
              </h3>
              <p>
                Spotify clone with a functional music player which also allows
                to access different albums to listen related songs....
              </p>
            </div>
          </div>

          <div
            className="h-pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="ttt shadoww"
              href="https://github.com/ahsinali-17/tic-tac-toe.git"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Tic - Tac - Toe
              </h3>
              <p>
                2 player React game with player vs computer mode using React
                router and undo feature is enabled using localStorage.
              </p>
            </div>
          </div>

          <div
            className="h-pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="dailynews shadoww"
              href="https://github.com/ahsinali-17/dailyNEWS.git"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Daily News
              </h3>
              <p>
                A react app which uses fetch current news and updated using news
                api and displays them categorically.
              </p>
            </div>
          </div>

          <div
            className="h-pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="dice-game shadoww"
              href="https://github.com/ahsinali-17/Dice-Game.git"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Dice game
              </h3>
              <p>
                A React game in whuch player has to guess the dice number right
                to get points otherwise 2 points will be deducted.
              </p>
            </div>
          </div>
          <div
            className="h-pro flex flex-col items-center justify-center bg-gray-500 p-6 mt-3 lg:w-1/4 h-[55vh] rounded-lg gap-8 w-5/6 cursor-pointer"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <a
              className="amazon shadoww"
              href="https://github.com/ahsinali-17/Amazon-clone-UI-.git"
              target="_blank"
            ></a>

            <div>
              <h3 className="text-center text-2xl font-semibold mb-2">
                Amazon UI clone
              </h3>
              <p>
                Amazon UI clone using HTML and CSS. It is a responsive clone of
                Amazon website.
              </p>
            </div>
          </div>
        </div>

        <div className="all-proj flex justify-center" onClick={showAll}>
          <button className="mt-6 text-red-600 flex">
            <span id="show">Show All</span>
            <img id="hide" src="./down.svg" alt="." />
          </button>
        </div>
      </section>
      <hr className="mx-20 relative" />
    </main>
  );
};

export default Project;
