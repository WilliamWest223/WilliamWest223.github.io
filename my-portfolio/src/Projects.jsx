import React from 'react';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      
      <div className="projects-grid">
        
        {/* Project 1 */}
        <div className="project-card">
          <h3 className="project-title">Distributed Task Queue</h3>
          <p className="project-desc">
            A backend system design project focused on handling asynchronous tasks reliably. 
            Implemented using core Java concepts to demonstrate an understanding of concurrency and data structures.
          </p>
          <div className="project-tags">
            <span className="project-tag">Java</span>
            <span className="project-tag">System Design</span>
          </div>
        </div>
        
        {/* Project 2 */}
        <div className="project-card">
          <h3 className="project-title">Algorithm Visualizer</h3>
          <p className="project-desc">
            An interactive web application built to visualize common sorting and pathfinding algorithms in real-time, helping students understand time complexity.
          </p>
          <div className="project-tags">
            <span className="project-tag">React</span>
            <span className="project-tag">Algorithms</span>
          </div>
        </div>

      </div>
    </section>
  );
}