"use client";

import { motion, type Variants } from "framer-motion";
import { Home, Calendar, Heart, MessageCircle } from "lucide-react";
import { FeatureBadge } from "@/components/ui/feature-badge";
import { PhoneMockup } from "@/components/ui/phone-mockup";

const bullets = [
  { icon: <Home size={16} />, text: "Log bottles from scan or by name" },
  { icon: <Calendar size={16} />, text: "Drink window tracking" },
  { icon: <Heart size={16} />, text: "Rate and remember favourites" },
  { icon: <MessageCircle size={16} />, text: "Ask Corki what to open tonight" },
];

const wineCards = [
  {
    name: "Penfolds Bin 389",
    vintage: "2021",
    region: "South Australia",
    type: "red",
    rating: 5,
  },
  {
    name: "Yalumba Viognier",
    vintage: "2023",
    region: "Eden Valley",
    type: "white",
    rating: 4,
  },
  {
    name: "Henschke Hill of Grace",
    vintage: "2018",
    region: "Eden Valley",
    type: "red",
    rating: 5,
  },
  {
    name: "Shaw & Smith M3",
    vintage: "2022",
    region: "Adelaide Hills",
    type: "white",
    rating: 4,
  },
  {
    name: "d'Arenberg Dead Arm",
    vintage: "2019",
    region: "McLaren Vale",
    type: "red",
    rating: 5,
  },
  {
    name: "Grosset Polish Hill",
    vintage: "2022",
    region: "Clare Valley",
    type: "white",
    rating: 4,
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

function CellarMockup() {
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
        <div>
          <p
            className="font-body"
            style={{ fontSize: "13px", fontWeight: 600, color: "#F9F6F4" }}
          >
            My Cellar
          </p>
          <p
            className="font-body"
            style={{ fontSize: "10px", color: "#A39B95" }}
          >
            {wineCards.length} bottles
          </p>
        </div>
        <div
          className="rounded-full px-2 py-1 font-body"
          style={{
            background: "rgba(194,123,46,0.12)",
            border: "1px solid rgba(194,123,46,0.25)",
            fontSize: "10px",
            color: "#C27B2E",
            fontWeight: 600,
          }}
        >
          + Add
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 p-3">
        {wineCards.map((wine, i) => (
          <div
            key={i}
            className="rounded-xl p-3 flex flex-col gap-1"
            style={{
              background:
                wine.type === "red"
                  ? "linear-gradient(135deg, rgba(123,51,70,0.25) 0%, rgba(92,31,51,0.15) 100%)"
                  : "linear-gradient(135deg, rgba(194,123,46,0.2) 0%, rgba(194,123,46,0.08) 100%)",
              border:
                wine.type === "red"
                  ? "1px solid rgba(123,51,70,0.25)"
                  : "1px solid rgba(194,123,46,0.2)",
            }}
          >
            {/* Dot indicator */}
            <div className="flex items-center justify-between">
              <div
                className="rounded-full"
                style={{
                  width: "8px",
                  height: "8px",
                  background: wine.type === "red" ? "#7B3346" : "#C27B2E",
                  opacity: 0.8,
                }}
              />
              <span
                className="font-body"
                style={{
                  fontSize: "9px",
                  color: wine.type === "red" ? "rgba(156,75,97,0.8)" : "rgba(194,123,46,0.8)",
                  fontWeight: 600,
                }}
              >
                {wine.vintage}
              </span>
            </div>

            {/* Wine name */}
            <p
              className="font-body"
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#F9F6F4",
                lineHeight: 1.3,
              }}
            >
              {wine.name}
            </p>

            {/* Region */}
            <p
              className="font-body"
              style={{ fontSize: "9px", color: "#A39B95", lineHeight: 1.2 }}
            >
              {wine.region}
            </p>

            {/* Rating dots */}
            <div className="flex items-center gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <div
                  key={j}
                  className="rounded-full"
                  style={{
                    width: "5px",
                    height: "5px",
                    background:
                      j < wine.rating
                        ? wine.type === "red"
                          ? "#7B3346"
                          : "#C27B2E"
                        : "rgba(163,155,149,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeatureCellar() {
  return (
    <section
      id="feature-cellar"
      className="relative section-padding"
      style={{ background: "#1E1511" }}
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
              <FeatureBadge variant="pro">Cellar</FeatureBadge>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Your wines,
              <br />
              organised.
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
                Every bottle you&rsquo;ve scanned, logged, and loved. All in one place.
                Track what you have, know what to drink next, and never forget
                a wine you&rsquo;d buy again.
              </p>
              <p>
                Add a cellar, a location, or a wine in seconds. Other apps make
                organisation feel like homework. Corki makes it effortless.
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
              <CellarMockup />
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
