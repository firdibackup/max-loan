import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// ponytail: TRIAL file lifted from the reference export; swap for a licensed
// Neue Haas Grotesk Display 65 Medium before launch.
const haas = localFont({
  variable: "--font-haas",
  src: "../fonts/haas-grot-disp-65-medium-trial.otf",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REMAX · Personal KPR Financial Assistant",
  description:
    "Pahami kondisi KPR kamu, pantau perubahan bunga, dan cari tahu pilihan yang tersedia sebelum mengambil keputusan.",
};

export const viewport: Viewport = {
  themeColor: "#f7f5ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${manrope.variable} ${haas.variable} antialiased`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
