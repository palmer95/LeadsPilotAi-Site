// app/pricing/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [selected, setSelected] = useState("Pro");

  const tiers = [
    {
      title: "Pro",
      price: "$299/mo",
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
      <section className="comparison">
        <h2 className="section-title">How We Compare</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="table-header">Feature</th>
                <th className="table-header highlight">Clyde (LeadsPilotAI)</th>
                <th className="table-header">Intercom</th>
                <th className="table-header">Drift</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-cell">
                  Custom AI trained on your website
                </td>
                <td className="table-cell highlight">✅ Included</td>
                <td className="table-cell">
                  ❌ (Offered only as an add-on for $500+/mo)
                </td>
                <td className="table-cell">❌ Limited customization</td>
              </tr>
              <tr>
                <td className="table-cell">24/7 AI-powered Q&A</td>
                <td className="table-cell highlight">✅ Advanced</td>
                <td className="table-cell">✅ Basic (Fin AI limited)</td>
                <td className="table-cell">✅ Basic</td>
              </tr>
              <tr>
                <td className="table-cell">Real-time appointment booking</td>
                <td className="table-cell highlight">
                  ✅ Native (Google Calendar)
                </td>
                <td className="table-cell">❌ (Third-party integration)</td>
                <td className="table-cell">❌ (Third-party integration)</td>
              </tr>
              <tr>
                <td className="table-cell">Pricing (per month)</td>
                <td className="table-cell highlight">$299</td>
                <td className="table-cell">$500+ (for custom AI)</td>
                <td className="table-cell">$2,500+</td>
              </tr>
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
