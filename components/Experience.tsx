"use client";

import { useState } from "react";
import Image from "next/image";
import { experience } from "@/lib/content";
import { useTailor } from "./TailorContext";

export function Experience() {
  const { result } = useTailor();
  const [active, setActive] = useState<string>(experience[0].id);

  const order = result
    ? result.experience.map((e) => e.index).filter((i) => i >= 0 && i < experience.length)
    : experience.map((_, i) => i);
  const overrides = new Map(result?.experience.map((e) => [e.index, e]));
  const list = order.map((i) => ({ entry: experience[i], override: overrides.get(i) }));

  return (
    <section className="section tinted" id="experience">
      <div className="section-in">
        <div className="section-head reveal">
          <span className="eyebrow accent">Experience — in detail</span>
          <h2 className="display h2">The <em>record</em></h2>
          <p className="sub">
            The same journey, as a hiring manager reads it — roles, dates, and what shipped. Select a role to expand the detail.
          </p>
        </div>

        <div className="timeline reveal-c">
          {list.map(({ entry, override }) => {
            const isActive = active === entry.id;
            const bullets = override?.bullets ?? entry.bullets;
            const impacts = override?.impacts ?? entry.impacts;
            return (
              <div key={entry.id} className={`tl-item${isActive ? " active" : ""}`}>
                <div className="tl-head" onClick={() => setActive(isActive ? "" : entry.id)}>
                  <div className="tl-date">
                    {entry.start} — {entry.end}
                    <span className="loc">{entry.location}</span>
                  </div>
                  <div className="tl-logo">
                    <Image src={entry.logo} alt={entry.company} width={30} height={30} />
                  </div>
                  <div className="tl-idwrap">
                    <div className="tl-role">{entry.role}</div>
                    <div className="tl-company">{entry.company} · {entry.type}</div>
                  </div>
                  <div className="tl-toggle" aria-hidden="true">+</div>
                </div>
                <div className="tl-body">
                  <div className="tl-body-clip">
                    <div className="tl-body-inner">
                      <ul>{bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
                      <div className="tl-impacts">
                        {impacts.map((im, j) => <span className="tl-impact" key={j}>{im}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
