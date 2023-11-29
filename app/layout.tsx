import { ReactNode } from "react";
import "./globals.css";

import { classNames } from "@/utils/helpers";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HAIB",
  description: "This is HAIB",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        } catch (_) {}
      `,
          }}
        />
      </head>

      <body
        className={classNames(
          "h-full bg-white dark:bg-slate-800 transition duration-300 text-gray-900 dark:text-gray-100",
          inter.className
        )}
      >
        <header>
          <Nav />
        </header>

        <main className="min-h-screen py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
