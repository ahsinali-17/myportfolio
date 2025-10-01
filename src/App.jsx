import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import BgAnimation from './components/HeroBgAnimation';
import { Element } from 'react-scroll';
import Home from './components/Home';
import AskAboutMeButton from './components/AskAboutMeButton';
import { Routes, Route } from 'react-router-dom';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Project = lazy(() => import('./components/Project'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
const Chat = lazy(() => import('./components/Chat'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const MainSections = () => (
  <div className="relative overflow-x-hidden">
    <Navbar />
    <BgAnimation />
    <Element name="home">
      <Home />
    </Element>
    <Suspense fallback={<LoadingSpinner />}>
      <Element name="about">
        <About />
      </Element>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Element name="skills">
        <Skills />
      </Element>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Element name="projects">
        <Project />
      </Element>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Element name="experience">
        <Timeline />
      </Element>
    </Suspense>
    <Suspense fallback={<LoadingSpinner />}>
      <Element name="contact">
        <Contact />
      </Element>
    </Suspense>
    <AskAboutMeButton />
  </div>
);

const App = () => {
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
