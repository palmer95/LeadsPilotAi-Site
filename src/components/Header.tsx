// components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="LeadsPilotAI Logo"
            width={360}
            height={120}
            className="logo-img"
            priority
          />
        </Link>
        <nav className="nav">
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
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`}>
        <Link href="/product" className="nav-link" onClick={toggleMenu}>
          Product
        </Link>
        <Link href="/pricing" className="nav-link" onClick={toggleMenu}>
          Pricing
        </Link>
        <Link href="/contact" className="nav-link" onClick={toggleMenu}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
