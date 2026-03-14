import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact-text">
        I'm currently looking for software engineering internship opportunities. 
        Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      <a href="mailto:your.email@example.com" className="btn-outline">
        Say Hello
      </a>
    </section>
  );
}