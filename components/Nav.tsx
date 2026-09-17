export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          A<span>.</span>NAIR
        </a>
        <div className="nav-links">
          <a href="#matcher" className="nav-link">AI Match</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#projects" className="nav-link">Work</a>
          <a href="#education" className="nav-link">Education</a>
        </div>
        <a href="#contact" className="nav-cta">Contact</a>
      </div>
    </nav>
  );
}
