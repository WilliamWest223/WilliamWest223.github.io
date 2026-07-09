import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title"><span>About</span> Me</h2>
      <p className="about-text">
        I'm a computer science major at the University of South Carolina. So far my
        coursework has taken me through data structures and algorithms in Java, advanced
        programming in C++ (inheritance, operator overloading, streams, and manual memory
        management), and software engineering — where I've worked on multi-semester team
        projects using the full lifecycle: requirements elicitation, UML design, design
        patterns, JUnit testing, and git branching workflows.
      </p>
      <p className="about-text">
        Outside of class I'm building out my web development and AI skills. This portfolio
        (React + Vite) is step one; a full-stack app with an LLM-powered feature is next
        on the roadmap. I like understanding how things work a layer below where I'm
        writing code, and I'd rather ship something real and small than talk about
        something big and imaginary.
      </p>
    </section>
  );
}
