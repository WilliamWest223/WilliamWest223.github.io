import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <h1 className="hero-title">Hi, I'm William.</h1>
      <h2 className="hero-subtitle">Computer Science Student at UofSC</h2>
      <p className="hero-text">
        I am a sophomore passionate about system design, backend infrastructure, and building 
        clean, efficient applications. I am actively seeking software engineering internships 
        to apply my skills in real-world environments.
      </p>
      <a href="#projects" className="btn-primary">
        View My Work
      </a>
    </section>
  );
}