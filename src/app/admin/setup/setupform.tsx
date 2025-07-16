// app/setup/SetupForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SetupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Set token in useEffect to avoid hydration errors
  useEffect(() => {
    const tokenFromParams = params.get("token") ?? "";
    setToken(tokenFromParams);
    if (!tokenFromParams) {
      setError("This invitation link is invalid or has expired.");
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("This invitation link is invalid or has expired.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://leadspilotai.onrender.com/api/admin/login-with-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await res.json();
      if (res.ok && data.token) {
        // Instead of just pushing, we'll use the AuthContext to log in
        // For now, let's keep the localStorage logic as it's simpler
        localStorage.setItem("authToken", data.token);
        router.push("/admin");
      } else {
        setError(data.error || "Failed to set up account.");
        setLoading(false);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="setup-header">
          <Link href="/" className="setup-logo">
            LeadsPilotAI
          </Link>
          <h2>Create Your Account</h2>
          <p>Set a secure password to access your admin dashboard.</p>
        </div>

        <form className="setup-form" onSubmit={handleSubmit}>
          {error && <p className="setup-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className="setup-button"
            disabled={loading || !token}
          >
            {loading ? "Saving..." : "Set Password & Finish"}
          </button>
        </form>
      </div>
    </div>
  );
}
