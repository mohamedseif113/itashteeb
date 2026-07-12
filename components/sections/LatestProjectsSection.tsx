"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { latestProjects, type ProjectCard } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCog,
  HiGlobe,
  HiHome,
  HiLocationMarker,
  HiOfficeBuilding,
  HiSparkles,
} from "react-icons/hi";

function categoryIcon(category: string) {
  const key = category.toLowerCase();
  if (key.includes("residential") || key.includes("سكن")) return HiHome;
  if (key.includes("interior") || key.includes("ديكور")) return HiSparkles;
  if (key.includes("landscape") || key.includes("حدائق")) return HiGlobe;
  if (key.includes("renov") || key.includes("ترميم")) return HiCog;
  return HiOfficeBuilding;
}

function hoverMotion(
  index: number,
  total: number,
  isMobile: boolean,
  isRtl: boolean,
) {
  const cols = total <= 1 ? 1 : total === 2 ? 2 : 3;
  const scale = isMobile ? 1.02 : 1.05;
  const z = isMobile ? 30 : 60;

  if (cols === 1) {
    return {
      scale: 1.02,
      rotateY: 0,
      rotateX: 0,
      z: 30,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  }

  if (cols === 2) {
    return {
      scale: 1.03,
      rotateY: index % 2 === 0 ? (isRtl ? -8 : 8) : isRtl ? 8 : -8,
      rotateX: 0,
      z: 40,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  }

  const row = Math.floor(index / 3);
  const col = index % 3;

  if (row === 0) {
    if (col === 0)
      return {
        scale,
        rotateY: isRtl ? -8 : 8,
        rotateX: -8,
        z,
        transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
      };
    if (col === 1)
      return {
        scale: isMobile ? 1.03 : 1.08,
        rotateY: 0,
        rotateX: -10,
        z: isMobile ? 40 : 80,
        transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
      };
    return {
      scale,
      rotateY: isRtl ? 8 : -8,
      rotateX: -8,
      z,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  }

  if (row === 1) {
    if (col === 0)
      return {
        scale: isMobile ? 1.02 : 1.06,
        rotateY: isRtl ? -12 : 12,
        rotateX: 0,
        z: isMobile ? 35 : 70,
        transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
      };
    if (col === 1)
      return {
        scale: isMobile ? 1.03 : 1.1,
        rotateY: 0,
        rotateX: 0,
        z: isMobile ? 50 : 100,
        transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
      };
    return {
      scale: isMobile ? 1.02 : 1.06,
      rotateY: isRtl ? 12 : -12,
      rotateX: 0,
      z: isMobile ? 35 : 70,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  }

  if (col === 0)
    return {
      scale,
      rotateY: isRtl ? -8 : 8,
      rotateX: 8,
      z,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  if (col === 1)
    return {
      scale: isMobile ? 1.03 : 1.08,
      rotateY: 0,
      rotateX: 10,
      z: isMobile ? 40 : 80,
      transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
    };
  return {
    scale,
    rotateY: isRtl ? 8 : -8,
    rotateX: 8,
    z,
    transition: { duration: 0.4, type: "spring" as const, stiffness: 150 },
  };
}

function ProjectCard3D({
  project,
  index,
  total,
  locale,
  enterLabel,
  hoveredId,
  setHoveredId,
}: {
  project: ProjectCard;
  index: number;
  total: number;
  locale: string;
  enterLabel: string;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}) {
  const isAr = locale === "ar";
  const isHovered = hoveredId === project.id;
  const title = isAr ? project.titleAr : project.titleEn;
  const category = isAr ? project.categoryAr : project.categoryEn;
  const location = isAr ? project.locationAr : project.locationEn;
  const country = isAr ? project.countryAr : project.countryEn;
  const proName = isAr
    ? project.professional.nameAr
    : project.professional.nameEn;
  const Icon = categoryIcon(project.categoryEn);
  const row = Math.floor(index / 3);
  const col = index % 3;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15, z: -100 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: 0.1 * index,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={hoverMotion(index, total, false, isAr)}
      onHoverStart={() => setHoveredId(project.id)}
      onHoverEnd={() => setHoveredId(null)}
      className="group cursor-pointer"
      style={{
        transform: `translateZ(${(row + col) * 20}px) rotateY(${(col - 1) * 5}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border-2 transition-all duration-500 lg:min-h-[22rem]",
          isHovered
            ? "border-white/60 shadow-2xl"
            : "border-white/20 shadow-xl",
        )}
        style={{
          background: isHovered
            ? "linear-gradient(135deg, #1B558E, #F97316)"
            : "rgba(55, 65, 81, 0.85)",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
            : "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden lg:h-48">
          <Image
            src={project.image}
            alt=""
            fill
            className={cn(
              "object-cover opacity-60 blur-3xl transition-transform duration-500",
              isHovered ? "scale-125" : "scale-110",
            )}
            sizes="33vw"
            aria-hidden
          />
          <div className="absolute inset-0 p-3">
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={title}
                fill
                quality={75}
                className={cn(
                  "object-contain transition-transform duration-500",
                  isHovered && "scale-105",
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute start-4 top-4">
            <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
              <Icon className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white">{category}</span>
            </div>
          </div>

          {isHovered ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-br from-primary-1/20 to-primary-2/20 backdrop-blur-[1px]"
            />
          ) : null}
        </div>

        {/* Body */}
        <div className="relative flex min-h-0 flex-1 flex-col justify-between p-4 pb-12">
          <div className="flex-1 space-y-1 overflow-hidden">
            <h3 className="line-clamp-1 text-sm font-bold leading-tight text-white">
              {title}
            </h3>
            <p className="line-clamp-1 text-xs leading-tight text-white/80">
              {location}
            </p>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1">
                <HiLocationMarker className="h-3 w-3 flex-shrink-0 text-white/60" />
                <span className="line-clamp-1 text-xs text-white/80">
                  {country}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5 text-xs text-white/70">
                <div className="relative h-4 w-4 flex-shrink-0 overflow-hidden rounded-full">
                  <div className="flex h-full w-full items-center justify-center rounded-full border border-primary-1/20 bg-slate-200 text-[9px] font-semibold text-primary-1">
                    {project.professional.initial}
                  </div>
                </div>
                <span className="line-clamp-1">{proName}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 start-4">
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm transition-all hover:bg-white/30">
                <span className="text-xs font-medium text-white">
                  {enterLabel}
                </span>
                {isAr ? (
                  <HiArrowLeft className="h-2.5 w-2.5 text-white" />
                ) : (
                  <HiArrowRight className="h-2.5 w-2.5 text-white" />
                )}
              </div>
            </Link>
          </div>

          {/* Hover meta pills */}
          <AnimatePresence>
            {isHovered ? (
              <div
                className={cn(
                  "absolute bottom-5 space-y-2",
                  isAr ? "start-3" : "end-3",
                )}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isAr ? -50 : 50,
                    scale: 0.8,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isAr ? -50 : 50, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center gap-1.5 rounded-full bg-primary-1/80 px-2.5 py-1 backdrop-blur-sm"
                >
                  <HiOfficeBuilding className="h-2.5 w-2.5 text-white" />
                  <span className="text-xs font-medium text-white">
                    {country}
                  </span>
                </motion.div>
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isAr ? -50 : 50,
                    scale: 0.8,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: isAr ? -50 : 50, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 0.05,
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-primary-2/80 px-2.5 py-1 backdrop-blur-sm"
                >
                  <HiSparkles className="h-2.5 w-2.5 text-white" />
                  <span className="text-xs font-medium text-white">
                    {category}
                  </span>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function LatestProjectsSection() {
  const t = useTranslations("home.latestProjects");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: (i * 17 + 11) % 100,
        top: (i * 23 + 7) % 100,
        duration: 4 + (i % 5),
        delay: (i % 6) * 0.5,
      })),
    [],
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal py-20 md:py-28">
      {/* Animated color wash + particles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-1/20 via-transparent to-primary-2/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(35, 91, 142, 0.2), transparent, rgba(249, 115, 22, 0.2))",
              "linear-gradient(135deg, rgba(249, 115, 22, 0.2), transparent, rgba(35, 91, 142, 0.2))",
              "linear-gradient(225deg, rgba(35, 91, 142, 0.2), transparent, rgba(249, 115, 22, 0.2))",
              "linear-gradient(315deg, rgba(249, 115, 22, 0.2), transparent, rgba(35, 91, 142, 0.2))",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/20"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-6 py-3 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-white">
              <HiSparkles className="h-5 w-5" />
              {t("badge")}
            </span>
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            {t("description")}
          </p>
        </motion.div>

        {/* 3D project grid */}
        <div className="relative">
          <div
            className="relative mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {latestProjects.map((project, index) => (
              <ProjectCard3D
                key={project.id}
                project={project}
                index={index}
                total={latestProjects.length}
                locale={locale}
                enterLabel={t("enter")}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/projects">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-1 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-primary-2 hover:shadow-xl"
            >
              {t("exploreAll")}
              {isAr ? (
                <HiArrowLeft className="h-5 w-5" />
              ) : (
                <HiArrowRight className="h-5 w-5" />
              )}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
