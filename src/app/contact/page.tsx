// app/contact/page.tsx
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
    <main>
      <section className="contact">
        <h1 className="hero-title">Contact Us</h1>
        <p className="hero-text">
          Have a question or want to collaborate? Reach out, and we’ll get back
          to you promptly.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="contact-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="contact-input"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="contact-textarea"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="contact-button"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <p className="contact-status success">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="contact-status error">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
