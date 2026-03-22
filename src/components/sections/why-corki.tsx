"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, Fingerprint, Heart } from "lucide-react";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const statements = [
  {
    icon: MessageCircle,
    statement: "Answers, not scores.",
    detail: "Corki explains why a wine suits you. Not a number out of five.",
  },
  {
    icon: Fingerprint,
    statement: "Your taste, not the crowd\u2019s.",
    detail:
      "Recommendations that learn what you actually enjoy, not what strangers rated highest.",
  },
  {
    icon: Heart,
    statement: "Ask anything, judge nothing.",
    detail:
      "No question is too basic. A $10 Merlot gets the same respect as a first-growth Bordeaux.",
  },
];

export function WhyCorki() {
  return (
    <section
      id="why-corki"
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: "#F9F6F4" }}
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-10 lg:mb-14"
        >
          <h2
            className="font-[family-name:var(--font-heading)]"
            style={{ color: "var(--dark-base)" }}
          >
            Wine apps give you data.
            <br />
            Corki gives you answers.
          </h2>
        </motion.div>

        {/* Editorial statements */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {statements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.statement}
                custom={0.15 + i * 0.12}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full mb-5"
                  style={{
                    background: "rgba(123,51,70,0.06)",
                    border: "1px solid rgba(123,51,70,0.1)",
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    style={{ color: "var(--burgundy)" }}
                  />
                </div>

                {/* Statement */}
                <h3
                  className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl mb-3"
                  style={{ color: "var(--dark-base)" }}
                >
                  {item.statement}
                </h3>

                {/* Detail */}
                <p
                  className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed max-w-md"
                  style={{ color: "var(--warm-gray)" }}
                >
                  {item.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
