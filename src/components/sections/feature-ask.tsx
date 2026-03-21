"use client";

import { motion, type Variants } from "framer-motion";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { ChatDemo } from "@/components/ui/chat-demo";

const messages = [
  {
    role: "user" as const,
    text: "I'm making lamb tonight. What should I open?",
  },
  {
    role: "corki" as const,
    text: "For lamb, I'd go with something with structure: a Côtes du Rhône or an Australian Grenache. Do you have either in your cellar, or shall I suggest something to pick up?",
  },
  {
    role: "user" as const,
    text: "I've got a 2021 McLaren Vale Grenache...",
  },
  {
    role: "corki" as const,
    text: "That's perfect. McLaren Vale Grenache at 3 years is right in its window. Decant it for 30 minutes and you're set. Enjoy dinner.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

export function FeatureAsk() {
  return (
    <section
      id="feature-ask"
      className="relative section-padding"
      style={{ background: "#F0EBE6" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Phone mockup — left on desktop (order-last on mobile) */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start order-last lg:order-first"
          >
            <PhoneMockup>
              <div
                className="absolute inset-0 overflow-y-auto"
                style={{ background: "#0D0906", paddingTop: "48px" }}
              >
                {/* Chat header */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(123,51,70,0.15)" }}
                >
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "28px",
                      height: "28px",
                      background: "linear-gradient(135deg, #7B3346, #5C1F33)",
                    }}
                  >
                    <span style={{ fontSize: "12px" }}>🍷</span>
                  </div>
                  <div>
                    <p
                      className="font-body"
                      style={{ fontSize: "12px", fontWeight: 600, color: "#F9F6F4" }}
                    >
                      Corki
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: "9px", color: "#A39B95" }}
                    >
                      Your wine expert
                    </p>
                  </div>
                </div>

                <ChatDemo messages={messages} />
              </div>
            </PhoneMockup>
          </motion.div>

          {/* Copy — right */}
          <div className="flex flex-col gap-6">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FeatureBadge>Chat</FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ color: "#120D0A" }}
            >
              The wine app
              <br />
              that talks back.
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <p style={{ color: "#6B6460" }}>
                Not a score. Not a search result. A conversation.
              </p>
              <p style={{ color: "#6B6460" }}>
                Ask Corki what to bring to a dinner party. Ask why that Barossa Shiraz tastes
                like this. Ask what the difference is between Pinot Noir and Pinot Gris.
                No question is too basic. No question is too advanced.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
