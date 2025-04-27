import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { manRope } from "./fonts/fonts";
import "./globals.css";
import Nav from "./components/Nav";
import { Inter } from "next/font/google";
import { ApolloWrapper } from "../lib/apollo-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <ApolloWrapper>
        <body
          className={`${manRope.className} antialiased p-4 px-6 md:p-10 md:px-20 ${inter.className}`}
        >
          <Nav />
          {children}
          <GoogleAnalytics gaId="G-9CGD79RZJP" />
        </body>
      </ApolloWrapper>
    </html>
  );
}
