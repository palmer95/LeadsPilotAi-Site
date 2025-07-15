// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={inter.className}>
          <header className="site-header">
            <div className="container">
              <div className="header-content">
                <Link href="/" passHref>
                  <div className="logo">LeadsPilotAI</div>
                </Link>
                <nav className="main-nav">
                  <Link href="/#features" className="nav-link">
                    Features
                  </Link>
                  <Link href="/pricing" className="nav-link">
                    Pricing
                  </Link>
                  <Link href="/contact" className="nav-link">
                    Contact
                  </Link>
                  <Link href="/admin" className="nav-link">
                    Admin
                  </Link>
                </nav>
                <div className="header-cta">
                  <Link href="/contact" passHref>
                    <button className="btn btn-primary">Get Started</button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          <main>{children}</main>

          {/* Chatbot mount point */}
          <div id="chatbot-root" />

          <footer className="site-footer">
            <div className="container">
              <div className="footer-content">
                <p>
                  &copy; {new Date().getFullYear()} LeadsPilotAI. All rights
                  reserved.
                </p>
                <div className="footer-links">
                  <Link href="/privacy" className="footer-link">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="footer-link">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
