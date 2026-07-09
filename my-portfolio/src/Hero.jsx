import React from 'react';
import heroImg from './assets/hero.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="terminal-badge">
          <span className="blink-dot"></span>
          OPEN TO SUMMER 2027 INTERNSHIPS
        </div>
        <h1 className="hero-title">William West</h1>
        <h2 className="hero-subtitle">Computer Science Student @ University of South Carolina</h2>
        <p className="hero-text">
          Rising sophomore studying computer science. I've been building team software
          projects in Java, working through C++ down at the pointer level, and I'm
          currently teaching myself full-stack web development — starting with this site.
        </p>
        <a href="#projects" className="btn-primary">
          See What I've Built
        </a>
      </div>
      <div className="hero-visuals">
        <img src={heroImg} alt="Illustration" className="main-img" />
        <img src={reactLogo} alt="React" className="floating-icon icon-react" />
        <img src={viteLogo} alt="Vite" className="floating-icon icon-vite" />
      </div>
    </section>
  );
}
