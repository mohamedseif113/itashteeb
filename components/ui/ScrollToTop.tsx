"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";
import { cn } from "@/lib/utils";

const SHOW_AFTER = 400;

export function ScrollToTop() {
  const t = useTranslations("common");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          key="scroll-to-top"
          onClick={scrollToTop}
          aria-label={t("scrollToTop")}
          initial={{ opacity: 0, y: 24, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.75 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          className={cn(
            "fixed bottom-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-primary-1 text-white shadow-lg shadow-primary-1/30 transition-colors hover:bg-primary-2 hover:shadow-primary-2/35 md:bottom-8 md:h-14 md:w-14",
            isRtl ? "left-5 md:left-8" : "right-5 md:right-8",
          )}
        >
          <motion.span
            className="relative flex items-center justify-center"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <HiArrowUp className="h-5 w-5 md:h-6 md:w-6" />
          </motion.span>

          {/* Soft pulse ring */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary-2/50"
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 1.45, opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
