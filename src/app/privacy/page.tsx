import { LegalPage, Section, SubSection } from "@/components/layout/legal-page";

export const metadata = {
  title: "Privacy Policy — Corki",
  description: "How Corki collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="23 March 2026">
      <p style={{ color: "#A39B95" }}>
        This Privacy Policy explains how <strong style={{ color: "#F9F6F4" }}>Corki</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects your information when you use the Corki mobile application (&ldquo;App&rdquo;) or visit our website at <strong style={{ color: "#F9F6F4" }}>getcorki.com</strong> (&ldquo;Website&rdquo;), including the waitlist sign-up form. By using the App or Website you agree to this policy.
      </p>

      <Section heading="1. Who We Are">
        <p>
          Corki is an AI-powered wine assistant operated from Australia. We are the data controller for the personal information described in this policy.
        </p>
        <p>
          Privacy enquiries: <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>
        </p>
      </Section>

      <Section heading="2. Information We Collect">
        <SubSection heading="2.1 App — Information You Provide">
          <ul className="list-disc pl-5 space-y-1">
            <li>Chat messages and questions you send to Corki</li>
            <li>Wine label images you photograph or upload</li>
            <li>Wine cellar data you enter (bottle names, quantities, notes)</li>
            <li>Palate preferences and tasting notes</li>
          </ul>
        </SubSection>

        <SubSection heading="2.2 App — Automatically Collected">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong style={{ color: "#D4C8C0" }}>Device information:</strong> device model, OS version, app version, device locale</li>
            <li><strong style={{ color: "#D4C8C0" }}>Usage analytics:</strong> features used, screens viewed, session frequency and duration — collected via TelemetryDeck (see &sect;6)</li>
            <li><strong style={{ color: "#D4C8C0" }}>Error and crash reports:</strong> to diagnose and fix technical issues</li>
            <li><strong style={{ color: "#D4C8C0" }}>Purchase data:</strong> subscription status and transaction identifiers via Apple and RevenueCat (see &sect;6)</li>
          </ul>
        </SubSection>

        <SubSection heading="2.3 Website — Waitlist">
          <p>
            If you sign up to the Corki waitlist at getcorki.com, we collect your <strong style={{ color: "#D4C8C0" }}>email address</strong>. This is used solely to notify you when Corki launches or updates become available. The website itself does not use any additional analytics tools.
          </p>
          <p>
            Our website is hosted on <strong style={{ color: "#D4C8C0" }}>Vercel</strong>, which processes web traffic as part of our hosting infrastructure (see &sect;6).
          </p>
        </SubSection>

        <SubSection heading="2.4 Information We Do Not Collect">
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not require account registration in the App</li>
            <li>We do not collect precise GPS location</li>
            <li>We do not collect contact lists, health records, or financial information beyond subscription status</li>
          </ul>
        </SubSection>
      </Section>

      <Section heading="3. Legal Basis for Processing">
        <p>
          For users in the European Economic Area (EEA) and UK, we rely on the following legal bases under GDPR Article 6:
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em", color: "#A39B95", marginTop: "0.75rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #3A3330" }}>
                <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "#D4C8C0" }}>Data</th>
                <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "#D4C8C0" }}>Purpose</th>
                <th style={{ textAlign: "left", padding: "8px 0", color: "#D4C8C0" }}>Legal basis</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Chat messages", "Provide AI responses", "Art. 6(1)(b) — contractual necessity"],
                ["Chat messages", "Service improvement & analytics", "Art. 6(1)(a) — consent"],
                ["Wine preferences & cellar data", "Personalisation", "Art. 6(1)(f) — legitimate interest"],
                ["Wine preferences & cellar data", "Aggregate trend analysis", "Art. 6(1)(a) — consent"],
                ["Usage analytics & device info", "App stability & improvement", "Art. 6(1)(f) — legitimate interest (AU); Art. 6(1)(a) — consent (EEA)"],
                ["Error & crash reports", "Diagnosing technical issues", "Art. 6(1)(f) — legitimate interest"],
                ["Email address (waitlist)", "Launch notifications", "Art. 6(1)(a) — consent"],
                ["Label images", "Identifying wines for you", "Art. 6(1)(b) — contractual necessity"],
                ["Label images", "AI model improvement", "Art. 6(1)(a) — consent"],
                ["Subscription data", "Entitlement & billing", "Art. 6(1)(b) — contractual necessity"],
              ].map(([data, purpose, basis], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #2A2320" }}>
                  <td style={{ padding: "7px 12px 7px 0", verticalAlign: "top" }}>{data}</td>
                  <td style={{ padding: "7px 12px 7px 0", verticalAlign: "top" }}>{purpose}</td>
                  <td style={{ padding: "7px 0", verticalAlign: "top" }}>{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          Where we rely on <strong style={{ color: "#D4C8C0" }}>legitimate interest</strong>, you have the right to object at any time (see &sect;8). Where we rely on <strong style={{ color: "#D4C8C0" }}>consent</strong>, you may withdraw it at any time without affecting the lawfulness of prior processing (see &sect;8).
        </p>
      </Section>

      <Section heading="4. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide, personalise, and improve the App and its AI responses</li>
          <li>Process your in-app subscription and restore purchases</li>
          <li>Send waitlist notifications (Website)</li>
          <li>Detect and prevent fraud, abuse, and security incidents</li>
          <li>Comply with legal obligations</li>
          <li>Communicate with you if you contact us for support</li>
        </ul>
        <p>
          We do <strong style={{ color: "#F9F6F4" }}>not</strong> use your data for third-party advertising, sell your personal information, or use it for any purpose incompatible with the above.
        </p>
      </Section>

      <Section heading="5. AI Processing & Automated Decision-Making">
        <p>
          Corki uses <strong style={{ color: "#D4C8C0" }}>OpenAI</strong> to generate wine information and answer your questions. Content you submit (chat messages, label images) is transmitted to OpenAI&apos;s servers for processing. OpenAI acts as a data sub-processor bound by contract to process data only to provide the API service. OpenAI does not use API data to train its models by default.
        </p>
        <p>
          <strong style={{ color: "#D4C8C0" }}>Automated decision-making (GDPR Art. 22):</strong> Corki uses AI to generate personalised wine recommendations based on your preferences and cellar data. These recommendations are informational and do not produce legal or similarly significant effects. You can turn off personalisation by deleting your preference data in the App settings.
        </p>
        <p>
          OpenAI&apos;s privacy policy: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#D4944A" }}>openai.com/policies/privacy-policy</a>
        </p>
      </Section>

      <Section heading="6. Sub-Processors">
        <p>
          We use the following third-party processors to operate the App and Website:
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em", color: "#A39B95", marginTop: "0.75rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #3A3330" }}>
                <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "#D4C8C0" }}>Processor</th>
                <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "#D4C8C0" }}>Purpose</th>
                <th style={{ textAlign: "left", padding: "8px 0", color: "#D4C8C0" }}>Data location</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["OpenAI", "AI response generation", "United States"],
                ["RevenueCat", "Subscription management", "United States"],
                ["Neon", "Database hosting", "Australia (ap-southeast-2)"],
                ["Resend", "Transactional email (waitlist)", "United States"],
                ["TelemetryDeck", "Privacy-first app analytics", "Germany / EU"],
                ["Vercel", "Website hosting & CDN", "United States (edge)"],
              ].map(([processor, purpose, location], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #2A2320" }}>
                  <td style={{ padding: "7px 12px 7px 0", verticalAlign: "top" }}>{processor}</td>
                  <td style={{ padding: "7px 12px 7px 0", verticalAlign: "top" }}>{purpose}</td>
                  <td style={{ padding: "7px 0", verticalAlign: "top" }}>{location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          In-app subscription payments are processed entirely by <strong style={{ color: "#D4C8C0" }}>Apple</strong>; payment details are never visible to us. RevenueCat receives only anonymised transaction identifiers. RevenueCat&apos;s privacy policy: <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#D4944A" }}>revenuecat.com/privacy</a>
        </p>
      </Section>

      <Section heading="7. International Data Transfers">
        <p>
          Our primary database is hosted with <strong style={{ color: "#D4C8C0" }}>Neon</strong> in Australia (ap-southeast-2), keeping most personal data on Australian soil. However, some processors listed in &sect;6 are based in the United States:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong style={{ color: "#D4C8C0" }}>OpenAI</strong> &mdash; chat messages and label images are sent to US servers for AI processing</li>
          <li><strong style={{ color: "#D4C8C0" }}>RevenueCat</strong> &mdash; subscription identifiers transferred to US</li>
          <li><strong style={{ color: "#D4C8C0" }}>Resend</strong> &mdash; your email address is transferred to US to send waitlist notifications</li>
          <li><strong style={{ color: "#D4C8C0" }}>Vercel</strong> &mdash; website traffic is routed through US-based edge infrastructure</li>
        </ul>
        <p>
          Where EEA or UK personal data is transferred to the US, we rely on <strong style={{ color: "#D4C8C0" }}>Standard Contractual Clauses (SCCs)</strong> approved by the European Commission, incorporated into our Data Processing Agreements with each processor, as the transfer safeguard under GDPR Chapter V. You may request a copy of applicable SCCs by emailing <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>.
        </p>
        <p>
          Transfers from Australia to overseas recipients are made on the basis that equivalent protections apply under the recipient&apos;s applicable law or contractual obligations (APP 8).
        </p>
      </Section>

      <Section heading="8. Data Retention">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em", color: "#A39B95", marginTop: "0.75rem" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #3A3330" }}>
                <th style={{ textAlign: "left", padding: "8px 12px 8px 0", color: "#D4C8C0" }}>Data type</th>
                <th style={{ textAlign: "left", padding: "8px 0", color: "#D4C8C0" }}>Retention period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Chat data (service)", "12 months; anonymised thereafter for aggregate analytics"],
                ["Wine cellar & preference data", "Lifetime of account; deleted within 30 days of account deletion request"],
                ["Usage analytics", "24 months rolling"],
                ["Crash & error reports", "90 days"],
                ["Waitlist email addresses", "Until 6 months after general launch, or until you unsubscribe"],
                ["Account data", "Deleted within 30 days of a deletion request"],
                ["Subscription data", "As required by Apple / RevenueCat for billing and dispute resolution (typically 7 years)"],
              ].map(([type, period], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #2A2320" }}>
                  <td style={{ padding: "7px 12px 7px 0", verticalAlign: "top" }}>{type}</td>
                  <td style={{ padding: "7px 0", verticalAlign: "top" }}>{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section heading="9. Data Security">
        <p>
          We use industry-standard security measures including HTTPS encryption for all data in transit and access controls on our database. No method of transmission or storage is 100% secure; we take reasonable steps to protect your information but cannot guarantee absolute security.
        </p>
      </Section>

      <Section heading="10. Your Rights">
        <SubSection heading="10.1 All Users">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong style={{ color: "#D4C8C0" }}>Access</strong> — request a copy of personal information we hold about you</li>
            <li><strong style={{ color: "#D4C8C0" }}>Correction</strong> — request correction of inaccurate information</li>
            <li><strong style={{ color: "#D4C8C0" }}>Deletion</strong> — request deletion of your data (subject to legal obligations)</li>
            <li><strong style={{ color: "#D4C8C0" }}>Consent withdrawal</strong> — withdraw any consent you have given at any time (see below)</li>
          </ul>
        </SubSection>

        <SubSection heading="10.2 EEA & UK Users (GDPR)">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong style={{ color: "#D4C8C0" }}>Right to object</strong> — object to processing based on legitimate interest (Art. 6(1)(f)); we will cease unless we demonstrate compelling legitimate grounds</li>
            <li><strong style={{ color: "#D4C8C0" }}>Restriction</strong> — request restriction of processing in certain circumstances</li>
            <li><strong style={{ color: "#D4C8C0" }}>Portability</strong> — receive your data in a structured, machine-readable format</li>
            <li><strong style={{ color: "#D4C8C0" }}>Lodge a complaint</strong> — with your local data protection authority (e.g. ICO in the UK, your national DPA in the EEA)</li>
          </ul>
        </SubSection>

        <SubSection heading="10.3 Australian Users (Privacy Act)">
          <p>
            Under the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles, you may access and correct personal information we hold. You may also lodge a complaint with the <strong style={{ color: "#D4C8C0" }}>Office of the Australian Information Commissioner (OAIC)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Web: <a href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener noreferrer" style={{ color: "#D4944A" }}>oaic.gov.au/privacy/privacy-complaints</a></li>
            <li>Phone: 1300 363 992</li>
            <li>Email: <a href="mailto:enquiries@oaic.gov.au" style={{ color: "#D4944A" }}>enquiries@oaic.gov.au</a></li>
          </ul>
        </SubSection>

        <SubSection heading="10.4 California Users (CCPA)">
          <p>
            California residents have the right to know what personal information is collected, to request deletion, and to opt out of sale. We do not sell personal information.
          </p>
        </SubSection>

        <SubSection heading="Exercising Your Rights & Withdrawing Consent">
          <p>
            To exercise any right or withdraw consent:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong style={{ color: "#D4C8C0" }}>In-App:</strong> go to Settings &rarr; Privacy &rarr; Manage Data to delete your data or toggle analytics consent</li>
            <li><strong style={{ color: "#D4C8C0" }}>Email:</strong> <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a></li>
            <li><strong style={{ color: "#D4C8C0" }}>Waitlist:</strong> use the unsubscribe link in any email we send</li>
          </ul>
          <p>
            We will respond within 30 days. Withdrawing consent does not affect the lawfulness of processing that occurred before withdrawal.
          </p>
        </SubSection>
      </Section>

      <Section heading="11. Children">
        <p>
          Corki is intended for users aged <strong style={{ color: "#F9F6F4" }}>18 and over</strong>. We do not knowingly collect information from anyone under 18. If you believe a minor has provided us with personal information, please contact us and we will delete it promptly.
        </p>
      </Section>

      <Section heading="12. Third-Party Links">
        <p>
          The App and Website may link to third-party content. We are not responsible for the privacy practices of any third-party websites or services.
        </p>
      </Section>

      <Section heading="13. Changes to This Policy">
        <p>
          We may update this policy from time to time. We will post the revised policy here and update the &ldquo;Last updated&rdquo; date above. For material changes, we will notify App users via an in-app notice. Continued use after changes constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section heading="14. Contact">
        <p>
          Privacy questions or requests: <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>
        </p>
      </Section>
    </LegalPage>
  );
}
