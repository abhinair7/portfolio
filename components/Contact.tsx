import { profile } from "@/lib/content";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, "")}` },
  { label: "LinkedIn", value: "/in/abhishek-nair", href: profile.linkedin },
  { label: "GitHub", value: "/abhinair7", href: profile.github },
];

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-in">
        <div className="reveal">
          <span className="eyebrow contact-eyebrow">05 — Contact</span>
          <h2 className="display">Let&apos;s build something <em>people trust</em>.</h2>
          <p className="contact-lede">
            Open to data engineering, AI/ML engineering, analytics and digital transformation roles. Based in Boston, MA — open to relocation.
          </p>
        </div>
        <div className="contact-list reveal-c">
          {links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a key={l.label} href={l.href} className="contact-item" {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                <span className="k">{l.label}</span>
                <span className="v">{l.value}</span>
                <span className="a">→</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
