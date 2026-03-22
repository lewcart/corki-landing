"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Camera, ScanLine, Wine, MessageCircle, Plus, MapPin, Save, Utensils, Grape } from "lucide-react";
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

const PRESET_MESSAGE = "Great, can you add this to my wine fridge on the top shelf?";

/* ── Thinking indicator ─────────────────────────────────────────── */
function ThinkingIndicator({ dark }: { dark?: boolean }) {
  const icons = [Wine, Grape, MessageCircle];
  const [iconIdx, setIconIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIconIdx((i) => (i + 1) % icons.length), 650);
    return () => clearInterval(t);
  }, [icons.length]);
  const Icon = icons[iconIdx];
  return (
    <div className="flex justify-start">
      <div
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body animate-pulse"
        style={{
          fontSize: "10px",
          background: dark ? "rgba(249,246,244,0.05)" : "rgba(0,0,0,0.04)",
          border: dark ? "1px solid rgba(249,246,244,0.08)" : "1px solid rgba(0,0,0,0.06)",
          color: dark ? "#A39B95" : "#7E6E70",
        }}
      >
        <Icon size={11} />
        Corki is replying...
      </div>
    </div>
  );
}

function ScanConversationMockup() {
  const [phase, setPhase] = useState<"idle" | "typing" | "sent" | "thinking" | "responded">("idle");
  const [typedLen, setTypedLen] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

  // Auto-advance from sent → thinking → responded
  useEffect(() => {
    if (phase === "sent") {
      const t = setTimeout(() => { setPhase("thinking"); scrollToBottom(); }, 300);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => { setPhase("responded"); scrollToBottom(); }, 2000);
      return () => clearTimeout(t);
    }
  }, [phase, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (phase === "sent" || phase === "thinking" || phase === "responded") return;
    if (e.key === "Enter" && typedLen > 0) {
      setPhase("sent");
      scrollToBottom();
      return;
    }
    if (e.key.length === 1) {
      const next = typedLen + 1;
      setTypedLen(next);
      setPhase("typing");
      if (next >= PRESET_MESSAGE.length) {
        setPhase("sent");
        scrollToBottom();
      }
    }
  };

  const handleFocus = () => {
    if (phase === "idle") {
      scrollToBottom();
    }
  };

  const showUserMsg = phase === "sent" || phase === "thinking" || phase === "responded";

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
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: "28px", height: "28px", background: "rgba(249,246,244,0.08)" }}
        >
          <ArrowLeft size={14} style={{ color: "#A39B95" }} />
        </div>
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: "28px", height: "28px", background: "rgba(123,51,70,0.15)" }}
        >
          <ScanLine size={13} style={{ color: "#9C4B61" }} />
        </div>
        <div className="min-w-0">
          <p className="font-body truncate" style={{ fontSize: "11px", fontWeight: 600, color: "#F9F6F4" }}>
            Château Margaux 2015
          </p>
          <p className="font-body truncate" style={{ fontSize: "9px", color: "#A39B95" }}>
            Label scan · Red, Bordeaux
          </p>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4">
          {/* User message with wine label photo */}
          <div className="flex justify-end">
            <div
              className="max-w-[78%] rounded-2xl rounded-br-sm overflow-hidden"
              style={{ background: "rgba(30,21,17,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
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
            <div className="max-w-[85%] text-sm leading-relaxed font-body" style={{ color: "#F9F6F4" }}>
              <p style={{ fontSize: "11px", lineHeight: 1.6 }}>
                That&apos;s a <span style={{ fontWeight: 600 }}>Château Margaux 2015</span> — one of Bordeaux&apos;s finest. Elegant and powerful with incredible depth. The 2015 vintage is drinking beautifully right now.
              </p>
            </div>
          </div>

          {/* Wine Detail Card */}
          <div
            className="rounded-xl overflow-hidden flex"
            style={{ border: "1px solid rgba(123,51,70,0.3)", background: "rgba(249,246,244,0.03)" }}
          >
            <div className="flex-shrink-0" style={{ width: "3px", background: "#7B3346" }} />
            <div className="flex-1 p-3 flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <div
                  className="flex-shrink-0 rounded-lg flex items-center justify-center"
                  style={{ width: "28px", height: "28px", background: "rgba(123,51,70,0.15)" }}
                >
                  <Wine size={14} style={{ color: "#9C4B61" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading" style={{ fontSize: "12px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.2 }}>
                    Château Margaux
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-body" style={{ fontSize: "10px", color: "#A39B95" }}>2015</span>
                    <span className="font-body rounded-full px-1.5 py-0.5" style={{ fontSize: "8px", fontWeight: 600, background: "rgba(123,51,70,0.15)", color: "#9C4B61" }}>Red</span>
                  </div>
                  <p className="font-body mt-0.5" style={{ fontSize: "9px", color: "#A39B95" }}>Margaux, Bordeaux</p>
                </div>
              </div>
              <div className="rounded-lg px-2 py-1.5 font-body" style={{ fontSize: "10px", lineHeight: 1.5, color: "rgba(249,246,244,0.7)", background: "rgba(249,246,244,0.03)", border: "1px solid rgba(249,246,244,0.05)" }}>
                Blackcurrant, violet, and graphite on the nose. Silky tannins with extraordinary length and precision.
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1.5">
                  <Utensils size={9} style={{ color: "#A39B95" }} />
                  <span className="font-body" style={{ fontSize: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#A39B95" }}>Pairs with</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {["Rack of lamb", "Filet mignon", "Aged Comté"].map((item) => (
                    <span key={item} className="font-body rounded-full" style={{ fontSize: "9px", padding: "2px 7px", background: "rgba(249,246,244,0.05)", border: "1px solid rgba(249,246,244,0.08)", color: "rgba(249,246,244,0.7)", fontWeight: 500 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pre-existing Q&A: cooking suggestion */}
          <div className="flex justify-end">
            <div
              className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
              style={{ background: "rgba(30,21,17,0.9)", border: "1px solid rgba(255,255,255,0.08)", color: "#A39B95", fontSize: "11px", lineHeight: 1.5 }}
            >
              What should I cook when I open this?
            </div>
          </div>
          <div className="flex justify-start">
            <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: "#F9F6F4" }}>
              For a wine this special, keep it simple but elegant. A <span style={{ fontWeight: 600 }}>herb-crusted rack of lamb</span> with a red wine jus would be perfect — or a <span style={{ fontWeight: 600 }}>pan-seared duck breast</span> with a cherry reduction. Let the wine be the star.
            </div>
          </div>

          {/* ── Interactive messages (appear after typing) ──────────── */}
          {showUserMsg && (
            <div className="flex justify-end">
              <div
                className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body"
                style={{ background: "rgba(30,21,17,0.9)", border: "1px solid rgba(255,255,255,0.08)", color: "#A39B95", fontSize: "11px", lineHeight: 1.5 }}
              >
                {PRESET_MESSAGE}
              </div>
            </div>
          )}

          {phase === "thinking" && <ThinkingIndicator dark />}

          {phase === "responded" && (
            <>
              <div className="flex justify-start">
                <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: "#F9F6F4" }}>
                  Done! I&apos;ve placed it on the top shelf of your wine fridge.
                </div>
              </div>

              {/* DataChangeCard — added-single */}
              <div
                className="rounded-xl overflow-hidden flex"
                style={{ border: "1px solid rgba(249,246,244,0.08)", background: "rgba(45,148,86,0.05)" }}
              >
                <div className="flex-shrink-0" style={{ width: "3px", background: "hsl(142,50%,40%)" }} />
                <div className="flex-1 p-3 flex flex-col gap-2.5">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "28px", height: "28px", background: "rgba(45,148,86,0.2)" }}>
                      <Plus size={14} style={{ color: "hsl(142,50%,40%)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body" style={{ fontSize: "12px", fontWeight: 600, color: "#F9F6F4", lineHeight: 1.2 }}>Added to cellar</p>
                      <p className="font-body mt-0.5" style={{ fontSize: "10px", color: "#A39B95" }}>Château Margaux 2015</p>
                    </div>
                  </div>
                  <div className="rounded-lg px-2.5 py-1.5 flex items-center justify-between" style={{ background: "rgba(249,246,244,0.04)", border: "1px solid rgba(249,246,244,0.05)" }}>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={9} style={{ color: "#C27B2E" }} />
                      <span className="font-body" style={{ fontSize: "10px", color: "rgba(249,246,244,0.8)" }}>Wine Fridge → Top Shelf</span>
                    </div>
                    <span className="font-body" style={{ fontSize: "9px", color: "#A39B95" }}>1 bottle</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="font-body rounded-lg px-3 py-1.5" style={{ fontSize: "10px", fontWeight: 500, background: "#7B3346", color: "#F9F6F4", border: "none", cursor: "pointer" }}>View bottle</button>
                    <button className="font-body rounded-lg px-3 py-1.5" style={{ fontSize: "10px", fontWeight: 500, background: "transparent", color: "hsl(0,65%,50%)", border: "1px solid hsla(0,65%,50%,0.3)", cursor: "pointer" }}>Undo</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Input bar — fixed at bottom */}
      <div
        className="flex-shrink-0 px-3 pb-4 pt-2"
        style={{ borderTop: "1px solid rgba(249,246,244,0.06)", background: "#0D0906" }}
      >
        <div
          className="flex items-center gap-2 rounded-full px-3 py-2"
          style={{ background: "rgba(249,246,244,0.05)", border: "1px solid rgba(249,246,244,0.08)" }}
        >
          <input
            ref={inputRef}
            type="text"
            readOnly
            value={phase === "typing" ? PRESET_MESSAGE.slice(0, typedLen) : ""}
            placeholder={showUserMsg ? "Ask Corki anything..." : "Ask Corki anything..."}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            disabled={showUserMsg}
            className="font-body flex-1 bg-transparent outline-none"
            style={{
              fontSize: "10px",
              color: phase === "typing" ? "#F9F6F4" : "#A39B95",
              caretColor: "#9C4B61",
            }}
          />
          <div
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{ width: "22px", height: "22px", background: typedLen > 0 && !showUserMsg ? "#7B3346" : "rgba(123,51,70,0.3)" }}
          >
            <MessageCircle size={10} style={{ color: typedLen > 0 && !showUserMsg ? "#F9F6F4" : "#9C4B61" }} />
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

          <div className="flex flex-col gap-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FeatureBadge variant="pro">Scan</FeatureBadge>
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Point. Scan. Know.
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
              <p>Standing in the bottle shop, staring at a label you don&rsquo;t recognise? Scan it. Corki tells you exactly what you&rsquo;re holding: the grape, the region, what it pairs with, and whether you&rsquo;ll like it.</p>
              <p>In plain English. Not wine-critic jargon.</p>
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
