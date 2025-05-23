// app/pricing/page.tsx
"use client";
import Link from "next/link";
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
