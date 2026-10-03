import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">William<span>West</span></div>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="/William_West_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
        <li><a href="https://github.com/WilliamWest223" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href="https://linkedin.com/in/william-west" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
      </ul>
    </nav>
  );
}