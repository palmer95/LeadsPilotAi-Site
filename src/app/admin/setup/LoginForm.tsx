import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import crypto from "crypto-js"; // Add this library

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError("Invite token is missing.");
  }, [token]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Hash the password with SHA-256
    const hashedPassword = crypto.SHA256(password).toString();

    const res = await fetch(
      "https://leadspilotai.onrender.com/api/admin/login-with-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, password: hashedPassword }),
      }
    );

    const body = await res.json();
    if (res.ok && body.success) {
      router.push("/admin");
    } else {
      setError(body.error || "Login failed");
      setLoading(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-form">
        <h1 className="section-title">Set Your Admin Password</h1>

        {error && <p className="contact-status error">{error}</p>}

        <form>
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="contact-input"
            required
          />
        </form>

        <button
          type="submit"
          className="contact-button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Setting…" : "Set Password & Log In"}
        </button>
      </div>
    </section>
  );
}
