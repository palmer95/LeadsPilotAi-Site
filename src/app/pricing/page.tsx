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

  return (
    <main>
      {/* Hero Section */}
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

      {/* Comparison Table */}
      <section className="comparison">
        <h2 className="section-title">How We Stack Up</h2>
        <p className="section-text">
          See why LeadsPilotAI offers the best value at our price point.
        </p>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Features</th>
                <th>LeadsPilotAI</th>
                <th>Drift</th>
                <th>Intercom</th>
                <th>ChatGPT Plugin</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Trained on your site</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Embedded as a bubble</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Lead capture + email/SMS</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Google Calendar booking</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Human-like fallback tuning</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>White-label & custom CSS</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
              </tr>
              <tr>
                <td>Transparent pricing</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA Section */}
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
