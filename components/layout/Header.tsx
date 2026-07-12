"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "home" as const, href: "/" },
  { key: "services" as const, href: "/services" },
  { key: "professionals" as const, href: "/professionals" },
  { key: "projects" as const, href: "/projects" },
  { key: "packages" as const, href: "/packages" },
  { key: "ideaBook" as const, href: "/idea-book" },
  { key: "about" as const, href: "/about" },
  { key: "contactUs" as const, href: "/contact" },
];

function brandLogo(locale: string, light: boolean) {
  if (locale === "ar") {
    return light
      ? "/assets/logo/logo_light_orange_ar.png"
      : "/assets/logo/logo_ar.png";
  }
  return light
    ? "/assets/logo/logo_light_orange_en.png"
    : "/assets/logo/logo_en.png";
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  const transparent = !scrolled;
  const logoSrc = brandLogo(locale, transparent);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <div className="container-custom flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
        <Link href="/" className="flex-shrink-0">
          <div
            className="relative h-10 w-auto md:h-12"
            style={{ width: "120px" }}
          >
            <Image
              src={logoSrc}
              alt="itashteeb"
              fill
              quality={90}
              priority
              sizes="120px"
              className={cn(
                "object-contain",
                isAr ? "object-right" : "object-left",
              )}
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                scrolled
                  ? "text-gray-700 hover:bg-gray-100 hover:text-primary-1"
                  : "text-white/90 hover:bg-white/10 hover:text-white",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={switchLocale}
            className={cn(
              "hidden items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors duration-200 sm:flex",
              scrolled
                ? "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-primary-1"
                : "border-white/25 text-white/90 hover:bg-white/10 hover:text-white",
            )}
          >
            <span>{locale === "en" ? "AR" : "EN"}</span>
          </button>

          <Link
            href="/auth/sign-in"
            className={cn(
              "hidden rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 lg:block",
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10",
            )}
          >
            {t("signIn")}
          </Link>

          <Link
            href="/auth/sign-up"
            className="hidden rounded-xl bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow transition-all duration-200 hover:bg-orange-600 hover:shadow-md lg:block"
          >
            {t("joinToday")}
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "rounded-lg p-2 transition-colors duration-200 xl:hidden",
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10",
            )}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden bg-white shadow-lg transition-all duration-300 xl:hidden",
          menuOpen ? "max-h-[600px]" : "max-h-0",
        )}
      >
        <nav className="container-custom flex flex-col gap-0.5 py-3">
          {NAV_LINKS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary-1"
            >
              {t(key)}
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-2">
            <button
              onClick={() => {
                switchLocale();
                setMenuOpen(false);
              }}
              className="rounded-lg px-4 py-3 text-start text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
            >
              {locale === "en" ? "عربي / Arabic" : "English"}
            </button>

            <Link
              href="/auth/sign-in"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {t("signIn")}
            </Link>

            <Link
              href="/auth/sign-up"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white transition-all hover:bg-orange-600"
            >
              {t("joinToday")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
