import { ReactNode } from "react";
import "./globals.css";

import { classNames } from "@/utils/helpers";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatGPT",
  description: "A chatbot powered by GPT",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head></head>

      <body
        className={classNames(
          "h-full bg-white dark:bg-slate-800 transition duration-300 text-gray-900 dark:text-gray-100",
          inter.className
        )}
      >
        <header>
          <Nav />
        </header>

        <main>
          <div className="min-h-screen py-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
