import Navbar from './components/Navbar';
import BgAnimation from './components/HeroBgAnimation';
import { Element } from 'react-scroll';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Project from './components/Project';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import AskAboutMeButton from './components/AskAboutMeButton';
import Chat from './components/Chat';
import { Routes, Route } from 'react-router-dom';

const MainSections = () => (
  <div className="relative overflow-x-hidden">
    <Navbar />
    <BgAnimation />
    <Element name="home">
      <Home />
    </Element>
    <Element name="about">
      <About />
    </Element>
    <Element name="skills">
      <Skills />
    </Element>
    <Element name="projects">
      <Project />
    </Element>
    <Element name="experience">
      <Timeline />
    </Element>
    <Element name="contact">
      <Contact />
    </Element>
    <AskAboutMeButton />
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainSections />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
