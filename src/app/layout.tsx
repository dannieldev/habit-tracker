import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-surface text-on-surface" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
