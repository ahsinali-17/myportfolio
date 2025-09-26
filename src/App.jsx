import React from 'react'
import { Element } from 'react-scroll'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Project from './components/Project'
import Contact from './components/Contact'
import BgAnimation from './components/HeroBgAnimation'
import Timeline from './components/Timeline'

const App = () => {
  return (
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
    </div>
  )
}

export default App
