import React from 'react'
import { Element } from 'react-scroll'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Project from './components/Project'
import Contact from './components/Contact'
import './App.css'

const App = () => {
  return (
    <div className='relative overflow-x-hidden'>
      <Navbar />
      
      <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="services">
        <Services />
      </Element>
      <Element name="projects">
        <Project />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </div>
  )
}

export default App
