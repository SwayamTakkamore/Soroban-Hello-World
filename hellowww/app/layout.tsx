import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soroban Hello World | Stellar Smart Contracts",
  description: "A modern, animated frontend for Soroban smart contracts on Stellar blockchain",
  keywords: ["Soroban", "Stellar", "Smart Contracts", "Blockchain", "Web3"],
  authors: [{ name: "Stellar Developer" }],
  openGraph: {
    title: "Soroban Hello World",
    description: "Experience the future of smart contracts on Stellar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
