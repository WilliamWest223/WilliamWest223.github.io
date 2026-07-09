import React from 'react';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title"><span>Featured</span> Projects</h2>

      <div className="projects-grid">

        {/* Interview Prep MM */}
        <div className="project-card">
          <div className="project-tags">
            <span className="project-tag accent">Java</span>
            <span className="project-tag">JavaFX</span>
            <span className="project-tag">JUnit</span>
          </div>
          <h3 className="project-title">Interview Prep MM</h3>
          <p className="project-desc">
            An interview-prep platform built with a 5-person team for my software
            engineering course. Users browse and solve practice questions, submit
            solutions, comment, vote, bookmark, and track streaks and goals. 50+ Java
            classes with a JavaFX UI, JSON persistence, a Facade design pattern, and a
            full JUnit test suite — developed with git branching, issues, UML design
            docs, and a Figma prototype.
          </p>
          <div className="project-links">
            <a href="https://github.com/WilliamWest223/method_men_interview_prep" target="_blank" rel="noopener noreferrer">Code</a>
            <a href="https://youtu.be/7nblbT_5eB0" target="_blank" rel="noopener noreferrer">Demo Video</a>
          </div>
        </div>

        {/* Escape Room */}
        <div className="project-card">
          <div className="project-tags">
            <span className="project-tag secondary">Java</span>
            <span className="project-tag">JavaFX</span>
            <span className="project-tag">UML</span>
          </div>
          <h3 className="project-title">Online Escape Room</h3>
          <p className="project-desc">
            A team-built escape room game from my first semester of software
            engineering. We ran the full process: requirements elicitation interviews,
            a requirements document, UML class diagrams, and a JavaFX/Maven
            implementation. My first real experience turning stakeholder interviews
            into working software.
          </p>
          <div className="project-links">
            <a href="https://github.com/WilliamWest223/Name-Needed-Escape-Room" target="_blank" rel="noopener noreferrer">Code</a>
          </div>
        </div>

        {/* Portfolio */}
        <div className="project-card">
          <div className="project-tags">
            <span className="project-tag accent">React</span>
            <span className="project-tag">Vite</span>
            <span className="project-tag">GitHub Pages</span>
          </div>
          <h3 className="project-title">This Portfolio</h3>
          <p className="project-desc">
            The site you're on right now — my first self-taught web project. Built
            with React and Vite as component-based single-page site and deployed
            from my GitHub. It's also where every project on my summer roadmap
            will land next.
          </p>
          <div className="project-links">
            <a href="https://github.com/WilliamWest223/WilliamWest223.github.io" target="_blank" rel="noopener noreferrer">Code</a>
          </div>
        </div>

        {/* In progress */}
        <div className="project-card in-progress">
          <div className="project-tags">
            <span className="project-tag secondary">Full-Stack</span>
            <span className="project-tag">AI</span>
            <span className="project-tag">In Progress</span>
          </div>
          <h3 className="project-title">Study Tool — Coming Soon</h3>
          <p className="project-desc">
            Currently building: a full-stack study app with a React frontend, a real
            backend and database, and an LLM-powered feature that generates practice
            quizzes from lecture notes. Follow along on my GitHub.
          </p>
          <div className="project-links">
            <a href="https://github.com/WilliamWest223" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>

      </div>
    </section>
  );
}
