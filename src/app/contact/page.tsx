"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      style={{
        backgroundColor: "#ffffff",
        color: "#111111",
        minHeight: "100vh",
        padding: "4rem 1rem",
      }}
    >
      <section style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "#4B5563",
            marginBottom: "2rem",
          }}
        >
          Have a question or want to collaborate? We'd love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              backgroundColor: "#2D3B8F",
              color: "#ffffff",
              padding: "0.75rem",
              borderRadius: "8px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p style={{ color: "green", textAlign: "center" }}>
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p style={{ color: "red", textAlign: "center" }}>
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
