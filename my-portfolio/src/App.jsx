import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

function App() {
  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
      </main>
      <Contact />
      <Footer />
    </div>
  )
}

export default App
