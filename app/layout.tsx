import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Developer — Portfolio",
  description: "Full-stack developer crafting immersive digital experiences at the intersection of Web3 and AI.",
  keywords: ["Web3", "AI", "Full-Stack Developer", "Creative Developer", "Portfolio"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Creative Developer — Portfolio",
    description: "Full-stack developer crafting immersive digital experiences at the intersection of Web3 and AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Developer — Portfolio",
    description: "Full-stack developer crafting immersive digital experiences at the intersection of Web3 and AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased noise-overlay`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
