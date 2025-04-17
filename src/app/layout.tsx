import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
            backgroundColor: "#ffffff",
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
            }}
          >
            <Image
              src="/logo.png"
              alt="LeadsPilotAI Logo"
              width={150}
              height={40}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <nav style={{ display: "flex", gap: "1.5rem", fontSize: "0.95rem" }}>
            <Link
              href="/product"
              style={{ color: "#111111", textDecoration: "none" }}
            >
              Product
            </Link>
            <Link
              href="/pricing"
              style={{ color: "#111111", textDecoration: "none" }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              style={{ color: "#111111", textDecoration: "none" }}
            >
              Contact
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer */}
        <footer
          style={{
            marginTop: "4rem",
            padding: "2rem",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#999999",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          © {new Date().getFullYear()} LeadsPilotAI. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
