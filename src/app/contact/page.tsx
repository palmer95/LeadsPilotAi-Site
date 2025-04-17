"use client";
import Link from "next/link";
import React from "react";

export default function ContactPage() {
  return (
    <main
      style={{
        backgroundColor: "#ffffff",
        color: "#111111",
        minHeight: "100vh",
        padding: "4rem 1rem",
      }}
    >
      <section
        style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Need Help or Want to Chat with a Human?
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#4B5563",
            marginBottom: "2.5rem",
          }}
        >
          Our AI assistant is always available, but if you prefer real human
          help, we’re just a message away.
        </p>

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <div>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@leadspilotai.com"
              style={{ color: "#2D3B8F" }}
            >
              hello@leadspilotai.com
            </a>
          </div>
          <div>
            <strong>Response Time:</strong> Within 1 business day
          </div>
          <div>
            <strong>Live Chat:</strong> Our AI is available 24/7 in the bottom
            right
          </div>
        </div>

        {/* Optional Contact Form - replace with real endpoint later */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            style={inputStyle}
          />
          <textarea
            placeholder="What can we help you with?"
            rows={5}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            disabled
            style={{
              backgroundColor: "#2D3B8F",
              color: "#fff",
              padding: "0.75rem",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: "not-allowed",
              opacity: 0.6,
            }}
          >
            Coming Soon
          </button>
        </form>

        <p style={{ fontSize: "0.9rem", color: "#999", marginTop: "1rem" }}>
          Or just hit the chatbot below — it’s trained on everything we do.
        </p>
      </section>
    </main>
  );
}

const inputStyle = {
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
  fontSize: "1rem",
};
