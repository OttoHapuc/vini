import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vini - Next.js Project",
  description: "Novo projeto Next.js com Vanilla CSS premium e TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
