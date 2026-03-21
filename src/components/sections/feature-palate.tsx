"use client";

import { motion, type Variants } from "framer-motion";
import { Fingerprint, Grape, MapPin, TrendingUp, SlidersHorizontal } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const bullets = [
  { icon: <Grape size={16} />, text: "Learns your preferred grapes and styles" },
  { icon: <MapPin size={16} />, text: "Picks up on the regions you love" },
  { icon: <TrendingUp size={16} />, text: "Smarter suggestions over time" },
  { icon: <SlidersHorizontal size={16} />, text: "See what Corki knows, confirm or correct" },
];

const preferences = [
  {
    label: "Favourite grape",
    value: "Shiraz",
    confidence: "high" as const,
    source: "confirmed",
  },
  {
    label: "Go-to region",
    value: "Barossa Valley",
    confidence: "high" as const,
    source: "learned",
  },
  {
    label: "Preferred style",
    value: "Full-bodied reds",
    confidence: "high" as const,
    source: "learned",
  },
  {
    label: "Favourite white",
    value: "Riesling",
    confidence: "medium" as const,
    source: "learned",
  },
  {
    label: "Avoids",
    value: "Oaky Chardonnay",
    confidence: "medium" as const,
    source: "confirmed",
  },
  {
    label: "Sweet spot price",
    value: "$20–$40",
    confidence: "low" as const,
    source: "learned",
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

function confidenceColor(c: "high" | "medium" | "low") {
  if (c === "high") return "#7B3346";
  if (c === "medium") return "#C27B2E";
  return "#A39B95";
}

function confidenceBg(c: "high" | "medium" | "low") {
  if (c === "high") return "rgba(123,51,70,0.15)";
  if (c === "medium") return "rgba(194,123,46,0.12)";
  return "rgba(163,155,149,0.1)";
}

function PalateMockup() {
  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: "#0D0906", paddingTop: "48px" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(123,51,70,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              background: "linear-gradient(135deg, rgba(123,51,70,0.3), rgba(123,51,70,0.1))",
              border: "1px solid rgba(123,51,70,0.25)",
            }}
          >
            <Fingerprint size={14} style={{ color: "#9C4B61" }} />
          </div>
          <div>
            <p
              className="font-body"
              style={{ fontSize: "13px", fontWeight: 600, color: "#F9F6F4" }}
            >
              My Palate
            </p>
            <p
              className="font-body"
              style={{ fontSize: "10px", color: "#A39B95" }}
            >
              {preferences.length} preferences
            </p>
          </div>
        </div>
      </div>

      {/* Preferences list */}
      <div className="flex flex-col gap-2 p-3">
        {preferences.map((pref, i) => (
          <div
            key={i}
            className="rounded-xl p-3 flex items-center justify-between"
            style={{
              background: "rgba(249,246,244,0.03)",
              border: "1px solid rgba(249,246,244,0.06)",
            }}
          >
            <div className="flex flex-col gap-0.5">
              <p
                className="font-body"
                style={{ fontSize: "9px", color: "#A39B95", textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {pref.label}
              </p>
              <p
                className="font-body"
                style={{ fontSize: "12px", fontWeight: 600, color: "#F9F6F4" }}
              >
                {pref.value}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {pref.source === "learned" && (
                <span
                  className="font-body rounded-full px-1.5 py-0.5"
                  style={{
                    fontSize: "8px",
                    color: confidenceColor(pref.confidence),
                    background: confidenceBg(pref.confidence),
                    fontWeight: 600,
                  }}
                >
                  AI
                </span>
              )}
              <div className="flex gap-0.5">
                {["high", "medium", "low"].map((level, j) => (
                  <div
                    key={j}
                    className="rounded-full"
                    style={{
                      width: "6px",
                      height: "6px",
                      background:
                        (pref.confidence === "high") ||
                        (pref.confidence === "medium" && j < 2) ||
                        (pref.confidence === "low" && j < 1)
                          ? confidenceColor(pref.confidence)
                          : "rgba(163,155,149,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturePalate() {
  return (
    <section
      id="feature-palate"
      className="relative section-padding"
      style={{ background: "#F0EBE6" }}
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
              <PalateMockup />
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
              <FeatureBadge
                icon={<Fingerprint size={14} />}
              >
                Palate
              </FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ color: "#120D0A" }}
            >
              Corki learns
              <br />
              what you like.
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
                No quizzes. No flavour wheels. Just drink what you drink,
                and Corki picks up the rest.
              </p>
              <p style={{ color: "#6B6460" }}>
                Over time they build a picture of your taste. The grapes
                you reach for, the regions you come back to, the styles that
                click. Every recommendation gets a little sharper.
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
                  <span className="font-body text-sm" style={{ color: "#6B6460" }}>
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
