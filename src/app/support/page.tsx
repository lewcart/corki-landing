import Link from "next/link";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SupportFAQ } from "@/components/sections/support-faq";

export const metadata = {
  title: "Support — Corki",
  description:
    "Get help with Corki. Find answers to common questions or contact us directly.",
};

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen pt-32 pb-24 px-6"
        style={{ background: "#120D0A" }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="mb-16">
            <p
              className="ui-label mb-4"
              style={{ color: "#7B3346" }}
            >
              Corki Support
            </p>
            <h1
              className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-medium mb-4"
              style={{ color: "#F9F6F4" }}
            >
              How can we help?
            </h1>
            <p
              className="font-[family-name:var(--font-body)] text-base leading-relaxed"
              style={{ color: "#A39B95" }}
            >
              Find answers to common questions below, or get in touch directly.
            </p>
          </header>

          {/* Contact */}
          <section className="mb-16">
            <h2
              className="font-[family-name:var(--font-heading)] text-xl font-medium mb-5"
              style={{ color: "#F9F6F4" }}
            >
              Get in touch
            </h2>
            <a
              href="mailto:support@corki.app"
              className="flex items-start gap-4 rounded-xl p-5 transition-colors duration-200 border hover:border-[rgba(123,51,70,0.45)]"
              style={{
                background: "#1E1511",
                borderColor: "rgba(123,51,70,0.2)",
              }}
            >
              <div
                className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(123,51,70,0.15)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "#C27B2E" }}
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <p
                  className="font-[family-name:var(--font-body)] text-sm font-medium mb-0.5"
                  style={{ color: "#F9F6F4" }}
                >
                  Email support
                </p>
                <p
                  className="font-[family-name:var(--font-body)] text-sm"
                  style={{ color: "#D4944A" }}
                >
                  support@corki.app
                </p>
                <p
                  className="font-[family-name:var(--font-body)] text-xs mt-1.5"
                  style={{ color: "#6B6460" }}
                >
                  We aim to respond within one business day.
                </p>
              </div>
            </a>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2
              className="font-[family-name:var(--font-heading)] text-xl font-medium mb-5"
              style={{ color: "#F9F6F4" }}
            >
              Frequently asked questions
            </h2>
            <SupportFAQ />
          </section>

          {/* Policies */}
          <section>
            <h2
              className="font-[family-name:var(--font-heading)] text-xl font-medium mb-5"
              style={{ color: "#F9F6F4" }}
            >
              Policies
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/privacy"
                className="flex-1 flex items-center gap-3 rounded-xl p-4 transition-colors duration-200 border hover:border-[rgba(123,51,70,0.45)]"
                style={{
                  background: "#1E1511",
                  borderColor: "rgba(123,51,70,0.2)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(123,51,70,0.15)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#C27B2E" }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-[family-name:var(--font-body)] text-sm font-medium"
                    style={{ color: "#F9F6F4" }}
                  >
                    Privacy Policy
                  </p>
                  <p
                    className="font-[family-name:var(--font-body)] text-xs"
                    style={{ color: "#6B6460" }}
                  >
                    How we handle your data
                  </p>
                </div>
              </Link>

              <Link
                href="/terms"
                className="flex-1 flex items-center gap-3 rounded-xl p-4 transition-colors duration-200 border hover:border-[rgba(123,51,70,0.45)]"
                style={{
                  background: "#1E1511",
                  borderColor: "rgba(123,51,70,0.2)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(123,51,70,0.15)" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#C27B2E" }}
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-[family-name:var(--font-body)] text-sm font-medium"
                    style={{ color: "#F9F6F4" }}
                  >
                    Terms of Use
                  </p>
                  <p
                    className="font-[family-name:var(--font-body)] text-xs"
                    style={{ color: "#6B6460" }}
                  >
                    App usage terms and conditions
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
