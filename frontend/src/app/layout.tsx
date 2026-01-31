import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Law Firm - Mohammed bin Sameeh Al-Essawy",
  description: "Leading legal offices offering exceptional advisory services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
