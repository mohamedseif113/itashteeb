"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { eliteProfessionals } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  HiChevronLeft,
  HiChevronRight,
  HiExternalLink,
  HiLightningBolt,
  HiLocationMarker,
  HiStar,
} from "react-icons/hi";

export function EliteProfessionalsSection() {
  const t = useTranslations("home.elite");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [active, setActive] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);

  const items = eliteProfessionals;
  const current = items[active];

  const goTo = useCallback(
    (index: number) => {
      setActive((index + items.length) % items.length);
      setAutoPaused(true);
      window.setTimeout(() => setAutoPaused(false), 8000);
    },
    [items.length],
  );

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    if (autoPaused || items.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [autoPaused, items.length]);

  if (!current) return null;

  const name = isRtl ? current.nameAr : current.nameEn;
  const location = isRtl ? current.locationAr : current.locationEn;
  const specialties = isRtl ? current.specialtiesAr : current.specialtiesEn;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      {/* Ambient particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -start-20 top-20 h-72 w-72 rounded-full bg-primary-1/10"
          style={{ filter: "blur(100px)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -end-16 bottom-10 h-80 w-80 rounded-full bg-primary-2/10"
          style={{ filter: "blur(100px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <div className="container-custom relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-primary-1/30 bg-primary-1/10 px-3 py-1.5 text-xs font-medium text-primary-1 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <HiStar className="h-4 w-4" />
              {t("badge")}
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-charcoal md:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-charcoal/70 md:text-lg">
            {t("description")}
          </p>
        </motion.div>
      </div>

      <div className="container-custom relative flex h-full flex-col items-center justify-center gap-4 py-8">
        {/* Expanding gallery — active 80% / inactive 10% */}
        <motion.div
          className="flex h-[60vh] w-full items-center justify-center gap-2 md:gap-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {items.map((item, index) => {
            const isActive = index === active;
            const title = isRtl ? item.projectTitleAr : item.projectTitleEn;
            const subtitle = isRtl ? item.descriptionAr : item.descriptionEn;
            const type = isRtl ? item.categoryAr : item.category;

            return (
              <motion.div
                key={item.id}
                className="group relative h-full"
                animate={{
                  width: isActive ? "80%" : "10%",
                  opacity: isActive ? 1 : 0.6,
                  filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                whileHover={{ opacity: 1, filter: "grayscale(0%)" }}
                onClick={isActive ? undefined : () => goTo(index)}
                style={{ cursor: isActive ? "default" : "pointer" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-2xl">
                  {/* Blurred background fill */}
                  <div className="absolute inset-0">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="scale-125 object-cover opacity-60 blur-3xl"
                      sizes="33vw"
                      aria-hidden
                    />
                  </div>

                  {/* Main image */}
                  <div
                    className={cn(
                      "absolute inset-0",
                      isActive ? "p-3 md:p-4" : "",
                    )}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={title}
                        fill
                        quality={85}
                        priority={index === 0}
                        className={
                          isActive ? "object-contain" : "object-cover"
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />

                  {/* Category badge — active only */}
                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        className="absolute start-4 top-4 rounded-full border border-gray-200 bg-white/90 px-3 py-1 text-xs font-medium text-gray-900 shadow-lg backdrop-blur-sm"
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                      >
                        {type}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  {/* Inactive hover chevron */}
                  {!isActive ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      {isRtl ? (
                        <HiChevronLeft className="h-8 w-8 text-gray-900" />
                      ) : (
                        <HiChevronRight className="h-8 w-8 text-gray-900" />
                      )}
                    </div>
                  ) : null}

                  {/* Title on active slide */}
                  {isActive ? (
                    <div className="absolute bottom-4 start-4 end-4">
                      <p className="text-sm font-semibold text-white drop-shadow">
                        {title}
                      </p>
                      <p className="line-clamp-1 text-xs text-white/80">
                        {subtitle}
                      </p>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Professional info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${current.id}`}
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-2xl border border-primary-1/20 bg-white/90 p-4 shadow-2xl backdrop-blur-xl md:p-6">
              <div className="mb-3 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary-1/30 bg-white shadow-lg md:h-16 md:w-16">
                    {current.avatar ? (
                      <Image
                        src={current.avatar}
                        alt={`${name} Logo`}
                        width={64}
                        height={64}
                        quality={75}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold text-primary-1">
                        {name.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Link
                        href={`/professionals/${current.slug}`}
                        className="group inline-block"
                      >
                        <h3 className="text-xl font-bold text-charcoal transition-colors hover:text-primary-1 md:text-2xl lg:text-3xl">
                          {name}
                        </h3>
                      </Link>
                      {current.verified ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          {t("verified")}
                        </span>
                      ) : null}
                    </div>

                    <p className="mb-2 text-base font-medium text-primary-1">
                      {specialties.join(" • ")}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal/70 md:text-sm">
                      <div className="flex items-center gap-1.5">
                        <HiStar className="h-4 w-4 text-deep-orange" />
                        <span className="font-medium">5.0</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{current.projects}+</span>
                        <span>{t("projects")}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiLightningBolt className="h-4 w-4 text-primary-2" />
                        <span>
                          {current.years} {t("years")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HiLocationMarker className="h-4 w-4 text-primary-1" />
                        <span className="truncate">{location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-full border-2 border-green-600 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                  {t("availableNow")}
                </div>
              </div>

              <Link
                href={`/professionals/${current.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-1 px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary-2 hover:shadow-xl md:w-auto"
              >
                <span>{t("viewProfile")}</span>
                <HiExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={isRtl ? next : prev}
            aria-label="Previous"
            className="rounded-full border border-gray-300 bg-white/90 p-2.5 text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
          >
            {isRtl ? (
              <HiChevronRight className="h-5 w-5" />
            ) : (
              <HiChevronLeft className="h-5 w-5" />
            )}
          </button>

          <div
            className="flex items-center gap-0"
            role="tablist"
            aria-label="Company navigation"
          >
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === active}
                className="px-1.5 py-5"
              >
                <span
                  className={cn(
                    "block rounded-full transition-all",
                    index === active
                      ? "h-2 w-8 bg-blue-500"
                      : "h-2 w-2 bg-gray-300 hover:bg-gray-400",
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={isRtl ? prev : next}
            aria-label="Next"
            className="rounded-full border border-gray-300 bg-white/90 p-2.5 text-gray-900 shadow-lg backdrop-blur-sm transition-all hover:bg-white"
          >
            {isRtl ? (
              <HiChevronLeft className="h-5 w-5" />
            ) : (
              <HiChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile swipe hint */}
        <div className="absolute start-1/2 top-4 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-1.5 text-xs text-gray-900 shadow-lg backdrop-blur-sm md:hidden">
          <HiChevronLeft className="h-3.5 w-3.5" />
          <span>{t("swipeToBrowse")}</span>
          <HiChevronRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </section>
  );
}
