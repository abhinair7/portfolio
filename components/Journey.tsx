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

  // Scroll parallax on the backdrops + cross-fade between acts for smooth transitions.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    const acts = Array.from(root.querySelectorAll<HTMLElement>(".act"));
    const media = acts.map((a) => a.querySelector<HTMLElement>(".act-bg > *"));
    const inners = acts.map((a) => a.querySelector<HTMLElement>(".act-inner"));
    const parallax = reduce ? 0 : mobile ? 0 : 0.14;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        acts.forEach((a, i) => {
          const r = a.getBoundingClientRect();
          if (r.bottom < -80 || r.top > vh + 80) return;
          // Parallax: shift the backdrop against the scroll (desktop only).
          if (parallax && media[i]) {
            const off = r.top + r.height / 2 - vh / 2;
            media[i]!.style.transform = `translate3d(0, ${(-off * parallax).toFixed(1)}px, 0) scale(1.16)`;
          }
          // Cross-fade: fade content in as the act arrives, out as it leaves.
          if (inners[i]) {
            let op = 1;
            if (r.top > 0) op = 1 - Math.min(1, (r.top / vh) * 1.35);
            else op = 1 - Math.min(1, -r.top / (r.height * 0.82));
            inners[i]!.style.opacity = String(Math.max(0, Math.min(1, op)));
          }
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
            <div className="act-index">{a.chapter} · {a.years}</div>
            <h2 className="act-title">{a.title}</h2>
            <div className="act-role">{a.role}</div>
            <p className="act-line">{a.line}</p>
            <div className="act-stack">
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
