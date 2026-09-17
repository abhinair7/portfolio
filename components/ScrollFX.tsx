"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function ScrollFX() {
  const progressRef = useRef<HTMLDivElement>(null);
  const bttRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const nav = document.querySelector(".nav");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const groups = Array.from(document.querySelectorAll<HTMLElement>(".reveal-c"));
    const kids = groups.flatMap((g) => Array.from(g.children) as HTMLElement[]);
    // Live set of elements that are currently hidden and awaiting reveal.
    const pending = new Set<HTMLElement>([...reveals, ...kids]);

    const reveal = (el: HTMLElement) => { el.style.opacity = ""; el.style.transform = ""; pending.delete(el); };

    let io: IntersectionObserver | null = null;
    let sweepTimer = 0;

    if (!reduced) {
      try {
        pending.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(22px)"; });

        const play = (els: HTMLElement[], stag: boolean) => {
          animate(els, {
            opacity: [0, 1], translateY: [22, 0], duration: 720,
            delay: stag ? stagger(85) : 0, ease: "out(3)",
            onComplete: () => els.forEach((e) => { e.style.transform = ""; e.style.opacity = ""; pending.delete(e); }),
          });
        };

        const heroEls = reveals.filter((el) => el.closest(".hero"));
        if (heroEls.length) {
          animate(heroEls, {
            opacity: [0, 1], translateY: [24, 0], duration: 820,
            delay: stagger(90, { start: 120 }), ease: "out(3)",
            onComplete: () => heroEls.forEach((e) => { e.style.transform = ""; e.style.opacity = ""; pending.delete(e); }),
          });
        }

        io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              const el = e.target as HTMLElement;
              if (el.classList.contains("reveal-c")) play(Array.from(el.children) as HTMLElement[], true);
              else play([el], false);
              io!.unobserve(el);
            }
          },
          { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
        );
        reveals.filter((el) => !el.closest(".hero")).forEach((el) => io!.observe(el));
        groups.forEach((g) => io!.observe(g));

        document.querySelectorAll<HTMLElement>(".counter").forEach((el) => {
          const target = Number(el.dataset.target || "0");
          const c = new IntersectionObserver((entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              const obj = { v: 0 };
              animate(obj, { v: target, duration: 1600, ease: "out(4)", onUpdate: () => { el.textContent = Math.floor(obj.v).toLocaleString(); } });
              c.unobserve(e.target);
            }
          }, { threshold: 0.5 });
          c.observe(el);
        });

        // Safety sweep: any element scrolled well into view but still hidden gets
        // force-revealed. Runs on an interval until nothing is pending. This makes
        // permanently-hidden content impossible even if the observer/engine misfires.
        sweepTimer = window.setInterval(() => {
          if (!pending.size) { clearInterval(sweepTimer); return; }
          const vh = window.innerHeight;
          for (const el of Array.from(pending)) {
            const r = el.getBoundingClientRect();
            const inView = r.top < vh * 0.72 && r.bottom > 0;
            if (inView && parseFloat(getComputedStyle(el).opacity) < 0.05) reveal(el);
          }
        }, 400);
      } catch {
        pending.forEach(reveal);
      }
    }

    // Scroll chrome (progress, nav state, back-to-top, active link)
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
        if (bttRef.current) bttRef.current.style.opacity = y > 600 ? "1" : "0";
        nav?.classList.toggle("scrolled", y > 8);
        let current = "";
        for (const s of sections) if (y >= s.offsetTop - 120) current = s.id;
        for (const l of navLinks) l.classList.toggle("active", l.getAttribute("href") === `#${current}`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
      if (sweepTimer) clearInterval(sweepTimer);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <button className="back-to-top" ref={bttRef} style={{ opacity: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>
    </>
  );
}
