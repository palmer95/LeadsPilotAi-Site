// app/privacy/page.tsx

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page-container">
      <div className="container">
        <h1>Privacy Policy for LeadsPilotAI</h1>
        <p className="last-updated">Last Updated: July 31, 2025</p>

        <p>
          Welcome to LeadsPilotAI (&quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). We are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you use our website and our AI chatbot services
          (collectively, the &quot;Service&quot;).
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect via the Service includes:
        </p>
        <h3>A. Information You Provide to Us (Our Clients):</h3>
        <ul>
          <li>
            <strong>Account Information:</strong> When you sign up for an
            account, we collect your name, email address, company name, and
            password.
          </li>
          <li>
            <strong>Payment Information:</strong> To process payments, we
            collect billing details, which are securely handled by our
            third-party payment processor (Stripe). We do not store your full
            credit card information on our servers.
          </li>
          <li>
            <strong>Configuration Data:</strong> We store the information you
            provide to configure your AI assistant &quot;Clyde,&quot; such as
            your website content, custom Q&A pairs, and business details.
          </li>
        </ul>
        <h3>B. Information We Process on Your Behalf (Your End-Users):</h3>
        <p>
          Our AI assistant, Clyde, is embedded on your website to interact with
          your visitors (&quot;End-Users&quot;). When an End-User interacts with
          Clyde, we process the information they provide on your behalf. This
          may include names, email addresses, phone numbers, and the content of
          their conversations. You, our Client, are the &quot;data
          controller&quot; for this End-User information. We act as the
          &quot;data processor.&quot;
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, operate, and maintain
          the Service, process payments, communicate with you, and improve our
          offerings.
        </p>

        <h2>3. Disclosure of Your Information</h2>
        <p>
          We do not share your personal information except with service
          providers (e.g., Stripe, OpenAI, Vercel), for legal reasons if
          required by law, or in connection with a business transfer like a
          merger.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that no security measures are perfect or impenetrable.
        </p>

        <h2>5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at: <strong>hello@leadspilotai.com</strong>
        </p>
      </div>
    </main>
  );
}
