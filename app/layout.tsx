import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-context";

// --- 1. Configure INTER ---
const inter = localFont({
  src: [
    { path: "./fonts/Inter/Inter-Thin.ttf", weight: "100", style: "normal" },
    {
      path: "./fonts/Inter/Inter-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    { path: "./fonts/Inter/Inter-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Inter/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Inter/Inter-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/Inter/Inter-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/Inter/Inter-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "./fonts/Inter/Inter-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    { path: "./fonts/Inter/Inter-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-inter", // This creates a CSS variable named var(--font-inter)
});

// --- 2. Configure ERBAUM ---
const erbaum = localFont({
  src: [
    { path: "./fonts/Erbaum/Erbaum-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/Erbaum/Erbaum-Light.ttf", weight: "300", style: "normal" },
    // "Book" is usually slightly lighter than Regular.
    // We map it to 350 so you can use it distinctly if needed.
    { path: "./fonts/Erbaum/Erbaum-Book.ttf", weight: "350", style: "normal" },
    {
      path: "./fonts/Erbaum/Erbaum-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Erbaum/Erbaum-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    { path: "./fonts/Erbaum/Erbaum-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Erbaum/Erbaum-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-erbaum", // This creates var(--font-erbaum)
});

export const metadata: Metadata = {
  title: "POSTER Photography",
  description:
    "Professional photography services - Capturing moments that tell stories",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${erbaum.variable} font-sans tracking-tight`}
        style={{ backgroundColor: "#282828" }}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
