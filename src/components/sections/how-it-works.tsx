"use client";

import { motion, type Variants } from "framer-motion";
import { Camera, MessageCircle, Archive } from "lucide-react";
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

const steps = [
  {
    number: "1",
    icon: Camera,
    title: "Scan any label",
    description:
      "Point your camera at a wine label. Corki identifies it instantly.",
  },
  {
    number: "2",
    icon: MessageCircle,
    title: "Ask anything",
    description:
      "Have a full conversation about the wine. Pairings, regions, vintages, value.",
  },
  {
    number: "3",
    icon: Archive,
    title: "Build your cellar",
    description:
      "Every wine you scan or love gets saved. Corki learns your taste over time.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-dark-base section-padding overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-5xl mx-auto">
        {/* Orb decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Orb size="md" />
        </motion.div>

        {/* Section label */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-6"
        >
          <FeatureBadge>How Corki works</FeatureBadge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16 font-[family-name:var(--font-heading)]"
        >
          Scan, ask, cellar.
          <br />
          Repeat.
        </motion.h2>

        {/* Steps */}
        <div className="relative w-full">
          {/* Connecting line — desktop only */}
          <motion.div
            className="hidden md:block absolute top-[3.25rem] left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(123,51,70,0.4) 0%, rgba(123,51,70,0.15) 50%, rgba(123,51,70,0.4) 100%)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 }}
          />

          <div className="flex flex-col md:flex-row gap-12 md:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  custom={0.2 + i * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  {/* Number + icon stack */}
                  <div className="relative mb-6 flex items-center justify-center w-[6.5rem] h-[6.5rem]">
                    {/* Large semi-transparent step number */}
                    <span
                      className="absolute font-[family-name:var(--font-heading)] select-none leading-none"
                      style={{
                        fontSize: "5.5rem",
                        fontWeight: 500,
                        color: "rgba(123,51,70,0.18)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    {/* Icon circle */}
                    <div
                      className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 40% 35%, rgba(194,123,46,0.15) 0%, rgba(123,51,70,0.25) 60%, rgba(18,13,10,0) 100%)",
                        border: "1px solid rgba(123,51,70,0.3)",
                        boxShadow: "0 0 20px rgba(123,51,70,0.12)",
                      }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.5}
                        style={{ color: "var(--amber-light)" }}
                      />
                    </div>
                  </div>

                  <h3
                    className="mb-3 font-[family-name:var(--font-heading)]"
                    style={{ color: "var(--cream)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-body)] text-base leading-relaxed max-w-[240px]"
                    style={{ color: "var(--smoke)" }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
