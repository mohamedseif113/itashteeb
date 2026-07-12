"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  HiArrowRight,
  HiCog,
  HiHome,
  HiLightningBolt,
  HiOfficeBuilding,
  HiSparkles,
  HiStar,
  HiUserGroup,
} from "react-icons/hi";

const FLOATING_ICONS = [
  {
    id: "blueprint",
    icon: HiHome,
    position: { x: 15, y: 20 },
    size: "h-16 w-16",
    color: "border-blue-400/30 bg-blue-500/10",
    delay: 0,
  },
  {
    id: "crane",
    icon: HiCog,
    position: { x: 85, y: 15 },
    size: "h-20 w-20",
    color: "border-orange-400/40 bg-orange-500/15",
    delay: 0.5,
  },
  {
    id: "building",
    icon: HiOfficeBuilding,
    position: { x: 20, y: 70 },
    size: "h-24 w-24",
    color: "border-gray-400/35 bg-gray-500/12",
    delay: 1,
  },
  {
    id: "team",
    icon: HiUserGroup,
    position: { x: 80, y: 75 },
    size: "h-[4.5rem] w-[4.5rem]",
    color: "border-green-400/30 bg-green-500/10",
    delay: 1.5,
  },
  {
    id: "sparkles",
    icon: HiSparkles,
    position: { x: 50, y: 10 },
    size: "h-12 w-12",
    color: "border-yellow-400/40 bg-yellow-500/15",
    delay: 2,
  },
  {
    id: "lightning",
    icon: HiLightningBolt,
    position: { x: 10, y: 50 },
    size: "h-14 w-14",
    color: "border-purple-400/35 bg-purple-500/12",
    delay: 2.5,
  },
] as const;

const cardVariants = {
  initial: { scale: 0.8, opacity: 0, rotateY: -15, z: -100 },
  animate: {
    scale: 1,
    opacity: 1,
    rotateY: 0,
    z: 0,
    transition: {
      duration: 1.2,
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    rotateY: 5,
    rotateX: -5,
    z: 50,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      stiffness: 200,
    },
  },
};

const iconVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: (delay: number) => ({
    opacity: [0, 1, 0.8, 1],
    scale: [0, 1, 0.9, 1],
    transition: {
      duration: 3,
      delay,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  }),
};

const sparkleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 0.3, 0.6, 0.3, 0],
    scale: [0, 1, 1.2, 1, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export function JoinCtaSection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  useEffect(() => {
    if (!inView) return;
    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMouseMove);
  }, [inView, onMouseMove]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-charcoal via-charcoal/90 to-charcoal"
    >
      {/* Mouse-follow color washes */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%,
              rgba(27, 85, 142, 0.3) 0%,
              rgba(27, 85, 142, 0.1) 30%,
              transparent 70%)`,
          }}
          animate={{
            background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%,
              rgba(27, 85, 142, 0.4) 0%,
              rgba(27, 85, 142, 0.15) 30%,
              transparent 70%)`,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${100 - mouse.x}% ${100 - mouse.y}%,
              rgba(249, 115, 22, 0.2) 0%,
              rgba(249, 115, 22, 0.05) 40%,
              transparent 80%)`,
          }}
          animate={{
            background: `radial-gradient(circle at ${100 - mouse.x}% ${100 - mouse.y}%,
              rgba(249, 115, 22, 0.25) 0%,
              rgba(249, 115, 22, 0.08) 40%,
              transparent 80%)`,
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Floating construction icons */}
      <div className="absolute inset-0">
        {FLOATING_ICONS.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className={`absolute ${item.size} ${item.color} rounded-full border-2 backdrop-blur-sm`}
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              variants={iconVariants}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              custom={item.delay}
            >
              <div className="flex h-full w-full items-center justify-center">
                <Icon className="h-6 w-6 text-white/60" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Soft blur orbs */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        variants={sparkleVariants}
        initial="initial"
        animate={inView ? "animate" : "initial"}
      >
        <div
          className="absolute h-96 w-96 rounded-full from-white/20 via-white/5 to-transparent blur-3xl"
          style={{
            left: `${mouse.x}%`,
            top: `${mouse.y}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute h-64 w-64 rounded-full blur-2xl"
          style={{
            left: `${100 - mouse.x}%`,
            top: `${100 - mouse.y}%`,
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(27,85,142,0.3) 0%, rgba(27,85,142,0.1) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Content card */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl md:p-12"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            variants={cardVariants}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            whileHover="hover"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-1/20 via-transparent to-primary-2/20"
              animate={{ opacity: hovered ? 0.8 : 0.4 }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-6 py-3 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-white">
                  <HiStar className="h-4 w-4" />
                  {t("joinToday")}
                </span>
              </motion.div>

              <motion.h2
                className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t("expertiseLine1")}
                <br />
                <span className="text-white">{t("expertiseLine2")}</span>
              </motion.h2>

              <motion.p
                className="mb-8 text-lg text-white/90 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t("description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Link
                  href="/auth/sign-up"
                  className="group relative inline-flex items-center gap-3 rounded-xl bg-primary-2 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-primary-1 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)]"
                >
                  <span>{t("joinNow")}</span>
                  <motion.div
                    animate={{ x: hovered ? (isRtl ? -5 : 5) : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiArrowRight
                      className={`h-5 w-5 transition-transform ${isRtl ? "rotate-180" : ""}`}
                    />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <HiSparkles className="h-4 w-4 text-white" />
                  <span>{t("freeToJoin")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiUserGroup className="h-4 w-4 text-white" />
                  <span>{t("thousandsOfProfessionals")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiLightningBolt className="h-4 w-4 text-white" />
                  <span>{t("opportunitiesAvailable")}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Hover ripple rings */}
      <AnimatePresence>
        {hovered ? (
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-96 w-96 rounded-full border-2 border-primary-1/30"
              style={{ transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full border border-primary-2/40"
              style={{ transform: "translate(-50%, -50%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
