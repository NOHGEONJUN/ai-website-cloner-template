import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ko" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
        />
      </head>
      <body className="min-h-full bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
