"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PricingCard, PricingFeature } from "@/components/ui/pricing-card";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const freeFeatures: PricingFeature[] = [
  { text: "10 messages to try", included: true },
  { text: "Label scanning", included: true },
  { text: "Wine chat", included: true },
  { text: "Chat history", included: false },
  { text: "Cellar management", included: false },
  { text: "Unlimited scans", included: false },
];

const proFeatures: PricingFeature[] = [
  { text: "Unlimited messages & scans", included: true },
  { text: "Full chat history", included: true },
  { text: "Cellar management", included: true },
  { text: "My Palate: Corki learns your taste", included: true },
  { text: "All 7 premium themes", included: true },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="relative bg-dark-base section-padding overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(123,51,70,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-6"
        >
          <FeatureBadge variant="pro">Corki Friend</FeatureBadge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-4 font-[family-name:var(--font-heading)]"
        >
          The price of a glass.
          <br />
          The knowledge of a wine friend.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center text-smoke font-[family-name:var(--font-body)] text-base md:text-lg max-w-lg mb-10"
        >
          Try Corki free. No account needed, no time limit.
          10 messages to see if it&apos;s for you.
        </motion.p>

        {/* Toggle */}
        <motion.div
          custom={0.3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex items-center gap-3 mb-12"
        >
          <span
            className="text-sm font-[family-name:var(--font-body)] font-medium transition-colors duration-200"
            style={{ color: isAnnual ? "#6B6460" : "#F9F6F4" }}
          >
            Monthly
          </span>

          {/* Switch */}
          <button
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual((v) => !v)}
            className="relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            style={{
              background: isAnnual
                ? "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)"
                : "rgba(123,51,70,0.35)",
              border: "1px solid rgba(194,123,46,0.3)",
            }}
          >
            <motion.span
              className="absolute top-px w-5 h-5 rounded-full bg-cream shadow-sm"
              animate={{ x: isAnnual ? 25 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          </button>

          <span
            className="text-sm font-[family-name:var(--font-body)] font-medium transition-colors duration-200"
            style={{ color: isAnnual ? "#F9F6F4" : "#6B6460" }}
          >
            Annual
            {isAnnual && (
              <span
                className="ml-2 px-1.5 py-0.5 rounded text-xs font-semibold"
                style={{
                  background: "rgba(194,123,46,0.2)",
                  color: "#D4944A",
                  border: "1px solid rgba(194,123,46,0.25)",
                }}
              >
                save 30%
              </span>
            )}
          </span>
        </motion.div>

        {/* Cards */}
        <motion.div
          custom={0.4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          {/* Free card */}
          <PricingCard
            name="Free"
            price="$0"
            features={freeFeatures}
            highlighted={false}
            ctaText="Join the Waitlist"
            ctaHref="#waitlist"
          />

          {/* Pro card */}
          <PricingCard
            name="Corki Friend"
            price={isAnnual ? "$49.99" : "$5.99"}
            period={isAnnual ? "/ year" : "/ month"}
            features={proFeatures}
            highlighted={true}
            ctaText="Join the Waitlist"
            ctaHref="#waitlist"
          />
        </motion.div>

        {/* Billing note */}
        <motion.p
          custom={0.45}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-4 text-center text-xs font-[family-name:var(--font-body)]"
          style={{ color: "#6B6460" }}
        >
          Cancel anytime · Billed via App Store
        </motion.p>

        {/* Launch note */}
        <motion.p
          custom={0.48}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-2 text-center text-xs font-[family-name:var(--font-body)]"
          style={{ color: "#9C4B61" }}
        >
          Launching soon · Prices lock in for waitlist members
        </motion.p>

        {/* Footer note */}
        <motion.p
          custom={0.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-10 text-center text-sm font-[family-name:var(--font-body)] max-w-md leading-relaxed"
          style={{ color: "#6B6460" }}
        >
          No subscription required to start. The 10 free messages are your
          trial. Not a countdown, not a time limit. Take your time.
        </motion.p>
      </div>
    </section>
  );
}
