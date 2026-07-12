import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HiMail, HiPhone } from "react-icons/hi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const CONTACT = {
  email: "info@itashteeb.com",
  phone: "+20 123 456 7890",
  whatsapp: "201234567890",
};

const SOCIALS = {
  facebook: "https://facebook.com",
  twitter: "https://twitter.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  youtube: "https://youtube.com",
};

export async function Footer({ className = "" }: { className?: string }) {
  const t = await getTranslations("footer");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const year = new Date().getFullYear();

  const logoSrc = isAr
    ? "/assets/logo/logo_light_orange_ar.png"
    : "/assets/logo/logo_light_orange_en.png";

  const serviceLinks = [
    { label: t("categories.architects"), href: "/services" },
    { label: t("categories.contractors"), href: "/services" },
    { label: t("categories.interiorDesigners"), href: "/services" },
    { label: t("categories.painters"), href: "/services" },
  ];

  const companyLinks = [
    { label: t("about"), href: "/about" },
    { label: t("contactUs"), href: "/contact" },
    { label: t("blog"), href: "/blog" },
  ];

  const supportLinks = [
    { label: t("packages"), href: "/packages" },
    { label: t("help"), href: "/help" },
    { label: t("faq"), href: "/faq" },
    { label: t("terms"), href: "/terms" },
    { label: t("privacy"), href: "/privacy" },
  ];

  const socials = [
    { Icon: FaFacebookF, href: SOCIALS.facebook, label: "Facebook" },
    { Icon: FaTwitter, href: SOCIALS.twitter, label: "Twitter" },
    { Icon: FaInstagram, href: SOCIALS.instagram, label: "Instagram" },
    { Icon: FaLinkedinIn, href: SOCIALS.linkedin, label: "LinkedIn" },
    { Icon: FaYoutube, href: SOCIALS.youtube, label: "YouTube" },
    {
      Icon: FaWhatsapp,
      href: `https://wa.me/${CONTACT.whatsapp}`,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className={cn("bg-gray-900 text-gray-300", className)}>
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="mb-4 inline-block transition-opacity hover:opacity-80"
            >
              <div
                className="relative h-12 w-auto"
                style={{ width: "140px" }}
              >
                <Image
                  src={logoSrc}
                  alt="itashteeb"
                  fill
                  quality={90}
                  sizes="140px"
                  className={cn(
                    "object-contain",
                    isAr ? "object-right" : "object-left",
                  )}
                />
              </div>
            </Link>

            <p className="mb-4 text-sm leading-relaxed">{t("description")}</p>

            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-primary-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("company")}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support + contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("support")}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-white">
                {t("contactUs")}
              </h4>
              <div
                className={cn(
                  "space-y-2.5 text-sm",
                  isAr ? "text-right" : "text-left",
                )}
              >
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-white",
                    isAr && "flex-row-reverse justify-end",
                  )}
                >
                  {!isAr ? (
                    <HiMail className="h-4 w-4 flex-shrink-0 text-primary-1" />
                  ) : null}
                  <span dir="ltr">{CONTACT.email}</span>
                  {isAr ? (
                    <HiMail className="h-4 w-4 flex-shrink-0 text-primary-1" />
                  ) : null}
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-white",
                    isAr && "flex-row-reverse justify-end",
                  )}
                >
                  {!isAr ? (
                    <HiPhone className="h-4 w-4 flex-shrink-0 text-primary-1" />
                  ) : null}
                  <span dir="ltr">{CONTACT.phone}</span>
                  {isAr ? (
                    <HiPhone className="h-4 w-4 flex-shrink-0 text-primary-1" />
                  ) : null}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center text-sm">
            <p className="text-gray-400">
              {isAr ? (
                <>
                  جميع الحقوق محفوظة ©{" "}
                  <span className="font-semibold">
                    <span className="text-orange-500">i</span>تشطيب
                  </span>{" "}
                  {year} | تم التطوير بواسطة{" "}
                  <a
                    href="https://e-ramo.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-400 transition-colors hover:text-primary-2"
                  >
                    إي رامو للحلول الرقمية
                  </a>
                </>
              ) : (
                <>
                  All rights reserved ©{" "}
                  <span className="font-semibold">
                    <span className="text-orange-500">i</span>tashteeb
                  </span>{" "}
                  {year} | Developed by{" "}
                  <a
                    href="https://e-ramo.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-400 transition-colors hover:text-primary-2"
                  >
                    e-RAMO for Digital Solutions
                  </a>
                </>
              )}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                {t("terms")}
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/cookies"
                className="transition-colors hover:text-white"
              >
                {t("cookies")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
