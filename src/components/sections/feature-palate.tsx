"use client";

import { motion, type Variants } from "framer-motion";
import {
  Fingerprint,
  Grape,
  MapPin,
  TrendingUp,
  SlidersHorizontal,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const bullets = [
  { icon: <Grape size={16} />, text: "Learns your preferred grapes and styles" },
  { icon: <MapPin size={16} />, text: "Picks up on the regions you love" },
  { icon: <TrendingUp size={16} />, text: "Smarter suggestions over time" },
  {
    icon: <SlidersHorizontal size={16} />,
    text: "See what Corki knows, confirm or correct",
  },
];

/* ── Spectrum data ──────────────────────────────────────────────── */
interface SpectrumItem {
  label: string;
  options: string[];
  selected: number; // index of selected option
}

const spectrums: SpectrumItem[] = [
  { label: "Body", options: ["Light", "Medium", "Full"], selected: 2 },
  { label: "Sweetness", options: ["Dry", "Off-dry", "Sweet"], selected: 0 },
  { label: "Adventure", options: ["Comfort", "Curious", "Explorer"], selected: 1 },
];

/* ── Preference chips ───────────────────────────────────────────── */
interface PrefChip {
  label: string;
  sentiment: "positive" | "negative";
  confidence: "high" | "medium";
}

const stylePrefs: PrefChip[] = [
  { label: "Cabernet Sauvignon", sentiment: "positive", confidence: "high" },
  { label: "Shiraz", sentiment: "positive", confidence: "high" },
  { label: "Pinot Noir", sentiment: "positive", confidence: "medium" },
  { label: "Riesling", sentiment: "positive", confidence: "medium" },
  { label: "Oaky Chardonnay", sentiment: "negative", confidence: "high" },
  { label: "Sweet Moscato", sentiment: "negative", confidence: "medium" },
];

const regionPrefs: PrefChip[] = [
  { label: "Barossa Valley", sentiment: "positive", confidence: "high" },
  { label: "Burgundy", sentiment: "positive", confidence: "high" },
  { label: "Napa Valley", sentiment: "positive", confidence: "medium" },
  { label: "Tuscany", sentiment: "positive", confidence: "medium" },
];

/* ── Animations ─────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

/* ── Chip component ─────────────────────────────────────────────── */
function Chip({ chip }: { chip: PrefChip }) {
  const isPositive = chip.sentiment === "positive";
  return (
    <span
      className="font-body inline-flex items-center gap-1 rounded-full px-2 py-1"
      style={{
        fontSize: "9px",
        fontWeight: 500,
        background: isPositive
          ? "rgba(16,185,129,0.08)"
          : "rgba(244,63,94,0.08)",
        border: `1px solid ${
          isPositive ? "rgba(16,185,129,0.2)" : "rgba(244,63,94,0.2)"
        }`,
        color: isPositive
          ? "rgba(16,185,129,0.9)"
          : "rgba(244,63,94,0.9)",
      }}
    >
      {isPositive ? (
        <ThumbsUp size={8} />
      ) : (
        <ThumbsDown size={8} />
      )}
      {chip.label}
      {chip.confidence === "high" && (
        <span style={{ fontSize: "7px", opacity: 0.7 }}>✦</span>
      )}
    </span>
  );
}

/* ── Palate Mockup ──────────────────────────────────────────────── */
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
              background:
                "linear-gradient(135deg, rgba(123,51,70,0.3), rgba(123,51,70,0.1))",
              border: "1px solid rgba(123,51,70,0.25)",
            }}
          >
            <Fingerprint size={14} style={{ color: "#9C4B61" }} />
          </div>
          <div>
            <p
              className="font-body"
              style={{ fontSize: "12px", fontWeight: 600, color: "#F9F6F4" }}
            >
              My Palate
            </p>
            <p
              className="font-body"
              style={{ fontSize: "9px", color: "#A39B95" }}
            >
              Updated from 23 conversations
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {/* Taste summary card */}
        <div
          className="rounded-xl p-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(123,51,70,0.12) 0%, rgba(194,123,46,0.08) 100%)",
            border: "1px solid rgba(123,51,70,0.15)",
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "10px",
              lineHeight: 1.6,
              color: "rgba(249,246,244,0.8)",
            }}
          >
            You gravitate towards{" "}
            <span style={{ fontWeight: 600, color: "#F9F6F4" }}>
              bold, full-bodied reds
            </span>{" "}
            — especially Cabernet and Shiraz from warm-climate regions. You prefer{" "}
            <span style={{ fontWeight: 600, color: "#F9F6F4" }}>dry wines</span>{" "}
            and lean towards Old World when exploring whites.
          </p>
        </div>

        {/* Spectrum bars */}
        <div className="flex flex-col gap-3">
          {spectrums.map((spec) => (
            <div key={spec.label}>
              <p
                className="font-body mb-1.5"
                style={{
                  fontSize: "8px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#A39B95",
                }}
              >
                {spec.label}
              </p>
              <div className="flex gap-1">
                {spec.options.map((opt, i) => (
                  <div
                    key={opt}
                    className="flex-1 rounded-lg py-1.5 text-center font-body"
                    style={{
                      fontSize: "9px",
                      fontWeight: i === spec.selected ? 600 : 400,
                      background:
                        i === spec.selected
                          ? "linear-gradient(135deg, #7B3346, #5C1F33)"
                          : "rgba(249,246,244,0.04)",
                      color:
                        i === spec.selected
                          ? "#F9F6F4"
                          : "rgba(249,246,244,0.35)",
                      border:
                        i === spec.selected
                          ? "1px solid rgba(123,51,70,0.4)"
                          : "1px solid rgba(249,246,244,0.04)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Wine Styles chips */}
        <div>
          <p
            className="font-body mb-2"
            style={{
              fontSize: "8px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#A39B95",
            }}
          >
            Wine Styles
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stylePrefs.map((chip) => (
              <Chip key={chip.label} chip={chip} />
            ))}
          </div>
        </div>

        {/* Regions chips */}
        <div>
          <p
            className="font-body mb-2"
            style={{
              fontSize: "8px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#A39B95",
            }}
          >
            Regions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {regionPrefs.map((chip) => (
              <Chip key={chip.label} chip={chip} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturePalate() {
  return (
    <section
      id="feature-palate"
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
              <FeatureBadge variant="pro" icon={<Fingerprint size={14} />}>
                Palate
              </FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
              <p>
                No quizzes. No flavour wheels. Just drink what you drink,
                and Corki picks up the rest.
              </p>
              <p>
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
                      background: "rgba(194,123,46,0.1)",
                      border: "1px solid rgba(194,123,46,0.2)",
                      color: "#C27B2E",
                    }}
                  >
                    {bullet.icon}
                  </span>
                  <span className="font-body text-sm text-smoke"
                  >
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
