// components/Header.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Check if user is logged in
    (async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoggedIn(false);
        return;
      }
      try {
        const res = await fetch(
          "https://leadspilotai.onrender.com/api/admin/verify-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setLoggedIn(res.ok && data.logged_in);
      } catch (error) {
        console.error("Error: ", error);
        setLoggedIn(false);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await fetch("https://leadspilotai.onrender.com/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    router.push("/admin/login");
  };

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
          {loggedIn ? (
            <button onClick={handleLogout} className="nav-link">
              Sign Out
            </button>
          ) : (
            <Link href="/admin/login" className="nav-link">
              Sign In
            </Link>
          )}
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
        {loggedIn ? (
          <button onClick={handleLogout} className="nav-link">
            Sign Out
          </button>
        ) : (
          <Link href="/admin/login" className="nav-link">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
