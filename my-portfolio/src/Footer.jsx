import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} William West. Built with React & Vite.
      </p>
    </footer>
  );
}