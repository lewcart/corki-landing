"use client";

import { motion, type Variants } from "framer-motion";
import { ShoppingBag, Wine, Compass } from "lucide-react";
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

const cards = [
  {
    icon: ShoppingBag,
    title: "At the bottle shop",
    quote: "I'm choosing between three bottles and I don't know which one I'll actually like.",
    action: "Snap the labels. Corki tells you which one's for you.",
  },
  {
    icon: Wine,
    title: "Deciding what to open",
    quote: "I'm cooking steak tonight. What should I open that'll pair well?",
    action: "Corki knows your cellar and picks the right bottle for the meal.",
  },
  {
    icon: Compass,
    title: "Exploring something new",
    quote: "I always drink the same thing. What else would I like?",
    action: "Corki maps your taste to new grapes, regions, and styles worth trying.",
  },
];

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: "#F9F6F4" }}
    >
      <div className="relative z-10 flex flex-col items-center px-6 max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-6"
        >
          <FeatureBadge variant="pro">Wine advice that starts with you</FeatureBadge>
        </motion.div>

        {/* Heading */}
        <motion.h2
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14 font-[family-name:var(--font-heading)]"
          style={{ color: "var(--dark-base)" }}
        >
          Wherever you are
          <br />
          with wine.
        </motion.h2>

        {/* Cards grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                custom={0.2 + i * 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                className="flex flex-col p-7 bg-white"
                style={{
                  borderRadius: "20px",
                  boxShadow: "0 4px 24px rgba(123,51,70,0.12)",
                }}
              >
                {/* Accent bar */}
                <div
                  className="h-1 rounded-full mb-6"
                  style={{
                    background: "linear-gradient(90deg, var(--amber), var(--amber-light))",
                  }}
                />

                {/* Icon area */}
                <div className="mb-6">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{
                      background: "rgba(194,123,46,0.10)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      style={{ color: "var(--amber)" }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="mb-4 font-[family-name:var(--font-heading)]"
                  style={{ color: "var(--dark-base)" }}
                >
                  {card.title}
                </h3>

                {/* Quote */}
                <p
                  className="font-[family-name:var(--font-body)] text-base leading-relaxed mb-5 flex-1 italic"
                  style={{ color: "var(--warm-gray)" }}
                >
                  &ldquo;{card.quote}&rdquo;
                </p>

                {/* Action */}
                <p
                  className="font-[family-name:var(--font-body)] text-sm font-semibold leading-relaxed"
                  style={{ color: "var(--burgundy)" }}
                >
                  {card.action}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
