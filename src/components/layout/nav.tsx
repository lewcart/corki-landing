"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-3"
            : "py-5"
        )}
        style={
          scrolled
            ? {
                background: "rgba(18,13,10,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(123,51,70,0.15)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }
            : undefined
        }
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          {/* Wordmark */}
          <a
            href="/"
            className="font-heading text-2xl font-medium text-cream tracking-tight hover:opacity-80 transition-opacity"
            style={{ color: "#F9F6F4" }}
          >
            Corki
          </a>

          {/* Desktop nav — always centred */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-body font-medium transition-colors duration-200"
                  style={{ color: "#A39B95" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F9F6F4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#A39B95";
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA + Mobile hamburger (shared right column) */}
          <div className="flex justify-end">
            <a
              href="#waitlist"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium font-body transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
                color: "#120D0A",
                boxShadow: "0 4px 16px rgba(194,123,46,0.3)",
              }}
            >
              Join the Waitlist
            </a>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
              style={{ color: "#A39B95" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "#1E1511",
                borderLeft: "1px solid rgba(123,51,70,0.2)",
                boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(123,51,70,0.15)" }}>
                <span className="font-heading text-2xl font-medium" style={{ color: "#F9F6F4" }}>
                  Corki
                </span>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{ color: "#A39B95" }}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3.5 rounded-xl text-base font-medium font-body transition-colors"
                    style={{ color: "#A39B95" }}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 + 0.1 }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#F9F6F4";
                      el.style.background = "rgba(123,51,70,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = "#A39B95";
                      el.style.background = "transparent";
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="px-6 py-6 border-t" style={{ borderColor: "rgba(123,51,70,0.15)" }}>
                <a
                  href="#waitlist"
                  className="block w-full text-center py-3.5 rounded-xl text-sm font-medium font-body transition-all"
                  style={{
                    background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
                    color: "#120D0A",
                    boxShadow: "0 4px 16px rgba(194,123,46,0.3)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  Join the Waitlist
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
