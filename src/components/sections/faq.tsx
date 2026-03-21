"use client";

import { motion } from "framer-motion";
import { FeatureBadge } from "@/components/ui/feature-badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  }),
};

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Do I need to create an account?",
    answer:
      "No. Download Corki and start asking immediately. You get 10 free messages before you need to do anything.",
  },
  {
    question: "How does the label scanner work?",
    answer:
      "Point your camera at any wine label. Corki identifies the wine and generates a full response: tasting notes, region info, pairing suggestions, in seconds.",
  },
  {
    question: "What's the difference between free and Corki Friend?",
    answer:
      "The free tier gives you 10 messages all-time to try the product. Corki Friend unlocks unlimited conversations, label scans, full chat history, cellar management, and all seven premium themes.",
  },
  {
    question: "How does Corki understand my taste and cellar?",
    answer:
      "Corki has deep knowledge of grapes, regions, vintages, producers, and food pairing, and ties that expertise to your specific collection. They remember your previous conversations, know what's in your cellar, and learn your preferences over time. Ask what to open tonight, whether a wine is ready to drink, or what to bring to a dinner party. Answers tailored to you, not generic results.",
  },
  {
    question: "What phones does it work on?",
    answer: (
      <>
        iOS: iPhone and iPad. Android and web versions are in development.{" "}
        <a href="#waitlist" className="underline hover:text-amber-light transition-colors duration-200">
          Join the waitlist
        </a>{" "}
        to find out when they&apos;re available.
      </>
    ),
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Subscriptions are managed through your Apple ID, and you can cancel anytime from your device's subscription settings.",
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative section-padding overflow-hidden"
      style={{ backgroundColor: "#F9F6F4" }}
    >
      <div className="relative z-10 flex flex-col items-center px-6 max-w-2xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-8"
        >
          <FeatureBadge>Questions</FeatureBadge>
        </motion.div>

        {/* Accordion */}
        <motion.div
          custom={0.1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full"
        >
          <Accordion
            className="w-full"
            style={
              {
                "--accordion-border": "rgba(123,51,70,0.15)",
              } as React.CSSProperties
            }
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={String(i)}
                className="border-b last:border-b-0"
                style={{ borderColor: "rgba(123,51,70,0.15)" }}
              >
                <AccordionTrigger
                  className="py-5 text-left text-base font-medium font-[family-name:var(--font-body)] hover:no-underline hover:text-amber-light transition-colors duration-200"
                  style={{ color: "#120D0A" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm leading-relaxed font-[family-name:var(--font-body)] pb-5"
                  style={{ color: "#6B6460" }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
