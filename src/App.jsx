import React from 'react'
import Navbar from './components.jsx/Navbar';
import Landing from './components.jsx/Landing';
import Marque from './components.jsx/Marque';
import About from './components.jsx/About';
import Eye from './components.jsx/Eye';
function App() {
  return (
        <div className='w-full min-h-screen text-green-600'>

      <Navbar />
      <Landing />
      <Marque />
      <About />
      <Eye />
      

    </div>
    
  )
}

export default App
