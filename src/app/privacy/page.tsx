import { LegalPage, Section, SubSection } from "@/components/layout/legal-page";

export const metadata = {
  title: "Privacy Policy — Corki",
  description: "How Corki collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="17 March 2026">
      <p style={{ color: "#A39B95" }}>
        This Privacy Policy explains how <strong style={{ color: "#F9F6F4" }}>Corki</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and protects your information when you use the Corki mobile application (&ldquo;App&rdquo;). By using the App you agree to this policy.
      </p>

      <Section heading="1. Who We Are">
        <p>
          Corki is an AI-powered wine assistant app operated from Australia. If you have questions about this policy, contact us at{" "}
          <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>.
        </p>
      </Section>

      <Section heading="2. Information We Collect">
        <SubSection heading="2.1 Information You Provide">
          <ul className="list-disc pl-5 space-y-1">
            <li>Chat messages and questions you send to Corki</li>
            <li>Wine label images you photograph or upload</li>
            <li>Wine cellar data you enter (bottle names, quantities, notes)</li>
            <li>Palate preferences and tasting notes</li>
          </ul>
        </SubSection>

        <SubSection heading="2.2 Automatically Collected Information">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong style={{ color: "#D4C8C0" }}>Device information:</strong> device model, operating system version, app version, device locale</li>
            <li><strong style={{ color: "#D4C8C0" }}>Usage data:</strong> features used, screens viewed, session frequency and duration</li>
            <li><strong style={{ color: "#D4C8C0" }}>Error and crash reports:</strong> to diagnose and fix technical issues</li>
            <li><strong style={{ color: "#D4C8C0" }}>Purchase data:</strong> subscription status and transaction identifiers (via Apple and RevenueCat &mdash; see &sect;5)</li>
          </ul>
        </SubSection>

        <SubSection heading="2.3 Information We Do Not Collect">
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not require account registration or collect your email address unless you contact us directly</li>
            <li>We do not collect precise GPS location</li>
            <li>We do not collect contact lists, health records, or financial information beyond subscription status</li>
          </ul>
        </SubSection>
      </Section>

      <Section heading="3. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide, personalise, and improve the App and its AI responses</li>
          <li>Process your in-app subscription and restore purchases</li>
          <li>Detect and prevent fraud, abuse, and security incidents</li>
          <li>Comply with legal obligations</li>
          <li>Communicate with you if you contact us for support</li>
        </ul>
        <p>
          We do <strong style={{ color: "#F9F6F4" }}>not</strong> use your data for third-party advertising, profiling for commercial sale, or any purpose incompatible with the above.
        </p>
      </Section>

      <Section heading="4. AI Processing — OpenAI">
        <p>
          Corki uses the <strong style={{ color: "#D4C8C0" }}>OpenAI API</strong> to generate wine information and answer your questions. Content you submit (chat messages, label images) is transmitted to OpenAI&apos;s servers for processing. OpenAI acts as a data sub-processor on our behalf and is contractually bound to process data only to provide the API service. OpenAI does not use API data to train its models by default.
        </p>
        <p>
          OpenAI&apos;s own privacy practices are described at{" "}
          <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#D4944A" }}>openai.com/policies/privacy-policy</a>.
        </p>
      </Section>

      <Section heading="5. In-App Purchases — RevenueCat & Apple">
        <p>
          Corki Pro subscriptions are handled through <strong style={{ color: "#D4C8C0" }}>Apple In-App Purchase</strong>. We use <strong style={{ color: "#D4C8C0" }}>RevenueCat</strong> as our subscription management platform. RevenueCat acts as a data sub-processor and receives anonymised transaction data (subscriber ID, subscription status, purchase timestamps) to validate entitlements and restore purchases.
        </p>
        <p>
          Your payment details are processed entirely by Apple and are never visible to us or RevenueCat. RevenueCat&apos;s privacy policy is at{" "}
          <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#D4944A" }}>revenuecat.com/privacy</a>.
        </p>
      </Section>

      <Section heading="6. Data Retention">
        <p>
          We retain your in-app data (chat history, cellar data) on your device unless you delete the App. Any data we hold server-side is retained for as long as reasonably necessary to provide the service, and is deleted upon request (see &sect;8).
        </p>
      </Section>

      <Section heading="7. Data Security">
        <p>
          We use industry-standard security measures including HTTPS encryption for all data in transit. No method of transmission or storage is 100% secure; we take reasonable steps to protect your information but cannot guarantee absolute security.
        </p>
      </Section>

      <Section heading="8. Your Rights">
        <SubSection heading="8.1 Australian Privacy Act">
          <p>
            Under the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles you have the right to access personal information we hold about you and to request correction of inaccurate information.
          </p>
        </SubSection>

        <SubSection heading="8.2 GDPR (EEA Users)">
          <p>
            If you are located in the European Economic Area you also have the right to: erasure (&ldquo;right to be forgotten&rdquo;), restriction of processing, data portability, and to lodge a complaint with your local data protection authority.
          </p>
        </SubSection>

        <SubSection heading="8.3 CCPA (California Users)">
          <p>
            California residents have the right to know what personal information is collected, to request deletion, and to opt out of sale. We do not sell personal information.
          </p>
        </SubSection>

        <SubSection heading="Exercising Your Rights">
          <p>
            To exercise any of these rights, email{" "}
            <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>. We will respond within 30 days.
          </p>
        </SubSection>
      </Section>

      <Section heading="9. Children">
        <p>
          Corki is intended for users aged <strong style={{ color: "#F9F6F4" }}>18 and over</strong> only. We do not knowingly collect information from anyone under 18. If you believe a minor has provided us with personal information, please contact us immediately and we will delete it.
        </p>
      </Section>

      <Section heading="10. Third-Party Links">
        <p>
          The App may display information about wines, producers, or regions. We are not responsible for the privacy practices of any third-party websites or services you may navigate to from within the App.
        </p>
      </Section>

      <Section heading="11. Changes to This Policy">
        <p>
          We may update this policy from time to time. We will post the revised policy in the App and update the &ldquo;Last updated&rdquo; date above. Continued use of the App after changes constitutes acceptance of the updated policy.
        </p>
      </Section>

      <Section heading="12. Contact">
        <p>
          Questions or requests:{" "}
          <a href="mailto:privacy@corki.app" style={{ color: "#D4944A" }}>privacy@corki.app</a>
        </p>
      </Section>
    </LegalPage>
  );
}
