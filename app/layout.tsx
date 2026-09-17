import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, Fraunces, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-schibsted",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Engineer building production data, applied-AI and analytics systems on Python and Microsoft SQL Server. Digital Transformation Specialist at Iwaki America.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-previews-psi.vercel.app"),
  title: {
    default: `${profile.name} — Digital Transformation & AI Systems`,
    template: `%s — ${profile.shortName}`,
  },
  description,
  keywords: [
    "Digital Transformation", "AI Systems", "MRP", "Supply Chain Analytics",
    "Large Language Models", "Python", "Microsoft SQL Server", "Data Engineering",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Digital Transformation & AI Systems`,
    description,
    type: "profile",
    locale: "en_US",
    images: [{ url: "/photo.jpg", width: 680, height: 906, alt: profile.name }],
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${schibsted.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
