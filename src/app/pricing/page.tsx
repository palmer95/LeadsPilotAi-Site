"use client";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [selected, setSelected] = useState("Pro (Early Adopter)");

  const tiers = [
    {
      title: "Pro (Early Adopter)",
      price: "$249/mo",
      features: [
        "AI assistant trained on your website",
        "Live on your site 24/7",
        "Lead capture & delivery via email or SMS",
        "Integrated Google Calendar appointment booking",
        "Custom fallback context tuning",
        "Priority support & onboarding",
      ],
      cta: "Get Started",
    },
    {
      title: "One-Time Purchase",
      price: "$5,000",
      features: [
        "Fully custom AI assistant",
        "No ongoing subscription",
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

  const comparison = [
    {
      feature: "Custom-trained on your site",
      clyde: "✅",
      manychat: "❌",
      drift: "🔶 Enterprise-only",
    },
    {
      feature: "AI handles Q&A 24/7",
      clyde: "✅",
      manychat: "✅",
      drift: "✅",
    },
    {
      feature: "Real-time appointment booking",
      clyde: "✅",
      manychat: "❌",
      drift: "❌",
    },
    {
      feature: "Lead capture & routing",
      clyde: "✅",
      manychat: "✅",
      drift: "✅",
    },
    {
      feature: "Custom fallback context tuning",
      clyde: "✅",
      manychat: "❌",
      drift: "✅ (via support)",
    },
    {
      feature: "Fully embeddable",
      clyde: "✅",
      manychat: "✅",
      drift: "✅",
    },
    {
      feature: "Pricing",
      clyde: "$249–$299/mo",
      manychat: "$15–$100/mo",
      drift: "$800–$1,500/mo",
    },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Simple, Transparent Pricing</h1>
          <p className="hero-text">
            No hidden fees. Cancel anytime. Clyde, your AI Sales Agent, is ready
            when you are.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="pricing">
        <div className="pricing-grid">
          {tiers.map((tier, i) => {
            const isSelected = selected === tier.title;
            return (
              <div
                key={i}
                onClick={() => setSelected(tier.title)}
                className={`pricing-card ${isSelected ? "selected" : ""}`}
              >
                <h3 className="pricing-title">{tier.title}</h3>
                <p className="pricing-price">{tier.price}</p>
                <ul className="pricing-features">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="pricing-feature">
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <button className="pricing-cta">{tier.cta}</button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison Chart */}
      <section className="comparison-section">
        <h2 className="section-title">How We Compare</h2>
        <div className="comparison-table">
          <div className="comparison-header">
            <div className="comparison-cell feature-col">Feature</div>
            <div className="comparison-cell highlight">
              Clyde (LeadsPilotAI)
            </div>
            <div className="comparison-cell">ManyChat / Tidio</div>
            <div className="comparison-cell">Drift / Intercom</div>
          </div>
          {comparison.map((row, idx) => (
            <div className="comparison-row" key={idx}>
              <div className="comparison-cell feature-col">{row.feature}</div>
              <div className="comparison-cell highlight">{row.clyde}</div>
              <div className="comparison-cell">{row.manychat}</div>
              <div className="comparison-cell">{row.drift}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2 className="cta-title">Not Sure Which Plan Fits?</h2>
        <p className="cta-text">
          Reach out, and we’ll help you find the perfect plan for your business.
        </p>
        <Link href="/contact">
          <button className="btn-cta">Talk to a Human</button>
        </Link>
      </section>
    </main>
  );
}
