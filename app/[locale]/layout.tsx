import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";

const SITE_URL = "https://mohamed-seif.vercel.app";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const siteName = t("siteName");

  return {
    title: {
      default: title,
      template: t("titleTemplate"),
    },
    description,
    authors: [{ name: siteName }],
    creator: siteName,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      url: `${SITE_URL}/${locale}`,
      siteName,
      title,
      description,
      images: [{ url: t("ogImage"), width: 1200, height: 630 }],
    },
    icons: {
      icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          cairo.variable,
          isArabic ? cairo.className : inter.className,
          "antialiased",
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
