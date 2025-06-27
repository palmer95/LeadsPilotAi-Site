// app/page.tsx
import Link from "next/link";
// Suggestion: In a real implementation, you might use an icon library like 'lucide-react'
// For now, we'll use text placeholders for icons.

export default function Home() {
  return (
    <main className="homepage-main">
      {/* 1. Hero Section - More Authoritative & Benefit-Driven */}
      <section className="hero-section bg-gradient">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-headline">
              Your Best Salesperson Works 24/7.
              <br />
              And it's an AI.
            </h1>
            <p className="hero-subheadline">
              LeadsPilotAI is the premium AI sales assistant for elite service
              businesses. We turn your website traffic into qualified, booked
              appointments—so you can focus on closing high-value clients.
            </p>
            <div className="hero-cta-buttons">
              <Link href="/contact" passHref>
                <button className="btn btn-primary btn-lg">
                  Book a Personalized Demo
                </button>
              </Link>
              <Link href="#features" passHref>
                <button className="btn btn-secondary btn-lg">
                  Explore Features
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem/Solution Section - Setting the Stage */}
      <section className="problem-solution-section">
        <div className="container text-center">
          <h2 className="section-title">
            Your Website is an Untapped Goldmine
          </h2>
          <p className="section-intro">
            Every day, high-intent prospects visit your site, consider your
            services, and leave without a trace. You're losing opportunities
            after hours, on weekends, and even during the day when your team is
            busy. It's time to plug the leak.
          </p>
        </div>
      </section>

      {/* 3. Features/Benefits Grid - Elevating the Language */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              {/* Replace with a real icon, e.g., <Clock size={32} /> */}
              <div className="feature-icon">[Icon: 24/7 Clock]</div>
              <h3 className="feature-title">Capture Every Opportunity</h3>
              <p className="feature-description">
                Clyde, your AI Assistant, engages prospects the moment they land
                on your site. It provides instant, intelligent answers 24/7,
                ensuring no high-value lead ever slips through the cracks again.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              {/* Replace with a real icon, e.g., <Filter size={32} /> */}
              <div className="feature-icon">[Icon: Funnel/Filter]</div>
              <h3 className="feature-title">
                Autonomous Qualification & Booking
              </h3>
              <p className="feature-description">
                Stop wasting time on tire-kickers. Clyde asks the crucial
                qualifying questions you would, identifies serious buyers, and
                seamlessly books them into your Google Calendar based on
                real-time availability.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              {/* Replace with a real icon, e.g., <Sparkles size={32} /> */}
              <div className="feature-icon">[Icon: Brand/Sparkle]</div>
              <h3 className="feature-title">
                An Extension of Your Premium Brand
              </h3>
              <p className="feature-description">
                Your client experience is paramount. Clyde is fully customizable
                to match your brand's voice, tone, and visual identity,
                providing a polished, professional first impression that builds
                trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonial Section - Enhanced Framing */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-wrapper">
            <h2 className="testimonial-eyebrow">
              Trusted by High-Growth Firms
            </h2>
            <blockquote className="testimonial-quote">
              “Clyde actually closes sales for us & has decreased our overhead.
              We convert more website visitors because of leadpilotai’s
              software. There is value for Clyde in any business, 10/10
              recommend.”
            </blockquote>
            <cite className="testimonial-citation">
              Gavin Palmer, Owner of Virtour Media
            </cite>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Section - A Clear, Powerful Closing */}
      <section className="final-cta-section text-center">
        <div className="container">
          <h2 className="cta-headline">Ready to Automate Your Growth?</h2>
          <p className="cta-subheadline">
            Stop losing leads and start focusing on what you do best: serving
            your clients. Let Clyde handle the rest.
          </p>
          <Link href="/contact" passHref>
            <button className="btn btn-primary btn-lg">
              Get Started with Clyde Today
            </button>
          </Link>
        </div>
      </section>

      {/* Prompt to Interact with Clyde - Remains important! */}
      <div className="clyde-interaction-prompt">
        <p>
          Want to see Clyde in action?{" "}
          <span className="highlight">
            Click the chat bubble below and ask a question.
          </span>
        </p>
      </div>
    </main>
  );
}
