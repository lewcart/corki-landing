"use client";

import { motion, type Variants } from "framer-motion";
import { Camera, Wine, MessageCircle, Save } from "lucide-react";
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

function ScanResultMockup() {
  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: "#F9F6F4", paddingTop: "48px" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(163,155,149,0.2)" }}
      >
        <span
          className="font-body text-xs font-semibold uppercase tracking-widest"
          style={{ color: "#7B3346" }}
        >
          Scan Result
        </span>
        <span
          className="font-body text-xs"
          style={{ color: "#A39B95" }}
        >
          ✓ Identified
        </span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-4">
        {/* Wine name */}
        <div>
          <h3
            className="font-heading leading-tight"
            style={{
              fontFamily: "var(--font-heading), Georgia, serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#120D0A",
              lineHeight: 1.2,
            }}
          >
            Penfolds Bin 389
          </h3>
          <p
            className="font-body"
            style={{ fontSize: "13px", color: "#7B3346", marginTop: "2px", fontWeight: 600 }}
          >
            Cabernet Shiraz 2021
          </p>
          <p
            className="font-body"
            style={{ fontSize: "11px", color: "#A39B95", marginTop: "2px" }}
          >
            South Australia
          </p>
        </div>

        {/* Score badge */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #7B3346, #5C1F33)",
              color: "#F9F6F4",
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: "var(--font-heading), Georgia, serif",
            }}
          >
            94
          </div>
          <div>
            <p
              className="font-body"
              style={{ fontSize: "11px", fontWeight: 600, color: "#120D0A" }}
            >
              Outstanding
            </p>
            <p
              className="font-body"
              style={{ fontSize: "10px", color: "#A39B95" }}
            >
              Corki&apos;s take
            </p>
          </div>
          <div
            className="ml-auto rounded-full px-2 py-1 font-body"
            style={{
              background: "rgba(194,123,46,0.12)",
              border: "1px solid rgba(194,123,46,0.25)",
              fontSize: "10px",
              color: "#C27B2E",
              fontWeight: 600,
            }}
          >
            ~$45
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(163,155,149,0.2)" }} />

        {/* Tasting notes */}
        <div>
          <p
            className="font-body font-semibold"
            style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A39B95", marginBottom: "6px" }}
          >
            Tasting Notes
          </p>
          <p
            className="font-body"
            style={{ fontSize: "11px", color: "#6B6460", lineHeight: 1.6 }}
          >
            Dark cherry and blackcurrant with hints of cedar and dark chocolate. Full-bodied with well-integrated tannins and a long, spiced finish.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(163,155,149,0.2)" }} />

        {/* Food pairings */}
        <div>
          <p
            className="font-body font-semibold"
            style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A39B95", marginBottom: "8px" }}
          >
            Pairs With
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Lamb", "Beef ribs", "Aged cheddar", "Venison"].map((item) => (
              <span
                key={item}
                className="font-body"
                style={{
                  fontSize: "10px",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: "rgba(123,51,70,0.08)",
                  border: "1px solid rgba(123,51,70,0.2)",
                  color: "#7B3346",
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #7B3346, #5C1F33)",
            color: "#F9F6F4",
            fontSize: "12px",
            fontWeight: 600,
            fontFamily: "var(--font-body), system-ui, sans-serif",
            border: "none",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          Save to Cellar
        </button>
      </div>
    </div>
  );
}

export function FeatureScan() {
  return (
    <section
      id="feature-scan"
      className="relative section-padding"
      style={{ background: "#F9F6F4" }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Copy — left */}
          <div className="flex flex-col gap-6">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <FeatureBadge>Scan</FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ color: "#120D0A" }}
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
              <p style={{ color: "#6B6460" }}>
                Standing in the bottle shop, staring at a label you don&rsquo;t recognise?
                Scan it. Corki tells you exactly what you&rsquo;re holding: the grape, the region,
                what it pairs with, whether it&rsquo;s worth the price.
              </p>
              <p style={{ color: "#6B6460" }}>
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
                      background: "rgba(123,51,70,0.08)",
                      border: "1px solid rgba(123,51,70,0.15)",
                      color: "#7B3346",
                    }}
                  >
                    {bullet.icon}
                  </span>
                  <span
                    className="font-body text-sm"
                    style={{ color: "#6B6460" }}
                  >
                    {bullet.text}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Phone mockup — right */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <PhoneMockup>
              <ScanResultMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
