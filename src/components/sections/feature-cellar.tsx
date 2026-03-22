"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Wine, LayoutGrid, ArrowRightLeft } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

/* ── Wine data with cellar placements ───────────────────────────── */
type WineType = "Red" | "White" | "Rosé";

interface CellarWine {
  id: string;
  name: string;
  year: number;
  type: WineType;
  region: string;
  slots: string[]; // e.g. ["A1", "A2"]
}

const wines: CellarWine[] = [
  { id: "opus",   name: "Opus One",            year: 2019, type: "Red",   region: "Napa Valley",     slots: ["A3", "B1"] },
  { id: "cloudy", name: "Cloudy Bay",           year: 2023, type: "White", region: "Marlborough",     slots: ["A1", "A5"] },
  { id: "angel",  name: "Whispering Angel",     year: 2023, type: "Rosé",  region: "Provence",        slots: ["B4"] },
  { id: "grange", name: "Penfolds Grange",      year: 2018, type: "Red",   region: "South Australia", slots: ["B2", "B5"] },
  { id: "chablis",name: "Chablis Premier Cru",  year: 2021, type: "White", region: "Burgundy",        slots: ["A2"] },
  { id: "caymus", name: "Caymus Cabernet",      year: 2020, type: "Red",   region: "Napa Valley",     slots: ["B3"] },
];

/* Build a slot→wine lookup */
const ROWS = ["A", "B"] as const;
const COLS = [1, 2, 3, 4, 5, 6] as const;
const totalSlots = ROWS.length * COLS.length;

function getSlotWine(slotId: string): CellarWine | undefined {
  return wines.find((w) => w.slots.includes(slotId));
}

const filledCount = wines.reduce((n, w) => n + w.slots.length, 0);
const capacityPct = Math.round((filledCount / totalSlots) * 100);

/* ── Colors ─────────────────────────────────────────────────────── */
function wineSlotColor(type: WineType) {
  if (type === "Red") return "#7B3346";
  if (type === "White") return "#C27B2E";
  return "hsl(340,45%,52%)";
}

function wineTypeBg(type: WineType) {
  if (type === "Red") return "rgba(123,51,70,0.15)";
  if (type === "White") return "rgba(194,123,46,0.15)";
  return "rgba(200,100,130,0.15)";
}

function wineTypeText(type: WineType) {
  if (type === "Red") return "#9C4B61";
  if (type === "White") return "#C27B2E";
  return "hsl(340,45%,52%)";
}

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

const bullets = [
  { icon: <LayoutGrid size={16} />, text: "Visual grid map of every shelf and slot" },
  { icon: <MapPin size={16} />, text: "Know exactly where each bottle lives" },
  { icon: <Wine size={16} />, text: "Colour-coded by red, white, and rosé" },
  { icon: <ArrowRightLeft size={16} />, text: "Move and reorganise in seconds" },
];

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

/* ── Cellar Map Mockup (interactive, light mode) ────────────────── */
function CellarMapMockup() {
  const [selectedWineId, setSelectedWineId] = useState<string | null>("opus");

  const selectedWine = wines.find((w) => w.id === selectedWineId) ?? null;

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{ background: LM.bg, paddingTop: "48px" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${LM.border}` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(123,51,70,0.1)",
              border: "1px solid rgba(123,51,70,0.15)",
            }}
          >
            <LayoutGrid size={13} style={{ color: LM.primary }} />
          </div>
          <div>
            <p
              className="font-body"
              style={{ fontSize: "12px", fontWeight: 600, color: LM.fg }}
            >
              Wine Fridge
            </p>
            <p
              className="font-body"
              style={{ fontSize: "9px", color: LM.mutedFg }}
            >
              {filledCount} of {totalSlots} slots filled
            </p>
          </div>
        </div>
        <span
          className="font-body rounded-full px-2 py-0.5"
          style={{
            fontSize: "9px",
            fontWeight: 600,
            background: capacityPct > 60 ? "rgba(194,123,46,0.1)" : "rgba(123,51,70,0.1)",
            color: capacityPct > 60 ? LM.accent : LM.primary,
            border: `1px solid ${capacityPct > 60 ? "rgba(194,123,46,0.2)" : "rgba(123,51,70,0.2)"}`,
          }}
        >
          {capacityPct}%
        </span>
      </div>

      {/* Capacity bar */}
      <div className="px-4 pt-3">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: "4px", background: LM.muted }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${capacityPct}%`,
              background: `linear-gradient(90deg, ${LM.primary}, ${LM.accent})`,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>

      {/* Zone grids */}
      <div className="px-4 pt-4 flex flex-col gap-4">
        {ROWS.map((row) => (
          <div key={row}>
            {/* Zone label */}
            <p
              className="font-body mb-2"
              style={{
                fontSize: "9px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: LM.mutedFg,
              }}
            >
              {row === "A" ? "Top Shelf" : "Bottom Shelf"}
            </p>

            {/* Slot grid */}
            <div className="grid grid-cols-6 gap-1.5">
              {COLS.map((col) => {
                const slotId = `${row}${col}`;
                const slotWine = getSlotWine(slotId);
                const isHighlighted =
                  selectedWine && slotWine?.id === selectedWine.id;
                const isFaded =
                  selectedWine && slotWine && slotWine.id !== selectedWine.id;
                const isEmpty = !slotWine;

                return (
                  <button
                    key={slotId}
                    className="relative flex flex-col items-center justify-center rounded-lg"
                    style={{
                      aspectRatio: "1",
                      background: isEmpty
                        ? LM.muted
                        : wineSlotColor(slotWine.type),
                      opacity: isFaded ? 0.3 : isEmpty ? 0.5 : 1,
                      transform: isHighlighted ? "scale(1.08)" : "scale(1)",
                      transition: "all 0.3s ease",
                      border: isHighlighted
                        ? `2px solid ${LM.fg}`
                        : `1px solid ${isEmpty ? LM.border : "transparent"}`,
                      boxShadow: isHighlighted
                        ? `0 0 12px ${wineSlotColor(slotWine!.type)}50`
                        : "none",
                      cursor: slotWine ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (slotWine) setSelectedWineId(slotWine.id);
                    }}
                  >
                    {slotWine && (
                      <Wine
                        size={12}
                        style={{
                          color: "rgba(255,255,255,0.85)",
                        }}
                      />
                    )}
                    <span
                      className="font-body"
                      style={{
                        fontSize: "7px",
                        color: isEmpty
                          ? LM.mutedFg
                          : "rgba(255,255,255,0.7)",
                        marginTop: "1px",
                        opacity: isEmpty ? 0.5 : 1,
                      }}
                    >
                      {slotId}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected wine detail */}
      {selectedWine && (
        <div className="px-4 pt-4 pb-2">
          <div
            className="rounded-xl p-3 flex items-center gap-2.5"
            style={{
              background: LM.card,
              border: `1px solid ${LM.border}`,
            }}
          >
            <div
              className="flex-shrink-0 rounded-lg flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                background: wineTypeBg(selectedWine.type),
              }}
            >
              <Wine size={16} style={{ color: wineTypeText(selectedWine.type) }} />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-heading truncate"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: LM.fg,
                  lineHeight: 1.2,
                }}
              >
                {selectedWine.name}
              </p>
              <p
                className="font-body"
                style={{ fontSize: "9px", color: LM.mutedFg, marginTop: "1px" }}
              >
                {selectedWine.year} · {selectedWine.region}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={8} style={{ color: LM.accent }} />
                <span
                  className="font-body"
                  style={{ fontSize: "8px", color: LM.mutedFg }}
                >
                  {selectedWine.slots.join(", ")}
                </span>
                <span
                  className="font-body"
                  style={{ fontSize: "8px", color: LM.mutedFg }}
                >
                  · {selectedWine.slots.length} bottle{selectedWine.slots.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
            <span
              className="font-body rounded-full px-1.5 py-0.5 flex-shrink-0"
              style={{
                fontSize: "7px",
                fontWeight: 600,
                background: wineTypeBg(selectedWine.type),
                color: wineTypeText(selectedWine.type),
              }}
            >
              {selectedWine.type}
            </span>
          </div>
        </div>
      )}

      {/* Wine selector chips */}
      <div className="px-4 pt-2 pb-6">
        <p
          className="font-body mb-2"
          style={{
            fontSize: "8px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: LM.mutedFg,
          }}
        >
          Tap to find
        </p>
        <div className="flex flex-wrap gap-1.5">
          {wines.map((w) => (
            <button
              key={w.id}
              className="font-body rounded-full px-2 py-1 flex items-center gap-1"
              style={{
                fontSize: "9px",
                fontWeight: selectedWineId === w.id ? 600 : 500,
                background:
                  selectedWineId === w.id
                    ? wineTypeBg(w.type)
                    : LM.card,
                border: `1px solid ${
                  selectedWineId === w.id
                    ? `${wineSlotColor(w.type)}40`
                    : LM.border
                }`,
                color:
                  selectedWineId === w.id
                    ? wineTypeText(w.type)
                    : LM.mutedFg,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => setSelectedWineId(w.id)}
            >
              <div
                className="rounded-full"
                style={{
                  width: "5px",
                  height: "5px",
                  background: wineSlotColor(w.type),
                  opacity: selectedWineId === w.id ? 1 : 0.5,
                }}
              />
              {w.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCellar() {
  return (
    <section
      id="feature-cellar"
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
              <FeatureBadge>Cellar</FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ color: "#120D0A" }}
            >
              Every bottle,
              <br />
              right where you left it.
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
                Your cellar, mapped out. Corki gives you a visual grid of every shelf,
                slot, and bottle — colour-coded so you can find what you need at a glance.
              </p>
              <p style={{ color: "#6B6460" }}>
                Tap a wine to see exactly where it sits. Move bottles around by dragging.
                It&rsquo;s the closest thing to opening the fridge door.
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
              <CellarMapMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
