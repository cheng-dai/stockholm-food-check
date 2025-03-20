import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { manRope } from "./fonts/fonts";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Stockholm food check",
  description: "check if the food is safe to eat in stockholm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manRope.className} antialiased p-4 px-6 md:p-10 md:px-20`}
      >
        <Nav />
        {children}
        <GoogleAnalytics gaId="G-9CGD79RZJP" />
      </body>
    </html>
  );
}
