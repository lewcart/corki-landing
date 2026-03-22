"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Camera, ScanLine, Wine, MessageCircle, Save, Utensils } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const bullets = [
  { icon: <Camera size={16} />, text: "Label recognition in seconds" },
  { icon: <Wine size={16} />, text: "Tasting notes, pairings, cellaring advice" },
  { icon: <MessageCircle size={16} />, text: "Ask follow-up questions right away" },
  { icon: <Save size={16} />, text: "Save to your cellar in one tap" },
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

function ScanConversationMockup() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: "#0D0906", paddingTop: "48px" }}
    >
      {/* Chat header — fixed */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
        style={{
          borderBottom: "1px solid rgba(249,246,244,0.06)",
          background: "rgba(13,9,6,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Back button */}
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: "28px",
            height: "28px",
            background: "rgba(249,246,244,0.08)",
          }}
        >
          <ArrowLeft size={14} style={{ color: "#A39B95" }} />
        </div>
        {/* Conversation icon */}
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: "28px",
            height: "28px",
            background: "rgba(123,51,70,0.15)",
          }}
        >
          <ScanLine size={13} style={{ color: "#9C4B61" }} />
        </div>
        {/* Title + subtitle */}
        <div className="min-w-0">
          <p
            className="font-body truncate"
            style={{ fontSize: "11px", fontWeight: 600, color: "#F9F6F4" }}
          >
            Château Margaux 2015
          </p>
          <p
            className="font-body truncate"
            style={{ fontSize: "9px", color: "#A39B95" }}
          >
            Label scan · Red, Bordeaux
          </p>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col gap-3 p-4">
        {/* User message with wine label photo */}
        <div className="flex justify-end">
          <div
            className="max-w-[78%] rounded-2xl rounded-br-sm overflow-hidden"
            style={{
              background: "rgba(30,21,17,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Wine label photo */}
            <Image
              src="/chateau-margaux-2015.png"
              alt="Château Margaux 2015 wine label"
              width={400}
              height={600}
              className="w-full h-auto"
              style={{ maxHeight: "140px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Corki message about the wine */}
        <div className="flex justify-start">
          <div
            className="max-w-[85%] text-sm leading-relaxed font-body"
            style={{ color: "#F9F6F4" }}
          >
            <p style={{ fontSize: "11px", lineHeight: 1.6 }}>
              That&apos;s a <span style={{ fontWeight: 600 }}>Château Margaux 2015</span> — one of Bordeaux&apos;s finest. Elegant and powerful with incredible depth. The 2015 vintage is drinking beautifully right now.
            </p>
          </div>
        </div>

        {/* Wine Detail Card — matching real app WineDetailSummaryCard */}
        <div
          className="rounded-xl overflow-hidden flex"
          style={{
            border: "1px solid rgba(123,51,70,0.3)",
            background: "rgba(249,246,244,0.03)",
          }}
        >
          {/* Left accent bar */}
          <div
            className="flex-shrink-0"
            style={{ width: "3px", background: "#7B3346" }}
          />

          <div className="flex-1 p-3 flex flex-col gap-2.5">
            {/* Header: wine icon + name */}
            <div className="flex items-start gap-2">
              <div
                className="flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                  background: "rgba(123,51,70,0.15)",
                }}
              >
                <Wine size={14} style={{ color: "#9C4B61" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-heading"
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#F9F6F4",
                    lineHeight: 1.2,
                  }}
                >
                  Château Margaux
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="font-body"
                    style={{ fontSize: "10px", color: "#A39B95" }}
                  >
                    2015
                  </span>
                  <span
                    className="font-body rounded-full px-1.5 py-0.5"
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      background: "rgba(123,51,70,0.15)",
                      color: "#9C4B61",
                    }}
                  >
                    Red
                  </span>
                </div>
                <p
                  className="font-body mt-0.5"
                  style={{ fontSize: "9px", color: "#A39B95" }}
                >
                  Margaux, Bordeaux
                </p>
              </div>
            </div>

            {/* Tasting note */}
            <div
              className="rounded-lg px-2 py-1.5 font-body"
              style={{
                fontSize: "10px",
                lineHeight: 1.5,
                color: "rgba(249,246,244,0.7)",
                background: "rgba(249,246,244,0.03)",
                border: "1px solid rgba(249,246,244,0.05)",
              }}
            >
              Blackcurrant, violet, and graphite on the nose. Silky tannins with extraordinary length and precision.
            </div>

            {/* Pairs with */}
            <div>
              <div className="flex items-center gap-1 mb-1.5">
                <Utensils size={9} style={{ color: "#A39B95" }} />
                <span
                  className="font-body"
                  style={{
                    fontSize: "8px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#A39B95",
                  }}
                >
                  Pairs with
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Rack of lamb", "Filet mignon", "Aged Comté"].map((item) => (
                  <span
                    key={item}
                    className="font-body rounded-full"
                    style={{
                      fontSize: "9px",
                      padding: "2px 7px",
                      background: "rgba(249,246,244,0.05)",
                      border: "1px solid rgba(249,246,244,0.08)",
                      color: "rgba(249,246,244,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to cellar button */}
            <button
              className="font-body rounded-lg flex items-center justify-center gap-1.5"
              style={{
                width: "100%",
                padding: "7px",
                background: "linear-gradient(135deg, #7B3346, #5C1F33)",
                color: "#F9F6F4",
                fontSize: "11px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              <Save size={12} />
              Add to cellar
            </button>
          </div>
        </div>
        {/* User follow-up */}
        <div className="flex justify-end">
          <div
            className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
            style={{
              background: "rgba(30,21,17,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#A39B95",
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            How long can I cellar this for?
          </div>
        </div>

        {/* Corki reply */}
        <div className="flex justify-start">
          <div
            className="max-w-[85%] font-body"
            style={{ fontSize: "11px", lineHeight: 1.6, color: "#F9F6F4" }}
          >
            The 2015 Margaux has <span style={{ fontWeight: 600 }}>decades</span> ahead of it. It&apos;ll keep developing complexity through 2045 easily. If you cellar it, you&apos;re in for a treat down the road.
          </div>
        </div>
      </div>
      </div>

      {/* Input bar — fixed at bottom */}
      <div
        className="flex-shrink-0 px-3 pb-4 pt-2"
        style={{
          borderTop: "1px solid rgba(249,246,244,0.06)",
          background: "#0D0906",
        }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{
            background: "rgba(249,246,244,0.05)",
            border: "1px solid rgba(249,246,244,0.08)",
          }}
        >
          <span
            className="font-body flex-1"
            style={{ fontSize: "10px", color: "#A39B95" }}
          >
            Ask Corki anything...
          </span>
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "22px",
              height: "22px",
              background: "rgba(123,51,70,0.3)",
            }}
          >
            <MessageCircle size={10} style={{ color: "#9C4B61" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureScan() {
  return (
    <section
      id="feature-scan"
      className="relative section-padding"
      style={{ background: "#1E1511" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Phone mockup — left on desktop */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start order-last lg:order-first"
          >
            <PhoneMockup>
              <ScanConversationMockup />
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
              <FeatureBadge variant="pro">Scan</FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Point. Scan. Know.
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <p>
                Standing in the bottle shop, staring at a label you don&rsquo;t recognise?
                Scan it. Corki tells you exactly what you&rsquo;re holding: the grape, the region,
                what it pairs with, and whether you&rsquo;ll like it.
              </p>
              <p>
                In plain English. Not wine-critic jargon.
              </p>
            </motion.div>

            <motion.ul
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-3 mt-2"
            >
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(194,123,46,0.1)",
                      border: "1px solid rgba(194,123,46,0.2)",
                      color: "#C27B2E",
                    }}
                  >
                    {bullet.icon}
                  </span>
                  <span className="font-body text-sm text-smoke">
                    {bullet.text}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
