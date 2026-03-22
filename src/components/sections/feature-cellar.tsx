"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { MapPin, Wine, LayoutGrid, ArrowRightLeft, Home, Fingerprint, Clock, ArrowLeft, MessageCircle, Plus, Utensils, FileText, CalendarRange, Grape as GrapeIcon } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

/* ── Wine data ──────────────────────────────────────────────────── */
type WineType = "Red" | "White" | "Rosé";

interface CellarWine {
  id: string;
  name: string;
  year: number;
  type: WineType;
  region: string;
  producer?: string;
  slots: string[];
  pairings: string[];
  tastingNote: string;
  drinkWindow?: string;
  varietals?: string[];
}

const wines: CellarWine[] = [
  { id: "opus", name: "Opus One", year: 2019, type: "Red", region: "Napa Valley", producer: "Opus One Winery", slots: ["1-2", "1-5", "2-3"], pairings: ["Lamb", "Beef tenderloin", "Hard cheese"], tastingNote: "Rich cassis and blackberry with subtle oak, cocoa, and a long velvety finish.", drinkWindow: "2024 – 2040", varietals: ["Cabernet Sauvignon", "Merlot", "Petit Verdot"] },
  { id: "cloudy", name: "Cloudy Bay", year: 2023, type: "White", region: "Marlborough", producer: "Cloudy Bay Vineyards", slots: ["1-1", "2-1", "3-4"], pairings: ["Seafood", "Goat cheese", "Thai salad"], tastingNote: "Vibrant citrus and passionfruit with a crisp, mineral finish.", drinkWindow: "2024 – 2027", varietals: ["Sauvignon Blanc"] },
  { id: "angel", name: "Whispering Angel", year: 2023, type: "Rosé", region: "Provence", producer: "Château d'Esclans", slots: ["1-4", "3-2"], pairings: ["Grilled fish", "Summer salad", "Charcuterie"], tastingNote: "Pale salmon pink. Delicate strawberry, peach, and white flower notes.", drinkWindow: "2024 – 2026", varietals: ["Grenache", "Cinsault", "Rolle"] },
  { id: "grange", name: "Penfolds Grange", year: 2018, type: "Red", region: "South Australia", producer: "Penfolds", slots: ["2-2", "2-5", "4-1"], pairings: ["Venison", "Rich stews", "Dark chocolate"], tastingNote: "Intense plum, blackberry compote, and spice with layers of vanilla and mocha.", drinkWindow: "2025 – 2055", varietals: ["Shiraz"] },
  { id: "chablis", name: "Chablis Premier Cru", year: 2021, type: "White", region: "Burgundy", producer: "William Fèvre", slots: ["3-1", "4-4"], pairings: ["Oysters", "Lobster", "Roast chicken"], tastingNote: "Flinty minerality with green apple, citrus zest, and a chalky finish.", drinkWindow: "2024 – 2032", varietals: ["Chardonnay"] },
  { id: "caymus", name: "Caymus Cabernet", year: 2020, type: "Red", region: "Napa Valley", producer: "Caymus Vineyards", slots: ["1-3", "3-3", "4-2"], pairings: ["Grilled steak", "Braised short rib"], tastingNote: "Dark fruit, cocoa, and vanilla with soft round tannins.", drinkWindow: "2024 – 2035", varietals: ["Cabernet Sauvignon"] },
  { id: "barolo", name: "Marchesi di Barolo", year: 2018, type: "Red", region: "Piedmont", producer: "Marchesi di Barolo", slots: ["2-4", "4-3"], pairings: ["Truffle pasta", "Braised meat", "Aged Parmigiano"], tastingNote: "Rose petal, tar, and cherry with firm tannins and a long spiced finish.", drinkWindow: "2026 – 2045", varietals: ["Nebbiolo"] },
  { id: "sancerre", name: "Domaine Vacheron", year: 2022, type: "White", region: "Loire Valley", producer: "Domaine Vacheron", slots: ["3-5", "4-5"], pairings: ["Goat cheese", "Asparagus", "Shellfish"], tastingNote: "Bright grapefruit and white peach with a smoky, flinty edge.", drinkWindow: "2024 – 2030", varietals: ["Sauvignon Blanc"] },
];

const MOVE_PRESET = "Move the Opus One to shelf 4";

/* 4 shelves, 6 cols, staggered: even rows = 6 slots, odd rows = 5 slots */
const SHELF_COUNT = 4;
const COLS = 6;

/* Staggered layout: each shelf has 2 rows: even (6 cols) + odd (5 cols) = 11 slots */
function getShelfSlots(shelfIdx: number): { id: string; row: number; col: number }[] {
  const slots: { id: string; row: number; col: number }[] = [];
  // Even row: 6 slots
  for (let c = 1; c <= COLS; c++) {
    slots.push({ id: `${shelfIdx + 1}-${slots.length + 1}`, row: 0, col: c });
  }
  // Odd row (staggered): 5 slots
  for (let c = 1; c <= COLS - 1; c++) {
    slots.push({ id: `${shelfIdx + 1}-${slots.length + 1}`, row: 1, col: c });
  }
  return slots;
}

// Build flat slot list per shelf
const shelves = Array.from({ length: SHELF_COUNT }, (_, i) => ({
  label: `Shelf ${i + 1}`,
  slots: getShelfSlots(i),
}));

// Reassign slot IDs to simple "shelf-index" for wine placement
// We'll use a simpler lookup: "shelfNum-slotIndex"
function getSlotWine(slotId: string): CellarWine | undefined {
  return wines.find((w) => w.slots.includes(slotId));
}

const totalSlots = shelves.reduce((n, s) => n + s.slots.length, 0);
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

const LM = {
  bg: "hsl(30,25%,96%)",
  fg: "hsl(350,20%,12%)",
  card: "hsl(30,20%,93%)",
  border: "hsl(30,15%,85%)",
  muted: "hsl(30,12%,90%)",
  mutedFg: "hsl(350,8%,46%)",
  primary: "hsl(348,52%,32%)",
  primaryFg: "hsl(30,25%,96%)",
  secondary: "hsl(30,15%,88%)",
  accent: "hsl(22,60%,48%)",
};

/* ── Animations ─────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: i * 0.1 } }),
};

const bullets = [
  { icon: <LayoutGrid size={16} />, text: "Visual grid map of every shelf and slot" },
  { icon: <MapPin size={16} />, text: "Know exactly where each bottle lives" },
  { icon: <Wine size={16} />, text: "Tap any bottle for full details" },
  { icon: <ArrowRightLeft size={16} />, text: "Update quickly by asking Corki" },
];

/* ── Dock (bottom nav) ──────────────────────────────────────────── */
function Dock({ active }: { active: "home" | "cellar" | "palate" | "history" }) {
  const tabs = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "cellar" as const, icon: Wine, label: "Cellar" },
    { id: "palate" as const, icon: Fingerprint, label: "Palate" },
    { id: "history" as const, icon: Clock, label: "History" },
  ];

  return (
    <div className="flex-shrink-0 px-2 pb-2">
      <div
        className="rounded-2xl flex items-center px-1"
        style={{
          background: "hsla(30,20%,93%,0.7)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${LM.border}`,
          boxShadow: "0 -4px 32px -8px rgba(123,51,70,0.12)",
        }}
      >
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <div key={tab.id} className="flex flex-col items-center justify-center flex-1 py-2.5 gap-0.5">
              <Icon size={16} style={{ color: isActive ? LM.primary : LM.mutedFg }} />
              <span className="font-body" style={{ fontSize: "8px", color: isActive ? LM.primary : LM.mutedFg }}>{tab.label}</span>
            </div>
          );
        })}

        {/* Center Corki orb */}
        <div className="flex-1 flex items-center justify-center -my-4">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              background: LM.primary,
              boxShadow: `0 0 16px rgba(123,51,70,0.3)`,
            }}
          >
            <img src="/icon/CorkiLogo.svg" alt="Corki" style={{ width: "24px", height: "24px" }} />
          </div>
        </div>

        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <div key={tab.id} className="flex flex-col items-center justify-center flex-1 py-2.5 gap-0.5">
              <Icon size={16} style={{ color: isActive ? LM.primary : LM.mutedFg }} />
              <span className="font-body" style={{ fontSize: "8px", color: isActive ? LM.primary : LM.mutedFg }}>{tab.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Staggered shelf grid ───────────────────────────────────────── */
function StaggeredShelf({
  shelf,
  selectedWine,
  selectedSlot,
  onSelectWine,
  onSelectSlot,
}: {
  shelf: { label: string; slots: { id: string; row: number }[] };
  selectedWine: CellarWine | null;
  selectedSlot: string | null;
  onSelectWine: (id: string) => void;
  onSelectSlot: (slotId: string) => void;
}) {
  const evenRow = shelf.slots.filter((s) => s.row === 0);
  const oddRow = shelf.slots.filter((s) => s.row === 1);

  function renderSlot(slot: { id: string }) {
    const slotWine = getSlotWine(slot.id);
    const isHighlighted = selectedWine && slotWine?.id === selectedWine.id;
    const isFaded = selectedWine && slotWine && slotWine.id !== selectedWine.id;
    const isEmpty = !slotWine;
    const isEmptySelected = isEmpty && selectedSlot === slot.id;

    return (
      <button
        key={slot.id}
        className="flex items-center justify-center rounded-lg"
        style={{
          aspectRatio: "1",
          background: isEmpty ? LM.muted : wineSlotColor(slotWine.type),
          opacity: isFaded ? 0.3 : isEmpty && !isEmptySelected ? 0.5 : 1,
          transform: isHighlighted || isEmptySelected ? "scale(1.08)" : "scale(1)",
          transition: "all 0.3s ease",
          border: isHighlighted
            ? `2px solid ${LM.fg}`
            : isEmptySelected
              ? `2px solid ${LM.mutedFg}`
              : `1px solid ${isEmpty ? LM.border : "transparent"}`,
          boxShadow: isHighlighted ? `0 0 10px ${wineSlotColor(slotWine!.type)}50` : "none",
          cursor: "pointer",
          gridColumn: "span 2",
        }}
        onClick={() => {
          if (slotWine) {
            onSelectWine(slotWine.id);
          } else {
            onSelectSlot(slot.id);
          }
        }}
      >
        {slotWine && <Wine size={10} style={{ color: "rgba(255,255,255,0.85)" }} />}
      </button>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: LM.fg }}>{shelf.label}</p>
        <p className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>
          {shelf.slots.filter((s) => getSlotWine(s.id)).length}/{shelf.slots.length} filled
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {/* Even row — 6 slots */}
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS * 2}, minmax(0, 1fr))` }}>
          {evenRow.map((slot) => renderSlot(slot))}
        </div>
        {/* Odd row — 5 slots, offset */}
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${COLS * 2}, minmax(0, 1fr))` }}>
          <div style={{ gridColumn: "span 1" }} />
          {oddRow.map((slot) => renderSlot(slot))}
          <div style={{ gridColumn: "span 1" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Thinking indicator ─────────────────────────────────────────── */
function ThinkingIndicator() {
  const icons = [Wine, GrapeIcon, MessageCircle];
  const [iconIdx, setIconIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIconIdx((i) => (i + 1) % icons.length), 650); return () => clearInterval(t); }, [icons.length]);
  const Icon = icons[iconIdx];
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body animate-pulse"
        style={{ fontSize: "10px", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)", color: LM.mutedFg }}>
        <Icon size={11} /> Corki is replying...
      </div>
    </div>
  );
}

/* ── Wine Detail View ───────────────────────────────────────────── */
function WineDetailView({ wine, onBack }: { wine: CellarWine; onBack: () => void }) {
  const typeBadge = wine.type === "Red"
    ? { bg: "rgba(123,51,70,0.15)", color: "#7B3346" }
    : wine.type === "White"
      ? { bg: "rgba(194,123,46,0.15)", color: "#B06020" }
      : { bg: "rgba(200,100,130,0.15)", color: "hsl(340,45%,45%)" };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: LM.bg }}>
      {/* Fixed back button + badge over scroll */}
      <div className="absolute top-0 left-0 right-0 z-20" style={{ paddingTop: "48px" }}>
        <div className="relative px-3 pt-3">
          <button onClick={onBack} className="absolute top-3 left-3 rounded-full flex items-center justify-center"
            style={{ width: "30px", height: "30px", background: "hsla(30,25%,96%,0.7)", backdropFilter: "blur(8px)", cursor: "pointer", border: "none" }}>
            <ArrowLeft size={14} style={{ color: LM.fg }} />
          </button>
          <div className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 font-body"
            style={{ fontSize: "9px", fontWeight: 600, background: typeBadge.bg, color: typeBadge.color, backdropFilter: "blur(4px)" }}>
            {wine.type}
          </div>
        </div>
      </div>

      {/* Scrollable content — image scrolls with it */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* Hero image */}
        <div className="relative" style={{ height: "190px", background: LM.muted }}>
          <img src={`/wines/${wine.id}.webp`} alt={wine.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${LM.bg} 0%, transparent 60%)` }} />
        </div>

        {/* Content */}
        <div className="px-4 -mt-8 relative z-10 pb-4">
        <h3 className="font-heading" style={{ fontSize: "16px", fontWeight: 700, color: LM.fg, lineHeight: 1.2 }}>
          {wine.name} — {wine.year}
        </h3>
        <p className="font-body mt-1" style={{ fontSize: "10px", color: LM.mutedFg }}>
          {wine.region}{wine.producer ? ` · ${wine.producer}` : ""}
        </p>

        {/* Bottle count */}
        <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-xl" style={{ background: "rgba(123,51,70,0.08)" }}>
          <Wine size={14} style={{ color: LM.primary }} />
          <span className="font-body" style={{ fontSize: "11px", fontWeight: 500, color: LM.fg }}>
            In your cellar · {wine.slots.length} bottle{wine.slots.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Cellar locations */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} style={{ color: LM.accent }} />
            <span className="font-body" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>In your cellars</span>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <div className="rounded-lg flex items-center justify-center" style={{ width: "24px", height: "24px", background: "rgba(123,51,70,0.08)" }}>
                <Wine size={12} style={{ color: LM.primary }} />
              </div>
              <div className="flex-1">
                <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: LM.fg }}>Wine Fridge</p>
                <p className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>{wine.slots.length} bottle{wine.slots.length > 1 ? "s" : ""} · Slots {wine.slots.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-1.5 px-3 pb-2.5">
              <button className="font-body rounded-lg px-2 py-1" style={{ fontSize: "8px", fontWeight: 500, background: LM.primary, color: LM.primaryFg, border: "none", cursor: "pointer" }}>Open cellar map</button>
              <button className="font-body rounded-lg px-2 py-1" style={{ fontSize: "8px", fontWeight: 500, background: "transparent", color: LM.fg, border: `1px solid ${LM.border}`, cursor: "pointer" }}>Move bottles</button>
            </div>
          </div>
        </div>

        {/* Drink window */}
        {wine.drinkWindow && (
          <div className="mt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <CalendarRange size={12} style={{ color: LM.primary }} />
              <span className="font-body" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>Drinking window</span>
            </div>
            <div className="rounded-xl px-3 py-2.5" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
              <p className="font-body" style={{ fontSize: "10px", color: LM.fg }}>{wine.drinkWindow}</p>
            </div>
          </div>
        )}

        {/* Varietals */}
        {wine.varietals && (
          <div className="mt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <GrapeIcon size={12} style={{ color: LM.mutedFg }} />
              <span className="font-body" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>Grape varieties</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {wine.varietals.map((v) => (
                <span key={v} className="font-body rounded-full px-2.5 py-1" style={{ fontSize: "9px", fontWeight: 500, background: LM.card, border: `1px solid ${LM.border}`, color: LM.fg }}>{v}</span>
              ))}
            </div>
          </div>
        )}

        {/* Pairs with */}
        {wine.pairings.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Utensils size={12} style={{ color: LM.accent }} />
              <span className="font-body" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>Pairs with</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {wine.pairings.map((p) => (
                <span key={p} className="font-body rounded-full px-2.5 py-1" style={{ fontSize: "9px", fontWeight: 500, background: LM.card, border: `1px solid ${LM.border}`, color: LM.fg }}>{p}</span>
              ))}
            </div>
          </div>
        )}

        {/* Tasting note */}
        <div className="mt-4">
          <div className="flex items-center gap-1.5 mb-2">
            <FileText size={12} style={{ color: LM.mutedFg }} />
            <span className="font-body" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>Tasting note</span>
          </div>
          <div className="rounded-xl px-3 py-2.5" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
            <p className="font-body" style={{ fontSize: "10px", lineHeight: 1.6, color: LM.fg }}>{wine.tastingNote}</p>
          </div>
        </div>

        {/* Ask Corki button */}
        <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-body"
          style={{ fontSize: "11px", fontWeight: 600, background: LM.primary, color: LM.primaryFg, border: "none", cursor: "pointer" }}>
          <MessageCircle size={13} /> Ask Corki about this wine
        </button>
        </div>
      </div>

      <Dock active="cellar" />
    </div>
  );
}

/* ── Cellar Map Mockup ──────────────────────────────────────────── */
function CellarMapMockup() {
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [view, setView] = useState<"map" | "detail">("map");
  const [movePhase, setMovePhase] = useState<"idle" | "typing" | "sent" | "thinking" | "responded">("idle");
  const [typedLen, setTypedLen] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedWine = wines.find((w) => w.id === selectedWineId) ?? null;

  const scrollToBottom = useCallback(() => {
    setTimeout(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, 50);
  }, []);

  const handleSelectWine = (id: string) => { setSelectedWineId(id); setSelectedSlot(null); };
  const handleSelectSlot = (slotId: string) => { setSelectedSlot(slotId); setSelectedWineId(null); };

  // Move auto-advance
  useEffect(() => {
    if (movePhase === "sent") { const t = setTimeout(() => { setMovePhase("thinking"); scrollToBottom(); }, 300); return () => clearTimeout(t); }
    if (movePhase === "thinking") { const t = setTimeout(() => { setMovePhase("responded"); scrollToBottom(); }, 2000); return () => clearTimeout(t); }
  }, [movePhase, scrollToBottom]);

  const handleMoveKeyDown = (e: React.KeyboardEvent) => {
    if (movePhase === "sent" || movePhase === "thinking" || movePhase === "responded") return;
    if (e.key === "Enter" && typedLen > 0) { setMovePhase("sent"); scrollToBottom(); return; }
    if (e.key.length === 1) {
      const next = typedLen + 1; setTypedLen(next); setMovePhase("typing");
      if (next >= MOVE_PRESET.length) { setMovePhase("sent"); scrollToBottom(); }
    }
  };

  const moveSent = movePhase === "sent" || movePhase === "thinking" || movePhase === "responded";

  // Wine detail view
  if (view === "detail" && selectedWine) {
    return <WineDetailView wine={selectedWine} onBack={() => setView("map")} />;
  }

  // Move chat view
  if (moveSent || movePhase === "typing") {
    return (
      <div className="absolute inset-0 flex flex-col" style={{ background: LM.bg, paddingTop: "48px" }}>
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${LM.border}` }}>
          <button onClick={() => { setMovePhase("idle"); setTypedLen(0); }}
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{ width: "26px", height: "26px", background: LM.secondary, border: "none", cursor: "pointer" }}>
            <ArrowLeft size={13} style={{ color: LM.fg }} />
          </button>
          <div>
            <p className="font-heading" style={{ fontSize: "13px", fontWeight: 700, color: LM.fg }}>Wine Fridge</p>
            <p className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>Editing cellar</p>
          </div>
        </div>
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-3 p-4">
            {moveSent && (
              <div className="flex justify-end">
                <div className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
                  style={{ background: LM.primary, color: LM.primaryFg, fontSize: "11px", lineHeight: 1.5 }}>
                  {MOVE_PRESET}
                </div>
              </div>
            )}
            {movePhase === "thinking" && <ThinkingIndicator />}
            {movePhase === "responded" && (
              <>
                <div className="flex justify-start">
                  <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}>
                    Done! I&apos;ve moved both bottles of Opus One from Shelf 1 down to Shelf 4.
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden flex" style={{ border: `1px solid ${LM.border}`, background: "rgba(140,80,180,0.03)" }}>
                  <div className="flex-shrink-0" style={{ width: "3px", background: "hsl(260,50%,50%)" }} />
                  <div className="flex-1 p-3 flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "28px", height: "28px", background: "rgba(140,80,180,0.1)" }}>
                        <ArrowRightLeft size={14} style={{ color: "hsl(260,50%,50%)" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body" style={{ fontSize: "12px", fontWeight: 600, color: LM.fg, lineHeight: 1.2 }}>Bottles moved</p>
                        <p className="font-body mt-0.5" style={{ fontSize: "10px", color: LM.mutedFg }}>Opus One 2019 · 2 bottles</p>
                      </div>
                    </div>
                    <div className="rounded-lg px-2.5 py-1.5 flex items-center gap-1.5" style={{ background: LM.bg, border: `1px solid ${LM.border}` }}>
                      <MapPin size={9} style={{ color: LM.accent }} />
                      <span className="font-body" style={{ fontSize: "9px", color: LM.mutedFg }}>Shelf 1 → Shelf 4</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="font-body rounded-lg px-3 py-1.5" style={{ fontSize: "10px", fontWeight: 500, background: LM.primary, color: LM.primaryFg, border: "none", cursor: "pointer" }}>View cellar</button>
                      <button className="font-body rounded-lg px-3 py-1.5" style={{ fontSize: "10px", fontWeight: 500, background: "transparent", color: "hsl(0,65%,50%)", border: "1px solid hsla(0,65%,50%,0.3)", cursor: "pointer" }}>Undo</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 px-3 pb-2 pt-1" style={{ borderTop: `1px solid ${LM.border}`, background: LM.bg }}>
          <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
            <input type="text" value={movePhase === "typing" ? MOVE_PRESET.slice(0, typedLen) : ""} placeholder="Tell Corki what to change..." disabled={moveSent}
              onChange={() => {}} onKeyDown={handleMoveKeyDown} autoFocus
              className="font-body flex-1 bg-transparent outline-none" style={{ fontSize: "10px", color: movePhase === "typing" ? LM.fg : LM.mutedFg, caretColor: LM.primary }} />
            <div className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{ width: "22px", height: "22px", background: typedLen > 0 && !moveSent ? LM.primary : LM.muted }}>
              <MessageCircle size={10} style={{ color: typedLen > 0 && !moveSent ? LM.primaryFg : LM.mutedFg }} />
            </div>
          </div>
        </div>
        <Dock active="cellar" />
      </div>
    );
  }

  // Default: cellar map
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: LM.bg, paddingTop: "48px" }}>
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${LM.border}` }}>
        <div className="flex items-center gap-2">
          <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "26px", height: "26px", background: LM.secondary }}>
            <ArrowLeft size={13} style={{ color: LM.fg }} />
          </div>
          <div>
            <p className="font-heading" style={{ fontSize: "13px", fontWeight: 700, color: LM.fg }}>Wine Fridge</p>
            <p className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>Wine fridge · {filledCount}/{totalSlots} bottles · {capacityPct}% full</p>
          </div>
        </div>
        <div className="rounded-lg flex items-center gap-1 px-2 py-1" style={{ background: "rgba(123,51,70,0.08)", border: "1px solid rgba(123,51,70,0.12)" }}>
          <LayoutGrid size={11} style={{ color: LM.primary }} />
          <span className="font-body" style={{ fontSize: "9px", fontWeight: 600, color: LM.primary }}>Fill</span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-3 pt-3 pb-2">
        <div className="flex flex-col gap-4">
          {shelves.map((shelf, i) => (
            <StaggeredShelf key={i} shelf={shelf} selectedWine={selectedWine} selectedSlot={selectedSlot}
              onSelectWine={handleSelectWine} onSelectSlot={handleSelectSlot} />
          ))}
          <div className="flex items-center flex-wrap gap-x-3 gap-y-1.5 py-1">
            {([["Red", "#7B3346"], ["White", "#C27B2E"], ["Rosé", "hsl(340,45%,52%)"], ["Sparkling", "#C4A44A"], ["Fortified", "#5B3A29"], ["Other", "#6B7280"]] as [string, string][]).map(([label, color]) => (
              <div key={label} className="flex items-center gap-1">
                <div className="rounded-sm" style={{ width: "8px", height: "8px", background: color }} />
                <span className="font-body" style={{ fontSize: "7px", color: LM.mutedFg }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected wine overlay — clickable to detail */}
      {selectedWine && (
        <div className="flex-shrink-0 px-3 pb-1">
          <button onClick={() => setView("detail")} className="w-full rounded-xl p-2.5 flex items-center gap-2 text-left"
            style={{ background: LM.card, border: `1px solid ${LM.border}`, cursor: "pointer" }}>
            <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "28px", height: "28px", background: wineTypeBg(selectedWine.type) }}>
              <Wine size={14} style={{ color: wineTypeText(selectedWine.type) }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading truncate" style={{ fontSize: "10px", fontWeight: 600, color: LM.fg, lineHeight: 1.2 }}>{selectedWine.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>{selectedWine.year} · {selectedWine.region}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={8} style={{ color: LM.accent }} />
              <span className="font-body" style={{ fontSize: "8px", color: LM.mutedFg }}>{selectedWine.slots.length} bottle{selectedWine.slots.length > 1 ? "s" : ""}</span>
            </div>
          </button>
        </div>
      )}

      {/* Empty slot overlay */}
      {selectedSlot && !selectedWine && (
        <div className="flex-shrink-0 px-3 pb-1">
          <div className="rounded-xl p-2.5 flex items-center gap-2" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
            <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "28px", height: "28px", background: LM.muted }}>
              <span className="font-body" style={{ fontSize: "9px", fontWeight: 700, color: LM.mutedFg }}>{selectedSlot}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: LM.fg, lineHeight: 1.2 }}>Empty slot</p>
              <p className="font-body" style={{ fontSize: "8px", color: LM.mutedFg, marginTop: "1px" }}>Slot {selectedSlot}</p>
            </div>
            <button className="flex-shrink-0 rounded-lg flex items-center gap-1 px-2.5 py-1.5"
              style={{ background: LM.primary, color: LM.primaryFg, fontSize: "9px", fontWeight: 600, border: "none", cursor: "pointer" }}>
              <Plus size={10} /> Add wine
            </button>
          </div>
        </div>
      )}

      {/* Chat bar — interactive typing */}
      <div className="flex-shrink-0 px-3 pb-1">
        <div className="rounded-xl flex items-center gap-2 px-3 py-2" style={{ background: LM.card, border: `1px solid ${LM.border}`, cursor: "pointer" }}>
          <MessageCircle size={12} style={{ color: LM.primary }} />
          <input type="text" value="" placeholder="Ask Corki to rearrange, move, or edit..."
            onChange={() => {}} onKeyDown={handleMoveKeyDown}
            className="font-body flex-1 bg-transparent outline-none"
            style={{ fontSize: "9px", color: LM.mutedFg, caretColor: LM.primary }} />
        </div>
      </div>

      <Dock active="cellar" />
    </div>
  );
}

export function FeatureCellar() {
  return (
    <section id="feature-cellar" className="relative section-padding" style={{ background: "#F9F6F4" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FeatureBadge icon={<Wine size={14} />}>Cellar</FeatureBadge>
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ color: "#120D0A" }}>
              Every bottle,<br />right where you left it.
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
              <p style={{ color: "#6B6460" }}>Your cellar, mapped out. Corki gives you a visual grid of every shelf, slot, and bottle so you can find what you need at a glance.</p>
              <p style={{ color: "#6B6460" }}>Tap any bottle to see its details and exactly where it sits. It&rsquo;s the closest thing to opening the fridge door.</p>
            </motion.div>
            <motion.ul custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3 mt-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: "32px", height: "32px", background: "rgba(123,51,70,0.08)", border: "1px solid rgba(123,51,70,0.15)", color: "#7B3346" }}>
                    {bullet.icon}
                  </span>
                  <span className="font-body text-sm" style={{ color: "#6B6460" }}>{bullet.text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center lg:justify-end">
            <PhoneMockup>
              <CellarMapMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
