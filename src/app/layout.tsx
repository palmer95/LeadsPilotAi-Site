// app/layout.tsx (Corrected Structure)

import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "./context/AuthContext";
import Header from "../components/Header";

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
      {/* The <head> tag is ONLY for metadata, scripts, and links */}
      <head>
        <Script
          src="/chatbot.js"
          strategy="afterInteractive"
          data-company="leadspilotai"
        />
        {/* The old chatbot.css link is correctly removed */}
      </head>

      {/* The <body> tag contains ALL visible content */}
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          {/* Chatbot mount point can be here if needed, but the script handles it */}
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
        </AuthProvider>
      </body>
    </html>
  );
}
