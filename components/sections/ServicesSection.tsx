"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  serviceGraphParents,
  serviceGraphChildren,
  serviceLegendColors,
  type ServiceGraphParent,
  type ServiceGraphChild,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  HiOfficeBuilding,
  HiHome,
  HiCollection,
  HiCog,
  HiArrowRight,
  HiArrowLeft,
  HiChevronDown,
} from "react-icons/hi";

const LEGEND_KEYS = [
  "engineeringOffices",
  "contractors",
  "furniture",
  "specializedTechnicians",
] as const;

const PARENT_ICONS: Record<string, typeof HiOfficeBuilding> = {
  "engineering-offices": HiOfficeBuilding,
  contractors: HiHome,
  "furniture-furnishings": HiCollection,
  "specialized-technicians": HiCog,
};

const BUBBLE_COLORS = [
  "bg-primary-1",
  "bg-deep-orange",
  "bg-light-blue",
  "bg-primary-2",
];

const CONNECTION_COLORS: Record<
  string,
  { start: string; end: string; bright: string }
> = {
  "engineering-offices": {
    start: "rgba(27, 85, 142, 0.6)",
    end: "rgba(27, 85, 142, 0.8)",
    bright: "rgba(27, 85, 142, 1)",
  },
  contractors: {
    start: "rgba(249, 115, 22, 0.6)",
    end: "rgba(249, 115, 22, 0.8)",
    bright: "rgba(249, 115, 22, 1)",
  },
  "furniture-furnishings": {
    start: "rgba(27, 85, 142, 0.6)",
    end: "rgba(27, 85, 142, 0.8)",
    bright: "rgba(27, 85, 142, 1)",
  },
  "specialized-technicians": {
    start: "rgba(249, 115, 22, 0.6)",
    end: "rgba(249, 115, 22, 0.8)",
    bright: "rgba(249, 115, 22, 1)",
  },
};

function ParentNode({
  node,
  locale,
  isHovered,
  onEnter,
  onLeave,
}: {
  node: ServiceGraphParent;
  locale: string;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const name = locale === "ar" ? node.nameAr : node.nameEn;
  const Icon = PARENT_ICONS[node.id] ?? HiOfficeBuilding;
  const bubbles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        size: 14 * Math.random() + 14,
        startX: (Math.random() - 0.5) * 50,
        startY: (Math.random() - 0.5) * 50,
        endX: (Math.random() - 0.5) * 90,
        endY: (Math.random() - 0.5) * 90,
        delay: 0.12 * i,
      })),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0.85 }}
      transition={{ duration: 0.3 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 transform"
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href="/services">
        <motion.div
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "group relative flex h-32 w-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-4 bg-gradient-to-br p-4 transition-all duration-300 xl:h-40 xl:w-48 xl:p-6",
            node.colorClass,
            isHovered
              ? "scale-105 border-white/70 shadow-xl"
              : "border-white/50 shadow-lg",
          )}
        >
          {isHovered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.3 }}
              className={cn(
                "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-40 blur-xl",
                node.glowClass,
              )}
            />
          ) : null}

          {isHovered
            ? bubbles.map((b, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "absolute rounded-full border-2 border-white/30",
                    BUBBLE_COLORS[i % BUBBLE_COLORS.length],
                  )}
                  style={{ width: b.size, height: b.size }}
                  initial={{
                    x: b.startX,
                    y: b.startY,
                    opacity: 0.8,
                    scale: 0,
                  }}
                  animate={{
                    x: [b.startX, b.startX + b.endX],
                    y: [b.startY, b.startY + b.endY],
                    opacity: [0.8, 0],
                    scale: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: b.delay,
                    ease: "easeOut",
                  }}
                />
              ))
            : null}

          <div className="relative z-10 mb-1 xl:mb-2">
            <Icon className="h-6 w-6 text-white xl:h-8 xl:w-8" />
          </div>
          <h3 className="relative z-10 text-center text-sm font-bold leading-tight text-white xl:text-base">
            {name}
          </h3>
          <span className="relative z-10 mt-1 inline-block rounded-full border border-white/60 bg-white/30 px-2 py-1 text-xs font-medium text-white shadow-lg xl:mt-2 xl:px-3">
            {node.count}+
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function SubNode({
  node,
  locale,
  isHovered,
  onEnter,
  onLeave,
}: {
  node: ServiceGraphChild;
  locale: string;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const name = locale === "ar" ? node.nameAr : node.nameEn;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isHovered ? 1 : 0.75 }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Link href="/services">
        <motion.div
          whileTap={{ scale: 0.95 }}
          animate={{
            y: isHovered ? -5 : 0,
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered
              ? "0 20px 40px rgba(0,0,0,0.35)"
              : "0 4px 12px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "group relative flex h-24 w-32 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 p-3 xl:h-32 xl:w-40 xl:p-4",
            node.colorClass,
            isHovered ? "border-white/90" : "border-white/40",
          )}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            animate={{ opacity: isHovered ? 0.22 : 0 }}
          />
          <div className="absolute end-0 top-0 h-6 w-6 rounded-es-full bg-white/20" />
          <h3 className="relative z-10 text-center text-xs font-extrabold text-white drop-shadow-sm xl:text-sm">
            {name}
          </h3>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function ConnectionLines({
  parents,
  childrenNodes,
  hoveredId,
}: {
  parents: ServiceGraphParent[];
  childrenNodes: ServiceGraphChild[];
  hoveredId: string | null;
}) {
  const lines = useMemo(() => {
    const result: {
      key: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      parentId: string;
      active: boolean;
    }[] = [];

    parents.forEach((parent) => {
      parent.subcategoryIds.forEach((childId) => {
        const child = childrenNodes.find((c) => c.id === childId);
        if (!child) return;
        const active =
          hoveredId === parent.id ||
          hoveredId === child.id ||
          (hoveredId !== null &&
            parent.subcategoryIds.includes(hoveredId) &&
            child.parentId === parent.id);
        result.push({
          key: `${parent.id}-${child.id}`,
          x1: parent.position.x,
          y1: parent.position.y,
          x2: child.position.x,
          y2: child.position.y,
          parentId: parent.id,
          active,
        });
      });
    });
    return result;
  }, [parents, childrenNodes, hoveredId]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      {lines.map((line) => {
        const colors =
          CONNECTION_COLORS[line.parentId] ??
          CONNECTION_COLORS["engineering-offices"];
        return (
          <motion.line
            key={line.key}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={line.active ? colors.bright : colors.start}
            strokeWidth={line.active ? 2.5 : 1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: line.active ? 0.9 : 0.35,
            }}
            transition={{ duration: 0.5 }}
          />
        );
      })}
    </svg>
  );
}

function MobileAccordion({ locale }: { locale: string }) {
  const [openId, setOpenId] = useState<string | null>(
    serviceGraphParents[0]?.id ?? null,
  );

  return (
    <div className="space-y-3">
      {serviceGraphParents.map((parent) => {
        const Icon = PARENT_ICONS[parent.id] ?? HiOfficeBuilding;
        const name = locale === "ar" ? parent.nameAr : parent.nameEn;
        const isOpen = openId === parent.id;
        const kids = serviceGraphChildren.filter(
          (c) => c.parentId === parent.id,
        );

        return (
          <div
            key={parent.id}
            className="overflow-hidden rounded-2xl border border-white/20 bg-white/10"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : parent.id)}
              className="flex w-full items-center gap-3 p-4 text-start transition-all duration-300 hover:bg-white/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-1 to-primary-2">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{name}</p>
                <p className="text-xs text-white/70">{parent.count}+</p>
              </div>
              <HiChevronDown
                className={cn(
                  "h-5 w-5 text-white/80 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 gap-3 p-4 pt-0">
                    {kids.map((child, i) => (
                      <motion.div
                        key={child.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.05 * i }}
                      >
                        <Link href="/services">
                          <motion.div
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex h-20 cursor-pointer flex-col items-center justify-center rounded-xl border border-white/30 bg-white/10 p-3 transition-all duration-300 hover:bg-white/15"
                          >
                            <span className="text-center text-xs font-semibold text-white">
                              {locale === "ar" ? child.nameAr : child.nameEn}
                            </span>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function ServicesSection() {
  const t = useTranslations("home.categories");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const relatedHoverIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const set = new Set<string>([hoveredId]);
    const parent = serviceGraphParents.find((p) => p.id === hoveredId);
    if (parent) {
      parent.subcategoryIds.forEach((id) => set.add(id));
      return set;
    }
    const child = serviceGraphChildren.find((c) => c.id === hoveredId);
    if (child) {
      set.add(child.parentId);
      const p = serviceGraphParents.find((x) => x.id === child.parentId);
      p?.subcategoryIds.forEach((id) => set.add(id));
    }
    return set;
  }, [hoveredId]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-1/90 via-blue-700/85 to-blue-900/90 py-12 xl:py-20">
      {/* Grid overlay — matches live site 50px white grid */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Ambient blobs */}
      <motion.div
        className="absolute -start-20 -top-20 h-96 w-96 rounded-full bg-primary-2/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -end-20 h-96 w-96 rounded-full bg-light-blue/10 blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute end-20 top-32 hidden h-32 w-32 rounded-full border border-white/10 lg:block"
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-40 start-40 hidden h-24 w-24 rotate-45 border border-white/10 lg:block"
        animate={{ y: [0, 20, 0], rotate: [45, 225, 405] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
          >
            {t("badge")}
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            {t("description")}
          </p>
        </motion.div>

        {/* Desktop interactive graph */}
        <div
          className="relative hidden w-full lg:block"
          style={{ height: 720 }}
        >
          <ConnectionLines
            parents={serviceGraphParents}
            childrenNodes={serviceGraphChildren}
            hoveredId={hoveredId}
          />
          {serviceGraphParents.map((node) => (
            <ParentNode
              key={node.id}
              node={node}
              locale={locale}
              isHovered={relatedHoverIds.has(node.id)}
              onEnter={() => setHoveredId(node.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
          {serviceGraphChildren.map((node) => (
            <SubNode
              key={node.id}
              node={node}
              locale={locale}
              isHovered={relatedHoverIds.has(node.id)}
              onEnter={() => setHoveredId(node.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="mb-8 block lg:hidden">
          <MobileAccordion locale={locale} />
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 lg:mt-4">
          {LEGEND_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: serviceLegendColors[key] }}
              />
              <span className="text-sm font-medium text-white/85">
                {t(`legend.${key}`)}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link href="/services">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-1 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-primary-2 hover:shadow-xl"
            >
              {t("viewAll")}
              {isRtl ? (
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
