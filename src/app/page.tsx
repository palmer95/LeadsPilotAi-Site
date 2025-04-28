// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Turn Your Website Into a Sales Machine</h1>
          <p className="hero-text">
            Clyde, your AI Sales Agent, engages visitors, answers questions, and
            books meetings 24/7.
          </p>
          <div className="hero-cta">
            <Link href="/contact">
              <button className="btn-primary">Get Started</button>
            </Link>
            <Link href="/pricing">
              <button className="btn-secondary">View Pricing</button>
            </Link>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials">
          <div className="testimonial-card">
            <p className="testimonial-text">
              “Clyde actually closes sales for us & has decreased our overhead.
              We convert more website visitors because of leadpilotai’s
              software. There is value for Clyde in any business, 10/10
              recommend.”
            </p>
            <p className="testimonial-author">
              — Gavin Palmer, CEO of Virtour Media
            </p>
          </div>
        </div>
        <p className="testimonials-note">More success stories coming soon!</p>

        {/* Prompt to Interact with Clyde */}
        <p className="clyde-prompt">
          Want to see Clyde in action?{" "}
          <span className="clyde-prompt-highlight">
            Click on the bubble below!
          </span>
        </p>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <h2 className="section-title">Why Choose LeadsPilotAI?</h2>
        <p className="section-text">
          Clyde is more than a chatbot — it’s a sales agent that works 24/7 to
          grow your business.
        </p>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3 className="benefit-title">Custom-Branded</h3>
            <p className="benefit-text">
              Seamlessly matches your website’s look and tone.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🧠</div>
            <h3 className="benefit-title">Smart AI</h3>
            <p className="benefit-text">
              Answers any query, even beyond your site’s content.
            </p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📅</div>
            <h3 className="benefit-title">Booking-Ready</h3>
            <p className="benefit-text">
              Notifies your team instantly when a lead is ready.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2 className="cta-title">Turn Your Website Into a Sales Machine</h2>
        <p className="cta-text">
          Get started with Clyde and never miss a lead again.
        </p>
        <Link href="/pricing">
          <button className="btn-cta">View Pricing</button>
        </Link>
      </section>
    </main>
  );
}
