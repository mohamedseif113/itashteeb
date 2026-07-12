"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { HiLightBulb, HiUserGroup, HiCog, HiSparkles } from "react-icons/hi";
import { FiArrowRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    key: "ideaBook" as const,
    href: "/idea-book",
    icon: HiLightBulb,
    featured: true,
    gradient: "from-primary-1 to-primary-2",
    iconGradient: "from-primary-1 to-primary-2",
    image: "/images/projects/p2.jpg",
  },
  {
    key: "professionals" as const,
    href: "/professionals",
    icon: HiUserGroup,
    featured: false,
    gradient: "from-primary-2 to-primary-1",
    iconGradient: "from-primary-2 to-primary-1",
    image: "/images/projects/p7.jpg",
  },
  {
    key: "services" as const,
    href: "/services",
    icon: HiCog,
    featured: false,
    gradient: "from-primary-1 to-primary-2",
    iconGradient: "from-primary-1 to-primary-2",
    image: "/images/projects/p1.jpg",
  },
] as const;

export function WhatWeDoSection() {
  const t = useTranslations("home.whatWeDo");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-wwd-badge]",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      )
        .fromTo(
          "[data-wwd-heading]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          "[data-wwd-card]",
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .fromTo(
          "[data-wwd-ornament]",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(2)",
          },
          "-=0.2",
        );

      // Soft floating loop on featured ornaments
      gsap.to("[data-wwd-ornament]", {
        y: -8,
        duration: 2.2,
        stagger: 0.35,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 md:py-28"
    >
      {/* Soft ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -start-24 top-10 h-72 w-72 rounded-full bg-primary-1/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -end-20 bottom-10 h-80 w-80 rounded-full bg-primary-2/10 blur-3xl"
      />
      <div className="grid-overlay-dark absolute inset-0 opacity-40" />

      <div className="container-custom relative">
        {/* Header — matches itashteeb.com */}
        <div className="mb-8 text-center sm:mb-12 md:mb-16">
          <div
            data-wwd-badge
            className="mb-3 inline-block rounded-full border border-primary-1/30 bg-primary-1/10 px-3 py-1.5 text-xs font-medium text-primary-1 backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-2 sm:text-sm"
            style={{ opacity: 0 }}
          >
            <span className="flex items-center gap-2">
              <HiSparkles className="h-3 w-3 sm:h-4 sm:w-4" />
              {t("badge")}
            </span>
          </div>

          <div data-wwd-heading style={{ opacity: 0 }}>
            <h2 className="mb-3 text-2xl font-bold text-charcoal sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl px-4 text-sm text-charcoal/70 sm:text-base md:text-lg">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {CARDS.map(
            ({
              key,
              href,
              icon: Icon,
              featured,
              gradient,
              iconGradient,
              image,
            }) => (
              <Link key={key} href={href} className="block">
                <div
                  data-wwd-card
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border-2 transition-all duration-500",
                    featured
                      ? "border-white bg-gradient-to-br shadow-2xl md:scale-105"
                      : "border-white/30 bg-gradient-to-br shadow-lg hover:border-white/50 hover:shadow-xl hover:-translate-y-1",
                    gradient,
                  )}
                  style={{ opacity: 0 }}
                >
                  {/* Photo layer */}
                  <div className="absolute inset-0">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-500 group-hover:opacity-85",
                        gradient,
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-1/50 via-primary-2/30 to-primary-1/50" />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 text-white">
                    <div
                      className={cn(
                        "mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                        iconGradient,
                      )}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-white">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="mb-4 text-sm font-semibold text-white/90">
                      {t(`${key}.subtitle`)}
                    </p>
                    <p className="mb-6 text-white/80">
                      {t(`${key}.description`)}
                    </p>

                    <div className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all group-hover:scale-105 group-hover:bg-white/30">
                      {t(`${key}.cta`)}
                      <FiArrowRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-300 rtl:rotate-180",
                          isRtl
                            ? "group-hover:-translate-x-1"
                            : "group-hover:translate-x-1",
                        )}
                      />
                    </div>
                  </div>

                  {/* Floating ornaments on featured card */}
                  {featured ? (
                    <div className="pointer-events-none absolute inset-0">
                      <div
                        data-wwd-ornament
                        className="absolute start-4 top-4 h-8 w-8 text-white/40"
                        style={{ opacity: 0 }}
                      >
                        <HiLightBulb className="h-full w-full" />
                      </div>
                      <div
                        data-wwd-ornament
                        className="absolute end-4 top-4 h-6 w-6 text-white/35"
                        style={{ opacity: 0 }}
                      >
                        <HiSparkles className="h-full w-full" />
                      </div>
                      <div
                        data-wwd-ornament
                        className="absolute bottom-4 start-4 h-10 w-10"
                        style={{ opacity: 0 }}
                      >
                        <div className="h-full w-full rounded-full border-2 border-white/30 bg-white/10">
                          <div className="absolute inset-1 rounded-full bg-white/20" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
