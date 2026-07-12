import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">404</h1>
          <p className="text-gray-600">This page could not be found.</p>
        </main>
      </body>
    </html>
  );
}
