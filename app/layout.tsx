import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LP Jurídico — Leandro Pedrosa Advocacia Criminal",
  description: "Sistema de gestão de escritório de advocacia criminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`dark ${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-200">
        {children}
      </body>
    </html>
  );
}
