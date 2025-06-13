// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    localStorage.removeItem("authToken"); // Clear any stale token
    const res = await fetch(
      "https://leadspilotai.onrender.com/api/admin/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("authToken", data.token);
      router.push("/admin");
    } else {
      setError(data.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <main className="contact">
      <section className="contact-form">
        <h1 className="section-title">Admin Login</h1>

        {error && <p className="contact-status error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="contact-input"
            required
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="contact-input"
            required
          />
          <button type="submit" className="contact-button" disabled={loading}>
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>
      </section>
    </main>
  );
}
