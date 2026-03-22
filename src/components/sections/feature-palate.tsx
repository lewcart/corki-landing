"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Fingerprint, Grape, MapPin, TrendingUp, SlidersHorizontal,
  Home, Wine, Clock, ArrowLeft, Check, X, Sparkles, Droplets, Utensils,
} from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const bullets = [
  { icon: <Grape size={16} />, text: "Learns your preferred grapes and styles" },
  { icon: <MapPin size={16} />, text: "Picks up on the regions you love" },
  { icon: <TrendingUp size={16} />, text: "Smarter suggestions over time" },
  { icon: <SlidersHorizontal size={16} />, text: "See what Corki knows, confirm or correct" },
];

/* ── Preference card data ───────────────────────────────────────── */
interface PrefCard {
  id: string;
  category: string;
  categoryColor: string;
  iconName: string;
  accentColor: string;
  title: string;
  confidence: "High" | "Medium" | "Low";
  reason: string;
  editSuggestion: string; // what fake typing shows when X is pressed
}

const ICON_MAP: Record<string, React.ReactNode> = {
  droplets: <Droplets size={14} style={{ color: "#B8566E" }} />,
  sliders: <SlidersHorizontal size={14} style={{ color: "#C4B8B2" }} />,
  utensils: <Utensils size={14} style={{ color: "#D4944A" }} />,
  mapPin: <MapPin size={14} style={{ color: "#4BB870" }} />,
  trending: <TrendingUp size={14} style={{ color: "#C4B8B2" }} />,
};

const initialLearningPrefs: PrefCard[] = [
  { id: "taste", category: "TASTE", categoryColor: "#B8566E", iconName: "droplets", accentColor: "#D4944A", title: "Prefers full-bodied reds", confidence: "High", reason: "8 of your last 10 saves", editSuggestion: "Prefers medium-bodied reds" },
  { id: "aroma", category: "AROMA", categoryColor: "#B8566E", iconName: "sliders", accentColor: "#D4944A", title: "Low oak preference", confidence: "Medium", reason: "You rate unoaked wines higher", editSuggestion: "Some oak is fine, not heavy" },
  { id: "pairing", category: "PAIRING", categoryColor: "#D4944A", iconName: "utensils", accentColor: "#4BB870", title: "Crisp whites for seafood", confidence: "High", reason: "Always pair fish with Sancerre", editSuggestion: "Any dry white for seafood" },
  { id: "region", category: "REGION", categoryColor: "#4BB870", iconName: "mapPin", accentColor: "#4BB870", title: "Italian over French blends", confidence: "Low", reason: "3 recent Super Tuscan saves", editSuggestion: "Enjoys both equally" },
  { id: "producer", category: "PRODUCER", categoryColor: "#C4B8B2", iconName: "trending", accentColor: "#D4944A", title: "Natural / organic producers", confidence: "Medium", reason: "4 recent favourites", editSuggestion: "No producer preference" },
];

const confirmedPrefs: { category: string; categoryColor: string; icon: React.ReactNode; accentColor: string; title: string; reason: string }[] = [
  { category: "REGION", categoryColor: "#4BB870", icon: <MapPin size={14} style={{ color: "#4BB870" }} />, accentColor: "#4BB870", title: "Loves Barossa Shiraz", reason: "You set this" },
  { category: "VARIETAL", categoryColor: "#A070D0", icon: <Grape size={14} style={{ color: "#A070D0" }} />, accentColor: "#A070D0", title: "Enjoys Burgundy Pinot Noir", reason: "You set this" },
  { category: "STYLE", categoryColor: "#6AAAD4", icon: <Fingerprint size={14} style={{ color: "#6AAAD4" }} />, accentColor: "#6AAAD4", title: "No dessert wines", reason: "You set this" },
];

/* ── Animations ─────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay: i * 0.1 } }),
};

/* ── Confidence badge colors (dark mode) ────────────────────────── */
function confColor(c: "High" | "Medium" | "Low") {
  if (c === "High") return { bg: "rgba(184,86,110,0.2)", text: "#B8566E" };
  if (c === "Medium") return { bg: "rgba(212,148,74,0.15)", text: "#D4944A" };
  return { bg: "rgba(196,184,178,0.15)", text: "#C4B8B2" };
}

/* ── Palate Mockup (dark mode, interactive) ──────────────────────── */
function PalateMockup() {
  const [prefs, setPrefs] = useState(initialLearningPrefs);
  const [confirmed, setConfirmed] = useState(confirmedPrefs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTypedLen, setEditTypedLen] = useState(0);
  const [fadingOutId, setFadingOutId] = useState<string | null>(null);
  const [fadingInKey, setFadingInKey] = useState<string | null>(null);

  // Animate card from learning → confirmed
  const animateConfirm = useCallback((id: string, title: string, pref: PrefCard, reason: string) => {
    setFadingOutId(id);
    setTimeout(() => {
      setPrefs((p) => p.filter((x) => x.id !== id));
      setFadingOutId(null);
      const newKey = `${pref.category}-${Date.now()}`;
      setConfirmed((c) => [...c, { category: pref.category, categoryColor: pref.categoryColor, icon: ICON_MAP[pref.iconName], accentColor: pref.accentColor, title, reason }]);
      setFadingInKey(newKey);
      setTimeout(() => setFadingInKey(null), 500);
    }, 300);
  }, []);

  // Animate card dismissal
  const animateDismiss = useCallback((id: string) => {
    setFadingOutId(id);
    setTimeout(() => {
      setPrefs((p) => p.filter((x) => x.id !== id));
      setFadingOutId(null);
    }, 300);
  }, []);

  const handleEditKeyDown = useCallback((e: React.KeyboardEvent, pref: PrefCard) => {
    if (e.key === "Enter" && editTypedLen > 0) {
      animateConfirm(pref.id, pref.editSuggestion.slice(0, editTypedLen), pref, "You edited this");
      setEditingId(null);
      setEditTypedLen(0);
      return;
    }
    if (e.key.length === 1) {
      const next = editTypedLen + 1;
      setEditTypedLen(next);
      if (next >= pref.editSuggestion.length) {
        // Auto-complete: don't auto-confirm, let user tick or X
      }
    }
  }, [editTypedLen]);

  const handleConfirm = useCallback((id: string) => {
    const pref = prefs.find((p) => p.id === id);
    if (!pref) return;
    const isEditing = editingId === id;
    const title = isEditing ? pref.editSuggestion.slice(0, editTypedLen) || pref.editSuggestion : pref.title;
    animateConfirm(id, title, pref, isEditing ? "You edited this" : "You confirmed this");
    setEditingId(null);
    setEditTypedLen(0);
  }, [prefs, editingId, editTypedLen, animateConfirm]);

  const handleDismiss = useCallback((id: string) => {
    if (editingId === id) {
      // Already editing — dismiss entirely with animation
      animateDismiss(id);
      setEditingId(null);
      setEditTypedLen(0);
    } else {
      // Start editing — clear title, show input
      setEditingId(id);
      setEditTypedLen(0);
    }
  }, [editingId, animateDismiss]);

  const learningCount = prefs.length;
  const confirmedCount = confirmed.length;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#0D0906", paddingTop: "48px" }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(249,246,244,0.06)" }}>
        <div className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: "28px", height: "28px", background: "rgba(249,246,244,0.08)" }}>
          <ArrowLeft size={14} style={{ color: "#A39B95" }} />
        </div>
        <div>
          <p className="font-heading" style={{ fontSize: "13px", fontWeight: 700, color: "#F9F6F4" }}>My Palate</p>
          <p className="font-body" style={{ fontSize: "8px", color: "#A39B95" }}>What Corki knows about your taste</p>
        </div>
      </div>

      {/* Scrollable content — hide scrollbar */}
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div className="flex flex-col gap-3 p-4">

          {/* Corki Thinks... summary card */}
          <div className="rounded-xl overflow-hidden flex" style={{ background: "rgba(249,246,244,0.03)", border: "1px solid rgba(249,246,244,0.06)" }}>
            <div className="flex-shrink-0" style={{ width: "3px", background: "#D4944A" }} />
            <div className="flex-1 p-3 flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: "#D4944A" }} />
                <span className="font-body" style={{ fontSize: "8px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#D4944A" }}>
                  Corki thinks...
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Droplets size={12} style={{ color: "#B8566E", marginTop: "2px" }} />
                <div>
                  <span className="font-body" style={{ fontSize: "7px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#B8566E" }}>TASTE</span>
                  <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.3 }}>
                    You&apos;ve been gravitating towards bold, full-bodied reds
                  </p>
                  <p className="font-body" style={{ fontSize: "8px", color: "#A39B95" }}>Based on your last 5 additions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={12} style={{ color: "#4BB870", marginTop: "2px" }} />
                <div>
                  <span className="font-body" style={{ fontSize: "7px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4BB870" }}>REGION</span>
                  <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.3 }}>
                    New region unlocked — Marlborough, NZ
                  </p>
                  <p className="font-body" style={{ fontSize: "8px", color: "#A39B95" }}>Your first Sauvignon Blanc from here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats badges */}
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(249,246,244,0.04)", border: "1px solid rgba(249,246,244,0.06)" }}>
              <div className="rounded-full" style={{ width: "6px", height: "6px", background: "#B8566E" }} />
              <span className="font-body" style={{ fontSize: "9px", fontWeight: 500, color: "#F9F6F4" }}>{confirmedCount} confirmed</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "rgba(249,246,244,0.04)", border: "1px solid rgba(249,246,244,0.06)" }}>
              <div className="rounded-full" style={{ width: "6px", height: "6px", background: "#D4944A" }} />
              <span className="font-body" style={{ fontSize: "9px", fontWeight: 500, color: "#F9F6F4" }}>{learningCount} learning</span>
            </div>
          </div>

          {/* Corki is learning section */}
          {learningCount > 0 && (
            <>
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: "#D4944A" }} />
                <span className="font-body" style={{ fontSize: "11px", fontWeight: 700, color: "#F9F6F4" }}>Corki is learning</span>
              </div>

              {prefs.map((pref) => {
                const isEditing = editingId === pref.id;
                const isFadingOut = fadingOutId === pref.id;
                return (
                  <div key={pref.id} className="rounded-xl overflow-hidden flex" style={{
                    background: isEditing ? "rgba(212,148,74,0.06)" : "rgba(249,246,244,0.03)",
                    border: isEditing ? "1px solid rgba(212,148,74,0.2)" : "1px solid rgba(249,246,244,0.06)",
                    transition: "all 0.3s ease",
                    opacity: isFadingOut ? 0 : 1,
                    transform: isFadingOut ? "translateX(-20px) scale(0.95)" : "translateX(0) scale(1)",
                    maxHeight: isFadingOut ? "0px" : "200px",
                    marginBottom: isFadingOut ? "-8px" : undefined,
                    overflow: "hidden",
                  }}>
                    <div className="flex-shrink-0" style={{ width: "3px", background: isEditing ? "#D4944A" : pref.accentColor }} />
                    <div className="flex-1 px-2.5 py-2 flex items-center gap-2">
                      <div className="flex-shrink-0">{ICON_MAP[pref.iconName]}</div>
                      <div className="flex-1 min-w-0">
                        <span className="font-body" style={{ fontSize: "7px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: pref.categoryColor }}>{pref.category}</span>
                        {isEditing ? (
                          /* Editable input area */
                          <div className="mt-0.5">
                            <input
                              type="text"
                              value={editTypedLen > 0 ? pref.editSuggestion.slice(0, editTypedLen) : ""}
                              placeholder="Tell Corki what's right..."
                              onChange={() => {}}
                              onKeyDown={(e) => handleEditKeyDown(e, pref)}
                              autoFocus
                              className="font-body w-full bg-transparent outline-none"
                              style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                color: editTypedLen > 0 ? "#F9F6F4" : "transparent",
                                caretColor: "#D4944A",
                                lineHeight: 1.3,
                              }}
                            />
                            <p className="font-body" style={{ fontSize: "8px", color: "#A39B95", marginTop: "1px" }}>
                              {editTypedLen > 0 ? "Your correction" : "Type to correct this"}
                            </p>
                          </div>
                        ) : (
                          /* Normal display */
                          <>
                            <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.3 }}>{pref.title}</p>
                            <div className="flex items-center gap-1.5">
                              <span className="font-body rounded-sm px-1 py-0.5" style={{ fontSize: "7px", fontWeight: 600, ...confColor(pref.confidence) }}>{pref.confidence}</span>
                              <span className="font-body" style={{ fontSize: "8px", color: "#A39B95" }}>{pref.reason}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => handleConfirm(pref.id)} className="rounded-full flex items-center justify-center"
                          style={{ width: "20px", height: "20px", background: isEditing && editTypedLen > 0 ? "rgba(75,184,112,0.2)" : "rgba(184,86,110,0.15)", border: "none", cursor: "pointer" }}>
                          <Check size={10} style={{ color: isEditing && editTypedLen > 0 ? "#4BB870" : "#B8566E" }} />
                        </button>
                        <button onClick={() => handleDismiss(pref.id)} className="rounded-full flex items-center justify-center"
                          style={{ width: "20px", height: "20px", background: "rgba(249,246,244,0.06)", border: "none", cursor: "pointer" }}>
                          <X size={10} style={{ color: "#A39B95" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* Confirmed section */}
          <div className="flex items-center gap-1.5 mt-1">
            <Check size={12} style={{ color: "#B8566E" }} />
            <span className="font-body" style={{ fontSize: "11px", fontWeight: 700, color: "#F9F6F4" }}>Confirmed</span>
          </div>

          {confirmed.map((pref, i) => {
            const isNew = i === confirmed.length - 1 && fadingInKey !== null;
            return (
            <div key={`${pref.title}-${i}`} className="rounded-xl overflow-hidden flex" style={{
              background: isNew ? "rgba(75,184,112,0.06)" : "rgba(249,246,244,0.03)",
              border: isNew ? "1px solid rgba(75,184,112,0.2)" : "1px solid rgba(249,246,244,0.06)",
              transition: "all 0.5s ease",
              animation: isNew ? "slideInFromLeft 0.4s ease forwards" : undefined,
            }}>
              <div className="flex-shrink-0" style={{ width: "3px", background: pref.accentColor }} />
              <div className="flex-1 px-2.5 py-1.5 flex items-center gap-2">
                <div className="flex-shrink-0">{pref.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-body" style={{ fontSize: "10px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.3 }}>{pref.title}</p>
                  <p className="font-body" style={{ fontSize: "8px", color: "#A39B95" }}>{pref.reason}</p>
                </div>
                <div className="flex-shrink-0 rounded-full flex items-center justify-center" style={{ width: "20px", height: "20px", background: "rgba(249,246,244,0.06)" }}>
                  <X size={10} style={{ color: "#A39B95" }} />
                </div>
              </div>
            </div>
            );
          })}

        </div>
      </div>

      <DarkDock active="palate" />
    </div>
  );
}

/* ── Dock (dark mode) ───────────────────────────────────────────── */
function DarkDock({ active }: { active: "home" | "cellar" | "palate" | "history" }) {
  const tabs = [
    { id: "home" as const, icon: Home, label: "Home" },
    { id: "cellar" as const, icon: Wine, label: "Cellar" },
    { id: "palate" as const, icon: Fingerprint, label: "Palate" },
    { id: "history" as const, icon: Clock, label: "History" },
  ];
  return (
    <div className="flex-shrink-0 px-2 pb-2">
      <div className="rounded-2xl flex items-center px-1"
        style={{ background: "rgba(30,21,17,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(249,246,244,0.06)", boxShadow: "0 -4px 32px -8px rgba(123,51,70,0.12)" }}>
        {tabs.slice(0, 2).map((tab) => { const Icon = tab.icon; const a = active === tab.id; return (
          <div key={tab.id} className="flex flex-col items-center justify-center flex-1 py-2.5 gap-0.5">
            <Icon size={16} style={{ color: a ? "#9C4B61" : "#A39B95" }} />
            <span className="font-body" style={{ fontSize: "8px", color: a ? "#9C4B61" : "#A39B95" }}>{tab.label}</span>
          </div>
        ); })}
        <div className="flex-1 flex items-center justify-center -my-4">
          <div className="rounded-full flex items-center justify-center" style={{ width: "40px", height: "40px", background: "#7B3346", boxShadow: "0 0 16px rgba(123,51,70,0.4)" }}>
            <img src="/icon/CorkiLogo.svg" alt="Corki" style={{ width: "24px", height: "24px" }} />
          </div>
        </div>
        {tabs.slice(2).map((tab) => { const Icon = tab.icon; const a = active === tab.id; return (
          <div key={tab.id} className="flex flex-col items-center justify-center flex-1 py-2.5 gap-0.5">
            <Icon size={16} style={{ color: a ? "#9C4B61" : "#A39B95" }} />
            <span className="font-body" style={{ fontSize: "8px", color: a ? "#9C4B61" : "#A39B95" }}>{tab.label}</span>
          </div>
        ); })}
      </div>
    </div>
  );
}

export function FeaturePalate() {
  return (
    <section id="feature-palate" className="relative section-padding" style={{ background: "#1E1511" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex justify-center lg:justify-start order-last lg:order-first">
            <PhoneMockup><PalateMockup /></PhoneMockup>
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FeatureBadge variant="pro" icon={<Fingerprint size={14} />}>Palate</FeatureBadge>
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Corki learns<br />what you like.
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
              <p>No quizzes. No flavour wheels. Just drink what you drink, and Corki picks up the rest.</p>
              <p>Over time they build a picture of your taste. The grapes you reach for, the regions you come back to, the styles that click. Every recommendation gets a little sharper.</p>
            </motion.div>
            <motion.ul custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3 mt-2">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: "32px", height: "32px", background: "rgba(194,123,46,0.1)", border: "1px solid rgba(194,123,46,0.2)", color: "#C27B2E" }}>
                    {bullet.icon}
                  </span>
                  <span className="font-body text-sm text-smoke">{bullet.text}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
