"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, stagger, utils } from "animejs";

export function ScrollFX() {
  const progressRef = useRef<HTMLDivElement>(null);
  const bttRef = useRef<HTMLButtonElement>(null);

  // Scroll chrome: progress bar, nav state, back-to-top, active link. No library needed.
  useEffect(() => {
    const nav = document.querySelector(".nav");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id], header[id]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal + counters via anime.js, driven by IntersectionObserver, with a hard fail-safe.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const groups = Array.from(document.querySelectorAll<HTMLElement>(".reveal-c"));
    const groupKids = groups.flatMap((g) => Array.from(g.children) as HTMLElement[]);
    const hidden = [...reveals, ...groupKids];

    const clear = (el: HTMLElement) => { el.style.opacity = ""; el.style.transform = ""; };
    const revealAll = () => hidden.forEach(clear);

    try {
      // Hide only what we're about to animate (inline — never a persistent CSS rule).
      hidden.forEach((el) => { el.style.opacity = "0"; el.style.transform = "translateY(22px)"; });

      const show = (els: HTMLElement | HTMLElement[], stag = false) =>
        animate(els, {
          opacity: [0, 1],
          translateY: [22, 0],
          duration: 720,
          delay: stag ? stagger(85) : 0,
          ease: "out(3)",
          onComplete: () => (Array.isArray(els) ? els : [els]).forEach((e) => { e.style.transform = ""; }),
        });

      // Hero: animate in immediately, staggered.
      const heroEls = reveals.filter((el) => el.closest(".hero"));
      if (heroEls.length)
        animate(heroEls, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 820,
          delay: stagger(90, { start: 120 }),
          ease: "out(3)",
          onComplete: () => heroEls.forEach((e) => { e.style.transform = ""; }),
        });

      // Everything else reveals on scroll via IntersectionObserver (reliable, native).
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            const el = e.target as HTMLElement;
            if (el.classList.contains("reveal-c")) show(Array.from(el.children) as HTMLElement[], true);
            else show(el);
            io.unobserve(el);
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.filter((el) => !el.closest(".hero")).forEach((el) => io.observe(el));
      groups.forEach((g) => io.observe(g));

      // Counters
      document.querySelectorAll<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const io2 = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (!e.isIntersecting) continue;
              const obj = { v: 0 };
              animate(obj, {
                v: target, duration: 1600, ease: "out(4)",
                onUpdate: () => { el.textContent = Math.floor(obj.v).toLocaleString(); },
              });
              io2.unobserve(e.target);
            }
          },
          { threshold: 0.5 }
        );
        io2.observe(el);
      });

      // Fail-safe: anything still hidden inside the viewport after 2.4s is forced visible
      // (covers any environment where the animation engine or observer misbehaves).
      const failSafe = window.setTimeout(() => {
        hidden.forEach((el) => {
          if (parseFloat(getComputedStyle(el).opacity) < 0.05 && el.getBoundingClientRect().top < window.innerHeight * 0.95) clear(el);
        });
      }, 2400);
      // Absolute backstop: reveal the whole page if something is very wrong.
      const backstop = window.setTimeout(() => {
        const stuck = hidden.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.05);
        if (stuck.length > hidden.length * 0.7) revealAll();
      }, 4000);

      return () => { io.disconnect(); clearTimeout(failSafe); clearTimeout(backstop); utils.remove(hidden); };
    } catch {
      revealAll();
    }
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} />
      <button
        className="back-to-top"
        ref={bttRef}
        style={{ opacity: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
