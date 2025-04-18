"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function PricingPage() {
  const [selected, setSelected] = useState("Pro (Early Adopter)");

  const tiers = [
    {
      title: "Starter",
      price: "$99/mo",
      features: [
        "AI assistant trained on your website",
        "Live on your site 24/7",
        "Lead capture & delivery via email",
      ],
      cta: "Contact Us",
    },
    {
      title: "Pro (Early Adopter)",
      price: "$249/mo",
      features: [
        "Everything in Starter",
        "Booking triggers via Discord, SMS, Slack, or Email",
        "Custom fallback context tuning",
        "Priority support",
      ],
      cta: "Get Started",
    },
    {
      title: "One-Time Purchase",
      price: "$5,000",
      features: [
        "Fully custom AI assistant",
        "No ongoing monthly subscription",
        "You own the implementation",
        "Includes setup, training & handoff",
        "Requires $29/mo for hosting & API maintenance",
      ],
      cta: "Request Ownership",
    },
    {
      title: "Need Something Else?",
      price: "Custom",
      features: [
        "White-label chatbot",
        "Advanced integrations (Zapier, CRM, Calendars)",
        "Dedicated onboarding & support",
        "Built to spec — we’ll scope it with you",
      ],
      cta: "Request a Quote",
    },
  ];

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
        style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Simple, Transparent Pricing
        </h1>
        <p
          style={{ fontSize: "1.1rem", color: "#4B5563", marginBottom: "3rem" }}
        >
          No hidden fees. Cancel anytime. Your AI Sales Agent is ready when you
          are.
        </p>

        {/* Pricing Tiers */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {tiers.map((tier, i) => {
            const isSelected = selected === tier.title;
            return (
              <div
                key={i}
                onClick={() => setSelected(tier.title)}
                style={{
                  flex: "1 1 280px",
                  border: isSelected
                    ? "2px solid #2D3B8F"
                    : "1px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "2rem",
                  backgroundColor: isSelected ? "#f5f8ff" : "#ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  maxWidth: "320px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.title}
                </h3>
                <p
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    color: "#2D3B8F",
                  }}
                >
                  {tier.price}
                </p>
                <ul style={{ paddingLeft: "1.2rem", marginBottom: "1.5rem" }}>
                  {tier.features.map((f, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "0.95rem",
                        color: "#4B5563",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: isSelected ? "#2D3B8F" : "#f1f1f1",
                    color: isSelected ? "#ffffff" : "#2D3B8F",
                    padding: "0.75rem 1rem",
                    borderRadius: "6px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            );
          })}
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
            Not sure which is best for you?
          </h3>
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
              Need Help or Want to Chat with a Human?
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
