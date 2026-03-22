"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type OrbSize = "sm" | "md" | "lg" | "hero";

const sizeMap: Record<OrbSize, { container: string; orb: string }> = {
  sm: {
    container: "w-20 h-20",
    orb: "w-20 h-20",
  },
  md: {
    container: "w-40 h-40",
    orb: "w-40 h-40",
  },
  lg: {
    container: "w-[280px] h-[280px]",
    orb: "w-[280px] h-[280px]",
  },
  hero: {
    container: "w-[280px] h-[280px] md:w-[400px] md:h-[400px]",
    orb: "w-[280px] h-[280px] md:w-[400px] md:h-[400px]",
  },
};

interface OrbProps {
  size?: OrbSize;
  className?: string;
}

export function Orb({ size = "md", className }: OrbProps) {
  const sizes = sizeMap[size];

  return (
    <div className={cn("relative flex items-center justify-center", sizes.container, className)}>
      {/* Ambient glow behind orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(123,51,70,0.25) 0%, rgba(123,51,70,0.08) 50%, transparent 75%)",
          filter: "blur(24px)",
          transform: "scale(1.4)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Outer pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid rgba(123,51,70,0.35)",
          boxShadow: "0 0 20px rgba(123,51,70,0.15)",
        }}
        animate={{
          scale: [1.0, 1.08, 1.0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Hover wrapper — separated so on/off transition is buttery smooth */}
      <motion.div
        className={cn("relative rounded-full cursor-pointer", sizes.orb)}
        whileHover={{
          scale: 1.06,
          boxShadow:
            "0 0 70px rgba(123,51,70,0.65), 0 0 130px rgba(123,51,70,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
          mass: 0.8,
        }}
      >
      {/* Main orb body — pulse animation */}
      <motion.div
        className="relative w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, rgba(194,123,46,0.35) 0%, #7B3346 25%, #5C1F33 55%, #3A1020 80%, #1E0A14 100%)",
          boxShadow:
            "0 0 40px rgba(123,51,70,0.4), 0 0 80px rgba(123,51,70,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        animate={{
          scale: [1.0, 1.03, 1.0],
          boxShadow: [
            "0 0 40px rgba(123,51,70,0.4), 0 0 80px rgba(123,51,70,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
            "0 0 60px rgba(123,51,70,0.55), 0 0 120px rgba(123,51,70,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            "0 0 40px rgba(123,51,70,0.4), 0 0 80px rgba(123,51,70,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Inner amber/gold glow centre */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "20%",
            left: "22%",
            width: "38%",
            height: "38%",
            background:
              "radial-gradient(circle, rgba(212,148,74,0.65) 0%, rgba(194,123,46,0.3) 50%, transparent 80%)",
            filter: "blur(6px)",
          }}
          animate={{
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Corki logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          {/* Soft float (4s, out of phase with 3s orb pulse) */}
          <motion.div
            initial={{ x: "3%" }}
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="relative"
          >
            {/* Glow bloom */}
            <motion.div
              animate={{
                filter: [
                  "drop-shadow(0 0 4px rgba(255,255,255,0.15)) drop-shadow(0 0 10px rgba(255,255,255,0.05))",
                  "drop-shadow(0 0 9px rgba(255,255,255,0.35)) drop-shadow(0 0 20px rgba(255,255,255,0.12))",
                  "drop-shadow(0 0 4px rgba(255,255,255,0.15)) drop-shadow(0 0 10px rgba(255,255,255,0.05))",
                ],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="relative"
            >
              <Image
                src="/icon/CorkiLogo.svg"
                alt=""
                width={320}
                height={320}
                style={{ filter: "brightness(0) invert(1)" }}
                className={cn(
                  "select-none pointer-events-none",
                  size === "sm" && "w-[52px] h-[52px]",
                  size === "md" && "w-[104px] h-[104px]",
                  size === "lg" && "w-[182px] h-[182px]",
                  size === "hero" && "w-[182px] h-[182px] md:w-[259px] md:h-[259px]",
                )}
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Surface sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.07) 0%, transparent 55%)",
          }}
        />
      </motion.div>
      </motion.div>
    </div>
  );
}
