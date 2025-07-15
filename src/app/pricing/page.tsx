// app/pricing/page.tsx
"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// The checkmark icon for feature lists
const CheckIcon = () => (
  <svg
    className="feature-check-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// New component for the holographic card to keep logic clean
const HolographicPlanCard = ({ tier, isSelected, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`plan-card holographic ${isSelected ? "highlighted" : ""}`}
      onClick={() => onSelect(tier.name)}
      onMouseMove={handleMouseMove}
    >
      <div className="holographic-border"></div>
      <div className="holographic-content">
        <div className="most-popular-badge">Limited Charter Offer</div>
        <div className="plan-header">
          <h3 className="plan-name">{tier.name}</h3>
          <p className="plan-price">
            {tier.price}
            {tier.pricePeriod && <span>{tier.pricePeriod}</span>}
          </p>
          <p className="plan-description">{tier.description}</p>
        </div>
        <ul className="plan-features">
          {tier.features.map((feature) => (
            <li key={feature}>
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="plan-cta">
          <Link href="/contact" passHref>
            <button className="btn btn-primary">{tier.cta}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingPage() {
  const [selected, setSelected] = useState("Prestige");

  const tiers = [
    {
      name: "Professional",
      price: "$499",
      pricePeriod: "/ month",
      description:
        "For professionals who need a powerful, automated lead capture and booking solution.",
      features: [
        "Everything in our core platform",
        "Direct Google Calendar integration",
        "Priority email support",
      ],
      cta: "Choose Professional",
    },
    {
      name: "Prestige",
      price: "$799",
      pricePeriod: "/ month",
      description:
        "For established firms that require seamless integration and perfect brand alignment.",
      features: [
        "Everything in Professional, plus:",
        "Direct CRM & Zapier Integrations",
        "Advanced Brand & Voice Customization",
        "Dedicated Onboarding Specialist",
      ],
      cta: "Choose Prestige",
      isMostPopular: true,
    },
    {
      name: "Lifetime Charter",
      price: "$4,997",
      pricePeriod: "one-time",
      description:
        "A limited offer for our first 25 founding businesses. Includes all Prestige features, for life.",
      features: [
        "All features from the Prestige Plan",
        "Lifetime feature updates",
        "Priority access to new betas",
        "+ $49/mo for API & hosting costs",
      ],
      cta: "Become a Charter Member",
      isHolographic: true, // Special flag for our new card
    },
  ];

  return (
    <main>
      <section className="pricing-hero">
        <div className="container text-center">
          <h1 className="pricing-headline">The Perfect Plan for Your Growth</h1>
          <p className="pricing-subheadline">
            Choose the plan that best fits your business. Simple, transparent
            pricing with no hidden fees.
          </p>
        </div>
      </section>

      <section className="pricing-tiers-section">
        <div className="container">
          <div className="pricing-grid">
            {tiers.map((tier) => {
              if (tier.isHolographic) {
                return (
                  <HolographicPlanCard
                    key={tier.name}
                    tier={tier}
                    isSelected={selected === tier.name}
                    onSelect={setSelected}
                  />
                );
              }
              return (
                <div
                  key={tier.name}
                  className={`plan-card ${
                    selected === tier.name ? "highlighted" : ""
                  } ${tier.isMostPopular ? "has-badge" : ""}`}
                  onClick={() => setSelected(tier.name)}
                >
                  {tier.isMostPopular && (
                    <div className="most-popular-badge">Most Popular</div>
                  )}
                  <div className="plan-header">
                    <h3 className="plan-name">{tier.name}</h3>
                    <p className="plan-price">
                      {tier.price}{" "}
                      {tier.pricePeriod && <span>{tier.pricePeriod}</span>}
                    </p>
                    <p className="plan-description">{tier.description}</p>
                  </div>
                  <ul className="plan-features">
                    {tier.features.map((feature) => (
                      <li key={feature}>
                        <CheckIcon />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="plan-cta">
                    <Link href="/contact" passHref>
                      <button
                        className={`btn ${
                          selected === tier.name
                            ? "btn-primary"
                            : "btn-secondary"
                        }`}
                      >
                        {tier.cta}
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* "ALL PLANS INCLUDE" SECTION */}
      <section className="all-plans-include-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">
              All Plans Include These Core Features
            </h2>
          </div>
          <div className="core-features-grid">
            <div className="core-feature-item">
              ✅ 24/7 AI-Powered Conversations
            </div>
            <div className="core-feature-item">
              ✅ Custom AI Trained On Your Site
            </div>
            <div className="core-feature-item">
              ✅ Automated Lead Capture & Email Alerts
            </div>
            <div className="core-feature-item">
              ✅ Fully Embeddable Website Widget
            </div>
            <div className="core-feature-item">
              ✅ Conversation Log & Insights
            </div>
            <div className="core-feature-item">
              ✅ 1-Hour White-Glove Onboarding
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>What does the onboarding process look like?</h4>
              <p>
                It&apos;s simple! We start with a 1-hour call to understand your
                business, then we train and tune Clyde on your website content.
                We'll help you install the one-line script on your site and
                ensure everything is perfect before going live.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel my plan at any time?</h4>
              <p>
                Yes, absolutely. All of our monthly plans are commitment-free
                and you can cancel at any time. If you pre-pay for a year, your
                subscription will remain active for the duration of that year.
              </p>
            </div>
            <div className="faq-item">
              <h4>How does the AI stay up-to-date with my site?</h4>
              <p>
                We have tools to periodically re-index your website content to
                ensure Clyde always has the most current information. You can
                trigger a re-index yourself from your admin dashboard at any
                time.
              </p>
            </div>
            <div className="faq-item">
              <h4>What if I have more questions?</h4>
              <p>
                We&apos;re here to help! Every customer has access to our
                support team. You can book a demo call or use the contact form
                on our site to get in touch with us directly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
