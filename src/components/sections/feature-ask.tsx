"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, Wine, MapPin, MessageCircle, Trash2, Grape, Fingerprint, Star } from "lucide-react";
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

const PRESET_MESSAGE = "Wow that was really great. 100 pt wine to me";

/* ── Thinking indicator (light mode) ────────────────────────────── */
function ThinkingIndicator() {
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
          background: "rgba(0,0,0,0.04)",
          border: "1px solid rgba(0,0,0,0.06)",
          color: LM.mutedFg,
        }}
      >
        <Icon size={11} />
        Corki is replying...
      </div>
    </div>
  );
}

/* ── Wine suggestion card (light mode) ──────────────────────────── */
function WineSuggestionCard({
  name, year, type, region, cellarName, zone, slot, pairings,
}: {
  name: string; year: number; type: "Red" | "White" | "Rosé"; region: string;
  cellarName: string; zone: string; slot: string; pairings: string[];
}) {
  const typeColor = type === "Red"
    ? { bg: "rgba(123,51,70,0.1)", text: "#7B3346" }
    : type === "White"
      ? { bg: "rgba(194,123,46,0.1)", text: "#B06020" }
      : { bg: "rgba(200,100,130,0.1)", text: "hsl(340,45%,45%)" };
  const accentColor = type === "Red" ? LM.primary : type === "White" ? LM.accent : "hsl(340,50%,45%)";

  return (
    <div className="rounded-xl overflow-hidden flex" style={{ border: `1px solid ${LM.border}`, background: LM.card }}>
      <div className="flex-shrink-0" style={{ width: "3px", background: accentColor }} />
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "26px", height: "26px", background: typeColor.bg }}>
            <Wine size={13} style={{ color: typeColor.text }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg, lineHeight: 1.2 }}>{name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-body" style={{ fontSize: "9px", color: LM.mutedFg }}>{year}</span>
              <span className="font-body rounded-full px-1.5 py-0.5" style={{ fontSize: "7px", fontWeight: 600, background: typeColor.bg, color: typeColor.text }}>{type}</span>
              <span className="font-body" style={{ fontSize: "9px", color: LM.mutedFg }}>· {region}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg px-2 py-1.5 flex items-center gap-1.5" style={{ background: LM.bg, border: `1px solid ${LM.border}` }}>
          <MapPin size={10} style={{ color: LM.accent }} />
          <span className="font-body" style={{ fontSize: "9px", color: LM.mutedFg }}>{cellarName} → {zone} → {slot}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {pairings.map((p) => (
            <span key={p} className="font-body rounded-full" style={{ fontSize: "8px", padding: "2px 6px", background: LM.bg, border: `1px solid ${LM.border}`, color: LM.mutedFg, fontWeight: 500 }}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Light-mode DataChangeCard ──────────────────────────────────── */
function LightDataChangeCard({
  icon, iconBg, iconColor, accentColor, bgTint, title, summary, children,
}: {
  icon: React.ReactNode; iconBg: string; iconColor: string; accentColor: string; bgTint: string;
  title: string; summary: string; children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl overflow-hidden flex" style={{ border: `1px solid ${LM.border}`, background: bgTint }}>
      <div className="flex-shrink-0" style={{ width: "3px", background: accentColor }} />
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 rounded-lg flex items-center justify-center" style={{ width: "28px", height: "28px", background: iconBg }}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body" style={{ fontSize: "12px", fontWeight: 600, color: LM.fg, lineHeight: 1.2 }}>{title}</p>
            <p className="font-body mt-0.5" style={{ fontSize: "10px", color: LM.mutedFg }}>{summary}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function AskConversationMockup() {
  const [phase, setPhase] = useState<"idle" | "typing" | "sent" | "thinking" | "responded">("idle");
  const [typedLen, setTypedLen] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 50);
  }, []);

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
    if (phase === "idle") scrollToBottom();
  };

  const showUserMsg = phase === "sent" || phase === "thinking" || phase === "responded";

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: LM.bg, paddingTop: "48px" }}>
      {/* Chat header */}
      <div
        className="flex-shrink-0 flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: `1px solid ${LM.border}`, background: "hsla(30,25%,96%,0.8)", backdropFilter: "blur(12px)" }}
      >
        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "28px", height: "28px", background: LM.secondary }}>
          <ArrowLeft size={14} style={{ color: LM.fg }} />
        </div>
        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: "28px", height: "28px", background: LM.muted }}>
          <MessageCircle size={13} style={{ color: LM.mutedFg }} />
        </div>
        <div className="min-w-0">
          <p className="font-body truncate" style={{ fontSize: "11px", fontWeight: 600, color: LM.fg }}>Lamb dinner tonight</p>
          <p className="font-body truncate" style={{ fontSize: "9px", color: LM.mutedFg }}>Pairing recommendation</p>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col gap-3 p-4">
          {/* User: lamb question */}
          <div className="flex justify-end">
            <div className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body" style={{ background: LM.primary, color: LM.primaryFg, fontSize: "11px", lineHeight: 1.5 }}>
              I&apos;m making lamb tonight. What should I open?
            </div>
          </div>

          {/* Corki: suggestions */}
          <div className="flex justify-start">
            <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}>
              Lamb loves a wine with structure. You&apos;ve got two great options in your cellar:
            </div>
          </div>

          <WineSuggestionCard name="Opus One" year={2019} type="Red" region="Napa Valley" cellarName="Wine Fridge" zone="Top Shelf" slot="A3" pairings={["Lamb", "Beef", "Hard cheese"]} />

          <div className="flex justify-start">
            <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}>
              Or if you want to save the Opus One for a special occasion:
            </div>
          </div>

          <WineSuggestionCard name="Penfolds Grange" year={2018} type="Red" region="South Australia" cellarName="Wine Fridge" zone="Bottom Shelf" slot="B2" pairings={["Lamb", "Venison", "Rich stews"]} />

          {/* User: go with Grange */}
          <div className="flex justify-end">
            <div className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body" style={{ background: LM.primary, color: LM.primaryFg, fontSize: "11px", lineHeight: 1.5 }}>
              Go with the Grange. How long should I decant it?
            </div>
          </div>

          {/* Corki: decanting advice */}
          <div className="flex justify-start">
            <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}>
              Great pick. Give the Grange a good <span style={{ fontWeight: 600 }}>60–90 minutes</span> in a decanter — it&apos;ll open up beautifully. The tannins will soften and you&apos;ll get more of those dark fruit and spice notes with the lamb. Enjoy tonight!
            </div>
          </div>

          {/* ── Interactive messages (appear after typing) ──────── */}
          {showUserMsg && (
            <div className="flex justify-end">
              <div className="max-w-[78%] px-3 py-2.5 rounded-2xl rounded-br-sm font-body" style={{ background: LM.primary, color: LM.primaryFg, fontSize: "11px", lineHeight: 1.5 }}>
                {PRESET_MESSAGE}
              </div>
            </div>
          )}

          {phase === "thinking" && <ThinkingIndicator />}

          {phase === "responded" && (
            <>
              <div className="flex justify-start">
                <div className="max-w-[85%] font-body" style={{ fontSize: "11px", lineHeight: 1.6, color: LM.fg }}>
                  What a night! I&apos;ll get your cellar updated — removing it, marking it as drunk, and saving your score.
                </div>
              </div>

              {/* Card: Removed from cellar */}
              <LightDataChangeCard
                icon={<Trash2 size={14} style={{ color: "hsl(0,65%,50%)" }} />}
                iconBg="rgba(220,50,50,0.1)"
                iconColor="hsl(0,65%,50%)"
                accentColor="hsl(0,65%,50%)"
                bgTint="rgba(220,50,50,0.03)"
                title="Removed from cellar"
                summary="Penfolds Grange 2018 · Wine Fridge → B2"
              />

              {/* Card: Score saved */}
              <LightDataChangeCard
                icon={<Star size={14} style={{ color: LM.accent }} />}
                iconBg="rgba(194,123,46,0.1)"
                iconColor={LM.accent}
                accentColor={LM.accent}
                bgTint="rgba(194,123,46,0.03)"
                title="Score saved"
                summary="Penfolds Grange 2018 — 100 pts"
              />

              {/* Card: Preference learned */}
              <LightDataChangeCard
                icon={<Fingerprint size={14} style={{ color: "hsl(280,45%,50%)" }} />}
                iconBg="rgba(140,80,180,0.1)"
                iconColor="hsl(280,45%,50%)"
                accentColor="hsl(280,45%,50%)"
                bgTint="rgba(140,80,180,0.03)"
                title="Preference learned"
                summary="Loves full-bodied Shiraz from South Australia"
              />
            </>
          )}
        </div>
      </div>

      {/* Input bar */}
      <div className="flex-shrink-0 px-3 pb-4 pt-2" style={{ borderTop: `1px solid ${LM.border}`, background: LM.bg }}>
        <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ background: LM.card, border: `1px solid ${LM.border}` }}>
          <input
            type="text"
            readOnly
            value={phase === "typing" ? PRESET_MESSAGE.slice(0, typedLen) : ""}
            placeholder="Ask Corki anything..."
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            disabled={showUserMsg}
            className="font-body flex-1 bg-transparent outline-none"
            style={{
              fontSize: "10px",
              color: phase === "typing" ? LM.fg : LM.mutedFg,
              caretColor: LM.primary,
            }}
          />
          <div
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{ width: "22px", height: "22px", background: typedLen > 0 && !showUserMsg ? LM.primary : LM.muted }}
          >
            <MessageCircle size={10} style={{ color: typedLen > 0 && !showUserMsg ? LM.primaryFg : LM.mutedFg }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureAsk() {
  return (
    <section id="feature-ask" className="relative section-padding" style={{ background: "#F9F6F4" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div className="flex flex-col gap-6">
            <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FeatureBadge>Chat</FeatureBadge>
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ color: "#120D0A" }}>
              The wine app<br />that talks back.
            </motion.h2>
            <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-3">
              <p style={{ color: "#6B6460" }}>Not a score. Not a search result. A conversation.</p>
              <p style={{ color: "#6B6460" }}>
                Ask Corki what to bring to a dinner party. Ask why that Barossa Shiraz tastes
                like this. Ask what the difference is between Pinot Noir and Pinot Gris.
                No question is too basic. No question is too advanced.
              </p>
            </motion.div>
          </div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center lg:justify-end">
            <PhoneMockup>
              <AskConversationMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
