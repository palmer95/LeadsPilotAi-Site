// app/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

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
          <Logo />

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

          {/* Desktop CTA Group */}
          <div className="header-cta-group">
            <Link href="/admin" className="nav-link admin-link">
              Log in
            </Link>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className={`hamburger-menu ${isMenuOpen ? "is-open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
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
          Log in
        </Link>
        <Link href="/contact" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </header>
  );
}
