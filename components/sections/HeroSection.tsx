"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { heroSlides } from "@/lib/data";
import { useHeroIntro } from "@/hooks/useGsapAnimations";
import { cn } from "@/lib/utils";
import { HeroSearchForm } from "./HeroSearchForm";

export function HeroSection() {
  const t = useTranslations("home");
  const ref = useHeroIntro();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-1 via-blue-700 to-blue-900"
    >
      {/* Background image slider */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              idx === activeSlide ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Colour + blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-primary-1/55 to-cyan-900/55" />
        {/* White grid */}
        <div className="grid-overlay absolute inset-0 opacity-10" />
      </div>

      {/* Side pagination dots (lg+) */}
      <div className="absolute z-30 max-lg:bottom-12 max-lg:left-1/2 max-lg:-translate-x-1/2 lg:top-1/2 lg:end-6 lg:-translate-y-1/2">
        <div className="flex gap-3 lg:flex-col">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveSlide(idx);
                setIsPaused(true);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className="group relative"
            >
              <div
                className={cn(
                  "h-3 w-3 rounded-full transition-all duration-300",
                  idx === activeSlide
                    ? "scale-110 bg-white"
                    : "bg-white/40 hover:bg-white/60",
                )}
              />
              {idx === activeSlide ? (
                <div className="absolute inset-0 -m-1 rounded-full border-2 border-white/50" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Drag hint pill */}
      <div
        data-hero-hint
        className="absolute bottom-24 z-30 hidden lg:block start-6"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <div className="flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md">
          <div className="text-xl">👆</div>
          <p className="text-sm font-medium text-white">
            {t("heroExtras.dragHint")}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container-custom relative z-[5] flex min-h-screen flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto max-w-4xl">
          {/* Headline */}
          <h1
            data-hero-title
            className="relative mb-3 px-4 text-[clamp(1.75rem,0.5rem+4vw,3.75rem)] font-bold leading-tight sm:mb-4 sm:px-0"
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
                {t("heroExtras.titleLine1")}
              </span>
            </span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary-3 via-primary-2 to-primary-3 bg-clip-text text-transparent">
                {t("heroExtras.titleLine2")}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-hero-subtitle
            className="mb-3 px-4 text-[clamp(1rem,0.8rem+0.8vw,1.25rem)] text-white/90 sm:mb-4 sm:px-0"
          >
            {t("hero.subtitle")}
          </p>

          {/* Customizable line */}
          <div
            data-hero-extra
            className="mb-4 hidden items-center justify-center gap-2 text-xs text-white/70 sm:mb-6 sm:flex sm:text-sm"
            style={{ opacity: 0 }}
          >
            <span>✨</span>
            <span className="font-medium">{t("heroExtras.customizable")}</span>
            <span>🎨</span>
          </div>

          {/* Stats */}
          <div
            data-hero-stats
            className="mb-6 hidden flex-wrap items-center justify-center gap-6 text-white/80 sm:flex"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            {[
              { icon: "✓", label: t("trustedProfessionals") },
              { icon: "★", label: t("heroExtras.realReviews") },
              { icon: "🏆", label: t("heroExtras.qualityGuaranteed") },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <span className="text-lg font-bold text-white">{icon}</span>
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <HeroSearchForm />
        </div>
      </div>
    </section>
  );
}
