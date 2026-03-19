"use client";

import { motion, type Variants } from "framer-motion";
import { Orb } from "@/components/ui/orb";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export function FinalCTA() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-dark-base section-padding"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(123,51,70,0.18) 0%, rgba(18,13,10,0) 65%), #120D0A",
      }}
    >
      {/* Subtle top separator */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(123,51,70,0.3) 30%, rgba(194,123,46,0.2) 50%, rgba(123,51,70,0.3) 70%, transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">
        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <Orb size="lg" />
        </motion.div>

        {/* H2 */}
        <motion.h2
          custom={0.05}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-[family-name:var(--font-heading)] mb-5"
        >
          Ask Corki anything.
        </motion.h2>

        {/* Subhead */}
        <motion.p
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-smoke font-[family-name:var(--font-body)] text-[1.125rem] leading-relaxed max-w-sm mb-10"
        >
          We&apos;re putting the finishing touches on Corki.
          <br />
          Join the waitlist and be first when it&apos;s ready.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          custom={0.25}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col items-center gap-5"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-[family-name:var(--font-body)] font-semibold text-base text-[#120D0A] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            style={{
              background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
              boxShadow:
                "0 4px 24px rgba(194,123,46,0.4), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
          >
            Join the Waitlist
          </a>

          {/* App Store coming soon badge */}
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-warm-gray font-[family-name:var(--font-body)] text-xs uppercase tracking-widest">
              Coming soon to
            </p>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                borderColor: "rgba(163,155,149,0.2)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="rgba(163,155,149,0.7)"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span
                className="font-[family-name:var(--font-body)] text-sm"
                style={{ color: "rgba(163,155,149,0.7)" }}
              >
                App Store
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
