// app/layout.tsx

import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "./context/AuthContext";
import Header from "../components/Header";
import Logo from "../components/Logo";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "LeadsPilotAI — Your AI Sales Assistant",
  description:
    "Turn your website traffic into qualified, booked appointments 24/7.",
};

export const viewport = {
  themeColor: "#ffffff",
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
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="container">
              <div className="footer-main">
                <div className="footer-brand">
                  <Logo />
                  <p className="footer-tagline">
                    The AI sales assistant that turns your website traffic into
                    qualified, booked appointments — 24/7.
                  </p>
                </div>
                <div className="footer-columns">
                  <div>
                    <p className="footer-col-title">Product</p>
                    <div className="footer-col">
                      <Link href="/#features" className="footer-link">
                        Features
                      </Link>
                      <Link href="/pricing" className="footer-link">
                        Pricing
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="footer-col-title">Company</p>
                    <div className="footer-col">
                      <Link href="/contact" className="footer-link">
                        Contact
                      </Link>
                      <a
                        href="mailto:hello@leadspilotai.com"
                        className="footer-link"
                      >
                        hello@leadspilotai.com
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="footer-col-title">Legal</p>
                    <div className="footer-col">
                      <Link href="/privacy" className="footer-link">
                        Privacy Policy
                      </Link>
                      <Link href="/terms" className="footer-link">
                        Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>
                  &copy; {new Date().getFullYear()} LeadsPilotAI. All rights
                  reserved.
                </p>
                <div className="footer-links">
                  <Link href="/privacy" className="footer-link">
                    Privacy
                  </Link>
                  <Link href="/terms" className="footer-link">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
