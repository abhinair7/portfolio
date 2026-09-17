"use client";

import { useEffect, useRef } from "react";
import { journey } from "@/lib/content";
import { BrandIcon } from "./BrandIcon";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  // Play each act's video only while it's on screen (perf + battery).
  useEffect(() => {
    const vids = Array.from(ref.current?.querySelectorAll("video") ?? []);
    if (!vids.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.2 }
    );
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <div className="journey" id="journey" ref={ref}>
      {journey.map((a) => (
        <section className="act" id={a.id} key={a.id}>
          <div className="act-bg">
            {a.media.type === "video" ? (
              <video
                src={a.media.src}
                poster={a.media.poster}
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.media.src} alt="" aria-hidden="true" />
            )}
          </div>
          <div className="act-scrim" />
          <div className="act-grain" />
          <div className="act-inner">
            <div className="act-index reveal">{a.chapter} · {a.years}</div>
            <h2 className="act-title reveal">{a.title}</h2>
            <div className="act-role reveal">{a.role}</div>
            <p className="act-line reveal">{a.line}</p>
            <div className="act-stack reveal">
              {a.icons.map((s) => (
                <span className="act-ico" key={s}><BrandIcon slug={s} /></span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
