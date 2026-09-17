import Image from "next/image";
import { education, certification } from "@/lib/content";

export function Education() {
  return (
    <section className="section tinted" id="education">
      <div className="section-in">
        <div className="section-head reveal">
          <span className="eyebrow accent">04 — Background</span>
          <h2 className="display h2">Education &amp; <em>honors</em></h2>
        </div>

        <div className="edu-grid reveal-c">
          {education.map((e) => (
            <div className="edu-card" key={e.school}>
              <div className="edu-logo">
                <Image src={e.logo} alt={e.school} width={30} height={30} />
              </div>
              <h3>{e.school}</h3>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-date">{e.date}</div>
              <div className="edu-course">
                {e.coursework.map((c) => <span key={c}>{c}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="cert reveal">
          <div className="cert-key">
            <Image src={certification.keyImg} alt="Beta Gamma Sigma key" width={54} height={122} style={{ height: "auto" }} />
          </div>
          <div className="cert-info">
            <h3>{certification.title}</h3>
            <p>{certification.subtitle}</p>
            <div className="cert-badges">
              {certification.badges.map((b) => <span key={b}>{b}</span>)}
            </div>
            <div className="cert-date">{certification.date}</div>
          </div>
          <div className="cert-badge-img">
            <Image src={certification.memberImg} alt="Beta Gamma Sigma member badge" width={200} height={114} style={{ height: "auto" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
