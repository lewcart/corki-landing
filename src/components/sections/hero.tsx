"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Orb } from "@/components/ui/orb";
import { FeatureBadge } from "@/components/ui/feature-badge";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-base"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at -10% -5%, rgba(123,51,70,0.22) 0%, rgba(18,13,10,0) 60%), #120D0A",
      }}
    >
      {/* Grape / vine SVG texture — 4% opacity */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.04 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Left vine */}
        <path
          d="M-40 120 C 40 80, 80 160, 60 240 C 40 320, 100 360, 80 440 C 60 520, 120 560, 100 640"
          stroke="#F9F6F4"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="56" cy="200" r="18" fill="#F9F6F4" />
        <circle cx="44" cy="226" r="14" fill="#F9F6F4" />
        <circle cx="70" cy="215" r="12" fill="#F9F6F4" />
        <circle cx="62" cy="242" r="16" fill="#F9F6F4" />
        {/* Right vine */}
        <path
          d="M calc(100% + 40px) 200 C calc(100% - 60px) 160, calc(100% - 100px) 260, calc(100% - 80px) 340 C calc(100% - 60px) 420, calc(100% - 120px) 460, calc(100% - 100px) 540"
          stroke="#F9F6F4"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="90%" cy="300" r="16" fill="#F9F6F4" />
        <circle cx="88%" cy="326" r="13" fill="#F9F6F4" />
        <circle cx="92%" cy="316" r="11" fill="#F9F6F4" />
        {/* Top small cluster */}
        <path
          d="M 50% 10 C 48% 40, 52% 60, 50% 80"
          stroke="#F9F6F4"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="50%" cy="44" r="10" fill="#F9F6F4" />
        <circle cx="48%" cy="58" r="8" fill="#F9F6F4" />
        <circle cx="52%" cy="55" r="9" fill="#F9F6F4" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-32 w-full max-w-3xl mx-auto">
        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Orb size="hero" />
        </motion.div>

        {/* Badge */}
        <motion.div
          custom={0.1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <FeatureBadge
            icon={<span aria-hidden="true">✦</span>}
            variant="default"
          >
            AI Wine Assistant
          </FeatureBadge>
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6 font-[family-name:var(--font-heading)]"
        >
          Your pocket
          <br />
          sommelier.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-smoke font-[family-name:var(--font-body)] text-[1.25rem] leading-relaxed max-w-md mb-10"
        >
          Ask anything about wine. Scan any label.
          <br />
          Get a real answer&nbsp;— not a score.
        </motion.p>

        {/* CTA row */}
        <motion.div
          custom={0.4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col items-center gap-4"
        >
          <a
            href="#download"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-[family-name:var(--font-body)] font-semibold text-[0.9375rem] text-[#120D0A] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            style={{
              background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
              boxShadow: "0 4px 20px rgba(194,123,46,0.35)",
            }}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Download on App Store
          </a>
          <p className="text-smoke font-[family-name:var(--font-body)] text-sm">
            Free to try&nbsp;·&nbsp;No account needed
          </p>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          <ChevronDown
            className="text-smoke/40"
            size={22}
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
