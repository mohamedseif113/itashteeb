"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FadeUpOptions = {
  delay?: number;
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
};

export function useFadeUp<T extends HTMLElement>(
  options: FadeUpOptions = {},
) {
  const ref = useRef<T>(null);
  const {
    delay = 0,
    stagger = 0.12,
    y = 40,
    duration = 0.8,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll("[data-animate]");
    const items = targets.length > 0 ? targets : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger, start, y]);

  return ref;
}

export function useHeroIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-title]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
      )
        .fromTo(
          "[data-hero-subtitle]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-extra]",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-stats]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-form]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-hint]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
