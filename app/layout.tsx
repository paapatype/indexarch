import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IndexArch — Interactive 3D Catalogs for Manufacturers",
  description:
    "Convert your static PDF product catalogs into interactive 3D web experiences. Smart filtering, side-by-side comparison, and pre-qualified inquiries for fastener, tile, and hardware manufacturers.",
  keywords: [
    "3D product catalog",
    "interactive catalog",
    "PDF to digital catalog",
    "manufacturing catalog",
    "B2B SaaS",
    "product filtering",
    "fastener catalog",
    "tiles catalog",
  ],
  openGraph: {
    title: "IndexArch — Interactive 3D Catalogs for Manufacturers",
    description:
      "Engineers spend 4.5 hours searching PDFs for a single spec. With Index, it takes 10 seconds.",
    type: "website",
    locale: "en_IN",
    siteName: "IndexArch",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndexArch — Interactive 3D Catalogs for Manufacturers",
    description:
      "Convert your static PDF catalogs into interactive 3D web experiences.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
