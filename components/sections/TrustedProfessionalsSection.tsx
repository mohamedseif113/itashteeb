"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  trustedProfessionals,
  type TrustedProfessional,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  HiArrowLeft,
  HiArrowRight,
  HiChevronLeft,
  HiChevronRight,
  HiSparkles,
  HiStar,
  HiUserGroup,
} from "react-icons/hi";

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

function cardMetrics(bp: Breakpoint) {
  if (bp === "mobile") {
    return {
      size: 180,
      avatar: 40,
      padding: "12px",
      gap: "4px",
      title: "10px",
      body: "8px",
      meta: "9px",
      mbTitle: "4px",
      mbBody: "8px",
      mbAvatar: "8px",
    };
  }
  if (bp === "tablet") {
    return {
      size: 220,
      avatar: 48,
      padding: "16px",
      gap: "6px",
      title: "12px",
      body: "10px",
      meta: "10px",
      mbTitle: "6px",
      mbBody: "10px",
      mbAvatar: "12px",
    };
  }
  return {
    size: 280,
    avatar: 64,
    padding: "24px",
    gap: "8px",
    title: "14px",
    body: "12px",
    meta: "12px",
    mbTitle: "8px",
    mbBody: "12px",
    mbAvatar: "16px",
  };
}

function offsetStyle(distance: number, bp: Breakpoint) {
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";

  if (distance === 0) {
    return { x: 0, z: 0, scale: 1, opacity: 1 };
  }
  if (distance === -1) {
    return {
      x: isMobile ? -120 : isTablet ? -160 : -200,
      z: isMobile ? -60 : isTablet ? -80 : -100,
      scale: isMobile ? 0.7 : 0.8,
      opacity: 0.7,
    };
  }
  if (distance === 1) {
    return {
      x: isMobile ? 120 : isTablet ? 160 : 200,
      z: isMobile ? -60 : isTablet ? -80 : -100,
      scale: isMobile ? 0.7 : 0.8,
      opacity: 0.7,
    };
  }
  if (distance === -2) {
    return {
      x: isMobile ? -200 : isTablet ? -280 : -350,
      z: isMobile ? -120 : isTablet ? -160 : -200,
      scale: isMobile ? 0.5 : 0.6,
      opacity: isMobile ? 0.3 : 0.4,
    };
  }
  if (distance === 2) {
    return {
      x: isMobile ? 200 : isTablet ? 280 : 350,
      z: isMobile ? -120 : isTablet ? -160 : -200,
      scale: isMobile ? 0.5 : 0.6,
      opacity: isMobile ? 0.3 : 0.4,
    };
  }
  return { x: 0, z: -300, scale: 0.4, opacity: 0 };
}

function TrustedCard({
  pro,
  locale,
  isActive,
  isHovered,
  metrics,
  yearsLabel,
}: {
  pro: TrustedProfessional;
  locale: string;
  isActive: boolean;
  isHovered: boolean;
  metrics: ReturnType<typeof cardMetrics>;
  yearsLabel: string;
}) {
  const isAr = locale === "ar";
  const name = isAr ? pro.nameAr : pro.nameEn;
  const description = isAr ? pro.descriptionAr : pro.descriptionEn;

  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-center rounded-xl border-2 shadow-lg transition-all duration-300",
        isActive
          ? "border-primary-1 bg-white shadow-xl hover:scale-105 hover:shadow-2xl"
          : isHovered
            ? "border-primary-1/50 bg-white/90 shadow-lg"
            : "border-gray-200 bg-white/80 shadow-md",
      )}
      style={{ padding: metrics.padding }}
    >
      <div
        className="flex justify-center"
        style={{ marginBottom: metrics.mbAvatar }}
      >
        <div
          className="relative flex items-center justify-center overflow-hidden rounded-full border-2 border-primary-1/20 bg-white shadow-md"
          style={{ width: metrics.avatar, height: metrics.avatar }}
        >
          {pro.image ? (
            <>
              <Image
                src={pro.image}
                alt=""
                fill
                className="scale-125 object-cover opacity-75 blur-xl"
                sizes={`${metrics.avatar}px`}
                aria-hidden
              />
              <Image
                src={pro.image}
                alt={`${name} Logo`}
                fill
                quality={75}
                priority={isActive}
                className="object-cover"
                sizes={`${metrics.avatar}px`}
              />
            </>
          ) : (
            <span className="text-lg font-bold text-primary-1">
              {pro.initial}
            </span>
          )}
        </div>
      </div>

      <h3
        className="line-clamp-2 w-full overflow-hidden text-center font-bold text-charcoal"
        style={{
          fontSize: metrics.title,
          marginBottom: metrics.mbTitle,
          lineHeight: 1.3,
        }}
      >
        {name}
      </h3>

      <p
        className="line-clamp-3 w-full overflow-hidden px-1 text-center text-charcoal/60"
        style={{
          fontSize: metrics.body,
          marginBottom: metrics.mbBody,
          lineHeight: 1.4,
        }}
      >
        {description}
      </p>

      <div
        className="flex w-full flex-col items-center"
        style={{ gap: metrics.gap }}
      >
        {pro.rating !== undefined && pro.rating > 0 ? (
          <div
            className="flex items-center"
            style={{ gap: metrics.gap === "4px" ? "2px" : "4px" }}
          >
            <HiStar
              className="text-yellow-500"
              style={{ width: metrics.meta, height: metrics.meta }}
            />
            <span
              className="font-semibold text-charcoal"
              style={{ fontSize: metrics.meta }}
            >
              {pro.rating.toFixed(1)}
            </span>
            {pro.reviews !== undefined ? (
              <span
                className="text-charcoal/50"
                style={{
                  fontSize: `${Math.max(parseInt(metrics.meta, 10) - 1, 8)}px`,
                }}
              >
                ({pro.reviews})
              </span>
            ) : null}
          </div>
        ) : null}

        {pro.years !== undefined && pro.years > 0 ? (
          <div
            className="flex items-center text-charcoal/60"
            style={{
              gap: metrics.gap === "4px" ? "2px" : "4px",
              fontSize: metrics.meta,
            }}
          >
            <HiSparkles
              style={{
                width: parseInt(metrics.meta, 10) + 2,
                height: parseInt(metrics.meta, 10) + 2,
              }}
            />
            <span>
              {pro.years} {yearsLabel}
            </span>
          </div>
        ) : null}
      </div>

      {isActive ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-primary-1"
          >
            <HiSparkles className="h-2 w-2 text-white" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary-1/0 opacity-0 transition-all duration-300 group-hover:bg-primary-1/10 group-hover:opacity-100" />
        </>
      ) : null}
    </div>
  );
}

export function TrustedProfessionalsSection() {
  const t = useTranslations("home.trusted");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const bp = useBreakpoint();
  const metrics = cardMetrics(bp);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const items = useMemo(
    () => trustedProfessionals.slice(0, 8),
    [],
  );
  const count = items.length;
  const loopItems = useMemo(
    () => [...items, ...items, ...items],
    [items],
  );

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ left: number; top: number }[]>(
    [],
  );
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    setParticles(
      Array.from({ length: Math.min(count, 4) }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
      })),
    );
  }, [count]);

  useEffect(() => {
    if (!ready && count > 0) {
      setIndex(count);
      setReady(true);
    }
  }, [ready, count]);

  useEffect(() => {
    if (!ready || count === 0) return;
    if (index >= 2 * count) {
      const id = window.setTimeout(() => setIndex(count), 0);
      return () => window.clearTimeout(id);
    }
    if (index < count) {
      const id = window.setTimeout(() => setIndex(count + index), 0);
      return () => window.clearTimeout(id);
    }
  }, [index, count, ready]);

  useEffect(() => {
    if (paused || !inView || !ready || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => i + 1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, inView, ready, count]);

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const delta = touchStart - touchEnd;
    if (delta > 50) {
      if (isRtl) prev();
      else next();
    } else if (delta < -50) {
      if (isRtl) next();
      else prev();
    }
  };

  if (count === 0) return null;

  const activeDot = ((index % count) + count) % count;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 sm:py-16 md:py-20"
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary-1/20"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(27, 85, 142, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(27, 85, 142, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-3 inline-block rounded-full border border-primary-1/30 bg-primary-1/10 px-3 py-1.5 text-xs font-medium text-primary-1 backdrop-blur-sm sm:mb-4 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <HiUserGroup className="h-3 w-3 sm:h-4 sm:w-4" />
              {t("badge")}
            </span>
          </motion.div>
          <h2 className="mb-3 text-2xl font-bold text-charcoal sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-sm text-charcoal/70 sm:text-base md:text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="relative flex h-64 items-center justify-center sm:h-80 md:h-96">
          <div
            className="relative h-56 w-full max-w-4xl sm:h-72 md:h-80"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <div className="flex h-full items-center justify-center">
              {loopItems.map((pro, i) => {
                const distance = i - index;
                const visible = Math.abs(distance) <= 2;
                const isActive = i === index;
                const isHovered = hoveredIdx === i;
                const pos = offsetStyle(distance, bp);
                const scale = isActive
                  ? 1
                  : isHovered
                    ? pos.scale + 0.1
                    : pos.scale;
                const opacity = visible
                  ? isHovered
                    ? Math.min(pos.opacity + 0.2, 1)
                    : pos.opacity
                  : 0;

                const card = (
                  <TrustedCard
                    pro={pro}
                    locale={locale}
                    isActive={isActive}
                    isHovered={isHovered}
                    metrics={metrics}
                    yearsLabel={t("years")}
                  />
                );

                return (
                  <motion.div
                    key={`${pro.id}-${i}`}
                    className="absolute cursor-pointer"
                    style={{
                      left: `calc(50% + ${pos.x}px)`,
                      top: "50%",
                      width: metrics.size,
                      height: metrics.size,
                      marginLeft: -metrics.size / 2,
                      marginTop: -metrics.size / 2,
                      transform: `translateZ(${pos.z}px)`,
                      transformStyle: "preserve-3d",
                      zIndex: isActive ? 50 : 10 - Math.abs(distance),
                    }}
                    animate={{ scale, opacity }}
                    transition={{ type: "spring", damping: 25, stiffness: 120 }}
                    onHoverStart={() => setHoveredIdx(i)}
                    onHoverEnd={() => setHoveredIdx(null)}
                    onClick={() => {
                      if (!isActive) setIndex(i);
                    }}
                  >
                    {isActive ? (
                      <Link href={`/professionals/${pro.slug}`}>{card}</Link>
                    ) : (
                      card
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={isRtl ? next : prev}
            aria-label={isRtl ? "المحترف السابق" : "Previous professional"}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 bg-white/90 p-2 text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl sm:left-4 sm:p-3"
          >
            <HiChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={isRtl ? prev : next}
            aria-label={isRtl ? "المحترف التالي" : "Next professional"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 bg-white/90 p-2 text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl sm:right-4 sm:p-3"
          >
            <HiChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <div
            className="flex items-center gap-0"
            role="tablist"
            aria-label={
              isRtl ? "تنقل بين المحترفين" : "Professional navigation"
            }
          >
            {items.map((pro, i) => (
              <button
                key={pro.id}
                type="button"
                role="tab"
                aria-selected={i === activeDot}
                aria-label={`${isRtl ? "محترف" : "Professional"} ${i + 1}: ${isRtl ? pro.nameAr : pro.nameEn}`}
                onClick={() => setIndex(i)}
                className="px-1.5 py-5 sm:px-2"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all",
                    i === activeDot
                      ? "h-2 w-8 bg-primary-1 sm:h-2.5 sm:w-10"
                      : "h-2 w-2 bg-gray-300 hover:bg-gray-400 sm:h-2.5 sm:w-2.5",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center sm:mt-10 md:mt-12"
        >
          <Link href="/professionals">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-1 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-primary-2 hover:shadow-xl sm:gap-2 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4"
            >
              {t("viewAll")}
              {isRtl ? (
                <HiArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              ) : (
                <HiArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              )}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
