// app/components/Header.tsx
"use client"; // This must be a client component to use state and events

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo-image-container">
            <Image
              src="/logo.png"
              alt="LeadsPilotAI Logo"
              fill={true} // Use the 'fill' prop
              sizes="48px" // Helps Next.js optimize for the rendered size
            />
          </div>
          <Link href="/" passHref>
            <div className="logo">LeadsPilotAI</div>
          </Link>

          {/* Desktop Navigation */}
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

            {/* Hamburger Menu Button */}
            <button
              className="hamburger-menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* This creates the three lines of the icon */}
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
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
