// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "./context/AuthContext";
import Header from "@/components/Header";

export const metadata = {
  title: "LeadsPilotAI - Your AI Sales Assistant",
  description:
    "Turn your website traffic into qualified, booked appointments 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="/chatbot.js"
          strategy="afterInteractive"
          data-company="leadspilotai"
        />
        <link rel="stylesheet" href="/chatbot.css" />
      </head>
      <AuthProvider>
        <Header /> {/* <-- Use the new Header component */}
        <main>{children}</main>
      </AuthProvider>
    </html>
  );
}
