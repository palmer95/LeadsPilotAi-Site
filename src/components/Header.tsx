// app/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo" passHref>
            {/* The simplest possible structure */}
            <Image
              src="/logo.png"
              alt="LeadsPilotAI Logo"
              width={50} // Base width for aspect ratio
              height={50} // Base height for aspect ratio
            />
            <span>LeadsPilotAI</span>
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
          </nav>

          <div className="header-cta-group">
            <Link href="/admin" className="nav-link admin-link">
              Admin Login
            </Link>
            <Link href="/contact" passHref>
              <button className="btn btn-primary">Get Started</button>
            </Link>

            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-nav-panel ${isMenuOpen ? "is-open" : ""}`}>
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
          Admin Login
        </Link>
      </div>
    </header>
  );
}
