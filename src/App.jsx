import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Project from './components/Project'
import Contact from './components/Contact'
import './App.css'
const App = () => {
  let router = createBrowserRouter([
    {
      path: '/',
      element: <div className='relative'><Navbar/><><Home/><About/><Services/><Project/><Contact/></></div>
    },
    {
      path: '/about',
      element: <><Navbar/><About/></>
    },
    {
      path: '/services',
      element: <><Navbar/><Services/></>
    },
    {
      path: '/projects',
      element: <><Navbar/><Project/></>
    },
    {
      path: '/contact',
      element: <><Navbar/><Contact/></>
    }
  ])
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App