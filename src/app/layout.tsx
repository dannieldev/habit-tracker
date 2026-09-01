import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frictionless Habit Tracker",
  description: "Track your habits with zero friction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
