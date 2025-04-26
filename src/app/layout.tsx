// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadsPilotAI",
  description: "Your AI Sales Agent that lives on your site 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="/chatbot.js"
          strategy="afterInteractive"
          data-company="leadspilotai"
        />
        <link rel="stylesheet" href="/chatbot.css" />
      </head>
      <body
        style={{
          backgroundColor: "#ffffff",
          color: "#111111",
          margin: 0,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: "transparent",
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              background: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="LeadsPilotAI Logo"
              width={600}
              height={180}
              style={{
                objectFit: "contain",
                background: "none",
              }}
              priority
            />
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem", fontSize: "1rem" }}>
            <Link href="/product" className="nav-link">
              Product
            </Link>
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</main>

        {/* 3) Mount point for your chat bubble */}
        <div id="chatbot-root" />

        {/* Footer */}
        <footer
          style={{
            marginTop: "4rem",
            padding: "2rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#4B5563",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
          }}
        >
          © {new Date().getFullYear()} LeadsPilotAI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
