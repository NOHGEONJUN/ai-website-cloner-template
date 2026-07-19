import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Self-hosted SpoqaHanSansNeo (SIL OFL) — the live app's font, without the
   CDN round-trip/FOUT of the previous <link> stylesheet approach. */
const spoqa = localFont({
  src: [
    { path: "../fonts/SpoqaHanSansNeo-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SpoqaHanSansNeo-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/SpoqaHanSansNeo-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-spoqa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RnDcircle | 정부 과제 추천",
  description: "AI 기반 정부 과제 추천 서비스 (reference clone)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`h-full antialiased ${spoqa.variable}`}>
      <body className="min-h-full bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
