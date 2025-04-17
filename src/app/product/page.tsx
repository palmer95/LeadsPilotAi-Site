"use client";
import Link from "next/link";
import React from "react";

export default function ProductPage() {
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
        style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          What Your AI Sales Agent Can Do
        </h1>
        <p
          style={{ fontSize: "1.1rem", color: "#4B5563", marginBottom: "3rem" }}
        >
          LeadsPilotAI is trained on your website, branded to match your
          business, and powered by real AI to help you convert more visitors
          into customers — 24/7.
        </p>

        {/* Centered Feature Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
            maxWidth: "1000px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          {[
            {
              title: "Instant Q&A",
              desc: "Answers customer questions using your website content, instantly and accurately.",
            },
            {
              title: "Lead Capture",
              desc: "Grabs emails and inquiries so you never miss a potential client.",
            },
            {
              title: "Booking Triggers",
              desc: "Notifies your team or starts bookings when someone’s ready to buy.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                flex: "1 1 280px",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "1.5rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                maxWidth: "300px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#4B5563" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              emoji: "📄",
              label: "Ingest",
              desc: "We scan your website to learn your services, tone, and branding.",
            },
            {
              emoji: "🧠",
              label: "Train",
              desc: "We embed your content and add smart fallback AI to fill in the blanks.",
            },
            {
              emoji: "🚀",
              label: "Launch",
              desc: "We go live on your site with a branded AI that helps you sell 24/7.",
            },
          ].map((step, i) => (
            <div
              key={i}
              style={{
                width: "240px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {step.emoji}
              </div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {step.label}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "#4B5563" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "2rem" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Ready to get your AI assistant live?
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link href="/pricing">
              <button
                style={{
                  backgroundColor: "#2D3B8F",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                View Pricing
              </button>
            </Link>
            <Link href="/contact">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#2D3B8F",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  fontWeight: 500,
                  textDecoration: "underline",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Request a Demo
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
