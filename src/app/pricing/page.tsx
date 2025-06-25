// app/pricing/page.tsx
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

  const comparison1 = [
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
      clyde: "✅ (Google Calendar)",
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

  const comparison2 = [
    {
      feature: "Custom-trained on your site",
      clyde: "✅",
      callbox: "✅ (via ABM setup)",
      hubspot: "✅ (Premium add-on)",
    },
    {
      feature: "AI handles Q&A 24/7",
      clyde: "✅",
      callbox: "✅ (with automation)",
      hubspot: "✅ (via AI tools)",
    },
    {
      feature: "Real-time appointment booking",
      clyde: "✅ (Google Calendar)",
      callbox: "✅ (via integrations)",
      hubspot: "❌ (third-party)",
    },
    {
      feature: "Lead capture & routing",
      clyde: "✅",
      callbox: "✅",
      hubspot: "✅",
    },
    {
      feature: "Custom fallback context tuning",
      clyde: "✅",
      callbox: "🔶 (limited customization)",
      hubspot: "✅ (with support)",
    },
    {
      feature: "Pricing",
      clyde: "$249–$299/mo",
      callbox: "Custom quote",
      hubspot: "$74–$2,000+/mo",
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

      {/* Comparison Chart 1 */}
      <section className="comparison-section">
        <h2 className="section-title">How We Compare (1)</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="table-header">Feature</th>
                <th className="table-header highlight">Clyde (LeadsPilotAI)</th>
                <th className="table-header">ManyChat / Tidio</th>
                <th className="table-header">Drift / Intercom</th>
              </tr>
            </thead>
            <tbody>
              {comparison1.map((row, idx) => (
                <tr key={idx}>
                  <td className="table-cell">{row.feature}</td>
                  <td className="table-cell highlight">{row.clyde}</td>
                  <td className="table-cell">{row.manychat}</td>
                  <td className="table-cell">{row.drift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Comparison Chart 2 */}
      <section className="comparison-section">
        <h2 className="section-title">How We Compare (2)</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="table-header">Feature</th>
                <th className="table-header highlight">Clyde (LeadsPilotAI)</th>
                <th className="table-header">Callbox</th>
                <th className="table-header">HubSpot</th>
              </tr>
            </thead>
            <tbody>
              {comparison2.map((row, idx) => (
                <tr key={idx}>
                  <td className="table-cell">{row.feature}</td>
                  <td className="table-cell highlight">{row.clyde}</td>
                  <td className="table-cell">{row.callbox}</td>
                  <td className="table-cell">{row.hubspot}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
