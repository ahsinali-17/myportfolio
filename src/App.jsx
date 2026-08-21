import { Suspense, lazy, useEffect } from "react";
import Navbar from "./components/Navbar";
import BgAnimation from "./components/HeroBgAnimation";
import Home from "./pages/Home";
import AskAboutMeButton from "./components/AskAboutMeButton";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import LocomotiveScroll from "locomotive-scroll";
import DynamicBg from "../src/components/DynamicBg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavy components
const About = lazy(() => import("./pages/About"));
const Skills = lazy(() => import("./pages/Skills"));
const Project = lazy(() => import("./pages/Project"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Contact = lazy(() => import("./pages/Contact"));
const Chat = lazy(() => import("./pages/Chat"));
const Certificates = lazy(() => import("./pages/Certificates"));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const MainSections = () => (
  <div className="relative overflow-x-hidden">
    <Loader />
    <Navbar />
    <BgAnimation />
    <DynamicBg />
    <div id="home">
      <Home />
    </div>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="about">
        <About />
      </div>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="skills">
        <Skills />
      </div>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="projects">
        <Project />
      </div>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="certificates">
        <Certificates />
      </div>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="experience">
        <Timeline />
      </div>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <div id="contact">
        <Contact />
      </div>
    </Suspense>
    <AskAboutMeButton />
  </div>
);

const App = () => {
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.8,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        autoRaf: false, // Let GSAP drive RAF for perfect synchronization
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    window.locoScroll = scroll;

    // Sync Locomotive/Lenis scroll events with GSAP ScrollTrigger
    scroll.lenisInstance?.on("scroll", ScrollTrigger.update);

    // Sync GSAP's ticker with Lenis RAF loop
    const updateGsapTicker = (time) => {
      scroll.lenisInstance?.raf(time * 1000);
    };
    gsap.ticker.add(updateGsapTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsapTicker);
      scroll.destroy();
      window.locoScroll = null;
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainSections />} />
      <Route
        path="/chat"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Chat />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
