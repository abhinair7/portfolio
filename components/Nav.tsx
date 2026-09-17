export function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-logo">
          A<span>.</span>NAIR
        </a>
        <div className="nav-links">
          <a href="#journey" className="nav-link">Story</a>
          <a href="#projects" className="nav-link">Work</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#education" className="nav-link">Education</a>
          <a href="#tailor" className="nav-link">Tailor</a>
        </div>
        <a href="#contact" className="nav-cta">Contact</a>
      </div>
    </nav>
  );
}
