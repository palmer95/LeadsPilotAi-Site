// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            AI SALES & SUPPORT AGENT THAT INCREASES BOOKINGS AND CAPTURES LEADS
          </h1>

          <p>
            The first-to-market AI-powered chatbot with calendar integration.
            Revolutionizing customer support and automating business
            scalability.
          </p>

          <div className="hero-cta">
            <Link href="/contact">
              <button className="btn-primary">Get Started</button>
            </Link>
          </div>

          {/* Comparison Chart */}
          <section className="comparison">
            <h2 className="section-title">How We Compare To The Market</h2>
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="table-header">Feature</th>
                    <th className="table-header highlight">
                      Clyde (LeadsPilotAI)
                    </th>
                    <th className="table-header">Intercom</th>
                    <th className="table-header">Drift</th>
                  </tr>
                </thead>
                <tbody>
                  {/* --- Corrected Structure Below --- */}
                  <tr>
                    <td className="table-cell">Pricing (per month)</td>
                    <td className="table-cell highlight">
                      <strong>✅ $299</strong>
                    </td>
                    <td className="table-cell">🟡 $500+ (for custom AI)</td>
                    <td className="table-cell">🟡 $2,500+</td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      Custom AI trained on your website
                    </td>
                    <td className="table-cell highlight">✅ Included</td>
                    <td className="table-cell">❌ Offered only as an add-on</td>
                    <td className="table-cell">❌ Limited customization</td>
                  </tr>
                  <tr>
                    <td className="table-cell">24/7 AI-powered Q&A</td>
                    <td className="table-cell highlight">
                      ✅ Advanced Large Language Model
                    </td>
                    <td className="table-cell">
                      🟡 Basic, with limited capabilities
                    </td>
                    <td className="table-cell">
                      🟡 Basic, with limited capabilities
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      Real-time appointment booking
                    </td>
                    <td className="table-cell highlight">
                      ✅ Native Integration
                    </td>
                    <td className="table-cell">
                      ❌ Requires third-party tools
                    </td>
                    <td className="table-cell">
                      ❌ Requires third-party tools
                    </td>
                  </tr>
                  <tr>
                    <td className="table-cell">Lead capture & routing</td>
                    <td className="table-cell highlight">✅ Automated</td>
                    <td className="table-cell">❌ Manual setup required</td>
                    <td className="table-cell">❌ Manual setup required</td>
                  </tr>
                  <tr>
                    <td className="table-cell">
                      Custom fallback context tuning
                    </td>
                    <td className="table-cell highlight">
                      ✅ Fully customizable
                    </td>
                    <td className="table-cell">
                      🟡 (With support, extra cost)
                    </td>
                    <td className="table-cell">❌ Limited</td>
                  </tr>
                  <tr>
                    <td className="table-cell">Ease of setup</td>
                    <td className="table-cell highlight">
                      ✅ 1-hour onboarding
                    </td>
                    <td className="table-cell">❌ Complex, 3–5 days</td>
                    <td className="table-cell">❌ Complex, 5+ days</td>
                  </tr>
                  <tr>
                    <td className="table-cell">Fully embeddable widget</td>
                    <td className="table-cell highlight">
                      ✅ White-labeled to your business
                    </td>
                    <td className="table-cell">🟡 Branded</td>
                    <td className="table-cell">🟡 Branded</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <Link href="/pricing">
            <button className="btn-secondary">View Pricing</button>
          </Link>
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
