"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollFX() {
  const progressRef = useRef<HTMLDivElement>(null);
  const bttRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
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

    if (reduced) return () => window.removeEventListener("scroll", onScroll);

    root.classList.add("js-ready");
    gsap.registerPlugin(ScrollTrigger);

    const animateCounters = () =>
      document.querySelectorAll<HTMLElement>(".counter").forEach((el) => {
        const target = Number(el.dataset.target || "0");
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.floor(obj.v).toLocaleString(); },
        });
      });

    const ctx = gsap.context(() => {
      // Hero intro
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(".nav", { y: -56, opacity: 0, duration: 0.6, ease: "power3.out" });
      const heroReveals = gsap.utils.toArray<HTMLElement>(".hero .reveal");
      tl.to(heroReveals, { opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power3.out" }, "-=0.15");

      // Counters when the stat band arrives
      ScrollTrigger.create({ trigger: ".stat-band", start: "top 82%", once: true, onEnter: animateCounters });

      // Generic single reveals (skip hero — handled above)
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        if (el.closest(".hero")) return;
        gsap.to(el, { scrollTrigger: { trigger: el, start: "top 86%", once: true }, opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      });

      // Staggered groups
      gsap.utils.toArray<HTMLElement>(".reveal-c").forEach((c) => {
        gsap.to(Array.from(c.children), {
          scrollTrigger: { trigger: c, start: "top 84%", once: true },
          opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power3.out",
        });
      });
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
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
