// app/layout.tsx
import "./globals.css";
import Header from "../components/Header";
import Link from "next/link"; // Added missing import
import type { Metadata } from "next";
import Script from "next/script";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Script
          src="/chatbot.js"
          strategy="afterInteractive"
          data-company="leadspilotai"
        />
        <link rel="stylesheet" href="/chatbot.css" />
      </head>
      <body>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main>{children}</main>

        {/* Chatbot mount point */}
        <div id="chatbot-root" />

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div>
              <h4 className="footer-brand">LeadsPilotAI</h4>
              <p className="footer-text">
                Empowering businesses with AI-driven sales solutions.
              </p>
            </div>
            <div className="footer-links">
              <Link href="/product" className="footer-link">
                Product
              </Link>
              <Link href="/pricing" className="footer-link">
                Pricing
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} LeadsPilotAI. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
