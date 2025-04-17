"use client";
import Link from "next/link";

export default function Home() {
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
        {/* Hero */}
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}
        >
          Your AI Sales Agent, Live on Your Site 24/7
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#4B5563",
            marginBottom: "2rem",
          }}
        >
          Instantly answer questions, capture leads, and book clients — all
          branded for your business.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <Link href="/product">
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
              See It in Action
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
              Get Early Access
            </button>
          </Link>
        </div>

        {/* Benefits */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              emoji: "💬",
              title: "Answers Instantly",
              desc: "No more missed questions — your AI agent responds in real time, 24/7.",
            },
            {
              emoji: "📥",
              title: "Captures Every Lead",
              desc: "Emails, phone numbers, and interest — collected and sent to you automatically.",
            },
            {
              emoji: "⚡",
              title: "Books While You Sleep",
              desc: "Triggers alerts or bookings via SMS, Discord, or Slack the moment a lead is ready.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                width: "260px",
                textAlign: "center",
                padding: "1rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {item.emoji}
              </div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "#4B5563" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* What Makes Us Different */}
        <h2
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          What Makes Us Different
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              emoji: "🎯",
              label: "Custom-Branded",
              desc: "Matches your website’s tone and look — it’s not a generic widget.",
            },
            {
              emoji: "🧠",
              label: "Smart Fallback AI",
              desc: "Answers everything — even questions not covered on your site.",
            },
            {
              emoji: "📲",
              label: "Booking-Ready",
              desc: "Notifies your team and sends texts when a customer’s ready to book.",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                width: "240px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                {item.emoji}
              </div>
              <h4
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {item.label}
              </h4>
              <p style={{ fontSize: "0.95rem", color: "#4B5563" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Ready to turn your website into a 24/7 sales machine?
          </h3>
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
        </div>
      </section>
    </main>
  );
}
