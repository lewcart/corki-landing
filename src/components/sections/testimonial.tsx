"use client";

import { motion } from "framer-motion";
import { Orb } from "@/components/ui/orb";

export function Testimonial() {
  return (
    <section
      id="testimonial"
      className="relative overflow-hidden section-padding"
      style={{ backgroundColor: "#F0EBE6" }}
    >
      {/* Subtle warm texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(123,51,70,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto text-center">
        {/* Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Orb size="sm" />
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <p
            className="font-[family-name:var(--font-heading)]"
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              lineHeight: 1.22,
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "#120D0A",
            }}
          >
            &ldquo;It&apos;s like having a friend who knows
            everything about wine, and never
            makes you feel like you should already know.&rdquo;
          </p>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
            className="mt-8"
          >
            <cite
              className="not-italic font-[family-name:var(--font-body)] text-sm font-medium tracking-widest uppercase"
              style={{ color: "#A39B95", letterSpacing: "0.12em" }}
            >
              Early Corki user
            </cite>
          </motion.footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
