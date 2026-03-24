"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "How do I get started with Corki?",
    answer:
      "Download Corki from the App Store and open it — no account or sign-up required. You get 10 free messages to explore. Ask about any wine, scan a label, or start building your cellar straight away.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Download Corki and start asking immediately. You get 10 free messages before you need to do anything.",
  },
  {
    question: "What can I ask Corki?",
    answer:
      "Almost anything wine-related. Ask about grapes, regions, vintages, producers, food pairings, serving temperatures, cellar potential, or what to open tonight. Corki draws on deep wine knowledge and ties it to your personal cellar and taste preferences.",
  },
  {
    question: "How does the label scanner work?",
    answer:
      "Point your camera at any wine label. Corki identifies the wine and generates a full response — tasting notes, region info, pairing suggestions — in seconds.",
  },
  {
    question: "My label scan didn't work — what should I do?",
    answer:
      "Make sure the label is well-lit and the full front label is visible in the frame. If the scan still fails, you can describe the wine in the chat instead — Corki works just as well from text. If the issue persists, email us at support@corki.app.",
  },
  {
    question: "What's the difference between free and Corki Friend?",
    answer:
      "The free tier gives you 10 messages all-time to try the product. Corki Friend unlocks unlimited conversations, label scans, full chat history, cellar management, and all seven premium themes.",
  },
  {
    question: "How does Corki understand my taste and cellar?",
    answer:
      "Corki has deep knowledge of grapes, regions, vintages, producers, and food pairing, and ties that expertise to your specific collection. It remembers your previous conversations, knows what's in your cellar, and learns your preferences over time.",
  },
  {
    question: "How do I manage or cancel my Corki Friend subscription?",
    answer:
      "Subscriptions are managed through your Apple ID. To cancel, open Settings on your iPhone → your name → Subscriptions → Corki → Cancel Subscription. You'll keep access until the end of your billing period.",
  },
  {
    question: "Is my wine data private and secure?",
    answer: (
      <>
        Yes. Your data is stored securely in Australia and never sold to third parties. Chat messages are processed by OpenAI to generate responses, but Corki does not share identifiable personal data with advertisers. Read our{" "}
        <a href="/privacy" className="underline" style={{ color: "#D4944A" }}>
          Privacy Policy
        </a>{" "}
        for full details.
      </>
    ),
  },
  {
    question: "What phones does Corki work on?",
    answer: (
      <>
        iOS only for now — iPhone and iPad. Android and web versions are in development.{" "}
        <Link href="/#waitlist" className="underline" style={{ color: "#D4944A" }}>
          Join the waitlist
        </Link>{" "}
        to be notified when they&apos;re available.
      </>
    ),
  },
];

export function SupportFAQ() {
  return (
    <Accordion
      className="w-full"
      style={
        {
          "--accordion-border": "rgba(123,51,70,0.2)",
        } as React.CSSProperties
      }
    >
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={String(i)}
          className="border-b last:border-b-0"
          style={{ borderColor: "rgba(123,51,70,0.2)" }}
        >
          <AccordionTrigger
            className="py-5 text-left text-base font-medium font-[family-name:var(--font-body)] hover:no-underline transition-colors duration-200"
            style={{ color: "#F9F6F4" }}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className="text-sm leading-relaxed font-[family-name:var(--font-body)] pb-5"
            style={{ color: "#A39B95" }}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
