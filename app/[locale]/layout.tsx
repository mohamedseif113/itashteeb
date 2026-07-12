import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Cairo } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: {
    default:
      "itashteeb - Find Trusted Construction & Finishing Professionals in Egypt",
    template: "%s | itashteeb",
  },
  description:
    "Connect with top-rated architects, contractors, interior designers, and finishing experts in Egypt. Browse portfolios, compare prices, and hire verified professionals.",
  authors: [{ name: "itashteeb" }],
  creator: "itashteeb",
  metadataBase: new URL("https://itashteeb.com"),
  openGraph: {
    type: "website",
    siteName: "itashteeb",
    images: [{ url: "/og-image-en.jpg", width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
