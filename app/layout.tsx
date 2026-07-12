import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

/**
 * Root layout must exist, but html/body live in [locale]/layout
 * so lang/dir can be set from the route locale (next-intl pattern).
 */
export default function RootLayout({ children }: Props) {
  return children;
}
