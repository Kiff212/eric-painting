import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric's Pro Painting | Expert Residential & Commercial Services",
  description: "Transform your home with Eric's Pro Painting. Serving Richmond, East Bay, and SF with detailed preparation and flawless finishes. Get a free quote today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
