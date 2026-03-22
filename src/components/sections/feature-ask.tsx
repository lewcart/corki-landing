"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Wine, MapPin, MessageCircle } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

/* ── Light-mode colors matching Corki app defaults ──────────────── */
const LM = {
  bg: "hsl(30,25%,96%)",          // --background
  fg: "hsl(350,20%,12%)",         // --foreground
  card: "hsl(30,20%,93%)",        // --card
  border: "hsl(30,15%,85%)",      // --border
  muted: "hsl(30,12%,90%)",       // --muted
  mutedFg: "hsl(350,8%,46%)",     // --muted-foreground
  primary: "hsl(348,52%,32%)",    // --primary
  primaryFg: "hsl(30,25%,96%)",   // --primary-foreground
  secondary: "hsl(30,15%,88%)",   // --secondary
  accent: "hsl(22,60%,48%)",      // --accent
};

/* ── Inline wine suggestion card (light mode) ──────────────────── */
function WineSuggestionCard({
  name,
  year,
  type,
  region,
  cellarName,
  zone,
  slot,
  pairings,
}: {
  name: string;
  year: number;
  type: "Red" | "White" | "Rosé";
  region: string;
  cellarName: string;
  zone: string;
  slot: string;
  pairings: string[];
}) {
  const typeColor =
    type === "Red"
      ? { bg: "rgba(123,51,70,0.1)", text: "#7B3346" }
      : type === "White"
        ? { bg: "rgba(194,123,46,0.1)", text: "#B06020" }
        : { bg: "rgba(200,100,130,0.1)", text: "hsl(340,45%,45%)" };

  const accentColor = type === "Red" ? LM.primary : type === "White" ? LM.accent : "hsl(340,50%,45%)";

  return (
    <div
      className="rounded-xl overflow-hidden flex"
      style={{
        border: `1px solid ${LM.border}`,
        background: LM.card,
      }}
    >
      {/* Left accent bar */}
      <div
        className="flex-shrink-0"
        style={{ width: "3px", background: accentColor }}
      />

      <div className="flex-1 p-3 flex flex-col gap-2">
        {/* Header: wine icon + name */}
        <div className="flex items-start gap-2">
          <div
            className="flex-shrink-0 rounded-lg flex items-center justify-center"
            style={{
              width: "26px",
              height: "26px",
              background: typeColor.bg,
            }}
          >
            <Wine size={13} style={{ color: typeColor.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="font-heading"
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: LM.fg,
                lineHeight: 1.2,
              }}
            >
              {name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="font-body"
                style={{ fontSize: "9px", color: LM.mutedFg }}
              >
                {year}
              </span>
              <span
                className="font-body rounded-full px-1.5 py-0.5"
                style={{
                  fontSize: "7px",
                  fontWeight: 600,
                  background: typeColor.bg,
                  color: typeColor.text,
                }}
              >
                {type}
              </span>
              <span
                className="font-body"
                style={{ fontSize: "9px", color: LM.mutedFg }}
              >
                · {region}
              </span>
            </div>
          </div>
        </div>

        {/* Cellar location */}
        <div
          className="rounded-lg px-2 py-1.5 flex items-center gap-1.5"
          style={{
            background: LM.bg,
            border: `1px solid ${LM.border}`,
          }}
        >
          <MapPin size={10} style={{ color: LM.accent }} />
          <span
            className="font-body"
            style={{ fontSize: "9px", color: LM.mutedFg }}
          >
            {cellarName} → {zone} → {slot}
          </span>
        </div>

        {/* Pairing pills */}
        <div className="flex flex-wrap gap-1">
          {pairings.map((p) => (
            <span
              key={p}
              className="font-body rounded-full"
              style={{
                fontSize: "8px",
                padding: "2px 6px",
                background: LM.bg,
                border: `1px solid ${LM.border}`,
                color: LM.mutedFg,
                fontWeight: 500,
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AskConversationMockup() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ background: LM.bg, paddingTop: "48px" }}
    >
      {/* Chat header — fixed */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
        style={{
          borderBottom: `1px solid ${LM.border}`,
          background: "hsla(30,25%,96%,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Back button */}
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: "28px",
            height: "28px",
            background: LM.secondary,
          }}
        >
          <ArrowLeft size={14} style={{ color: LM.fg }} />
        </div>
        {/* Conversation icon */}
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            width: "28px",
            height: "28px",
            background: LM.muted,
          }}
        >
          <MessageCircle size={13} style={{ color: LM.mutedFg }} />
        </div>
        {/* Title + subtitle */}
        <div className="min-w-0">
          <p
            className="font-body truncate"
            style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}
          >
            Lamb dinner tonight
          </p>
          <p
            className="font-body truncate"
            style={{ fontSize: "9px", color: LM.mutedFg }}
          >
            Pairing recommendation
          </p>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
      <div className="flex flex-col gap-3 p-4">
        {/* User message */}
        <div className="flex justify-end">
          <div
            className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
            style={{
              background: LM.primary,
              color: LM.primaryFg,
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            I&apos;m making lamb tonight. What should I open?
          </div>
        </div>

        {/* Corki reply */}
        <div className="flex justify-start">
          <div
            className="max-w-[85%] font-body"
            style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}
          >
            Lamb loves a wine with structure. You&apos;ve got two great options in your cellar:
          </div>
        </div>

        {/* Wine card 1 */}
        <WineSuggestionCard
          name="Opus One"
          year={2019}
          type="Red"
          region="Napa Valley"
          cellarName="Wine Fridge"
          zone="Top Shelf"
          slot="A3"
          pairings={["Lamb", "Beef", "Hard cheese"]}
        />

        {/* Corki follow-up */}
        <div className="flex justify-start">
          <div
            className="max-w-[85%] font-body"
            style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}
          >
            Or if you want to save the Opus One for a special occasion:
          </div>
        </div>

        {/* Wine card 2 */}
        <WineSuggestionCard
          name="Penfolds Grange"
          year={2018}
          type="Red"
          region="South Australia"
          cellarName="Wine Fridge"
          zone="Bottom Shelf"
          slot="B2"
          pairings={["Lamb", "Venison", "Rich stews"]}
        />

        {/* User follow-up */}
        <div className="flex justify-end">
          <div
            className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
            style={{
              background: LM.primary,
              color: LM.primaryFg,
              fontSize: "11px",
              lineHeight: 1.5,
            }}
          >
            Go with the Grange. How long should I decant it?
          </div>
        </div>

        {/* Corki reply */}
        <div className="flex justify-start">
          <div
            className="max-w-[85%] font-body"
            style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}
          >
            Great pick. Give the Grange a good <span style={{ fontWeight: 600 }}>60–90 minutes</span> in a decanter — it&apos;ll open up beautifully. The tannins will soften and you&apos;ll get more of those dark fruit and spice notes with the lamb. Enjoy tonight!
          </div>
        </div>
      </div>
      </div>

      {/* Input bar — fixed at bottom */}
      <div
        className="flex-shrink-0 px-3 pb-4 pt-2"
        style={{
          borderTop: `1px solid ${LM.border}`,
          background: LM.bg,
        }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{
            background: LM.card,
            border: `1px solid ${LM.border}`,
          }}
        >
          <span
            className="font-body flex-1"
            style={{ fontSize: "10px", color: LM.mutedFg }}
          >
            Ask Corki anything...
          </span>
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "22px",
              height: "22px",
              background: LM.primary,
            }}
          >
            <MessageCircle size={10} style={{ color: LM.primaryFg }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureAsk() {
  return (
    <section
      id="feature-ask"
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
              <AskConversationMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
