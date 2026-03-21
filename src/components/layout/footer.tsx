"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const footerColumns = [
  {
    heading: null,
    brand: true,
    tagline: "Your wine friend. Ask anything about wine.",
  },
  {
    heading: "Features",
    links: [
      { label: "Scan", href: "#feature-scan" },
      { label: "Chat", href: "#feature-ask" },
      { label: "Cellar", href: "#feature-cellar" },
      { label: "Palate", href: "#feature-palate" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Age Restriction", href: "/age-restriction" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Instagram", href: "https://instagram.com/getcorki", external: true },
    ],
  },
];

interface FooterColumn {
  heading: string | null;
  brand?: boolean;
  tagline?: string;
  links?: { label: string; href: string; external?: boolean }[];
}

function FooterColumn({ col }: { col: FooterColumn }) {
  if (col.brand) {
    return (
      <div className="flex flex-col gap-4">
        <span
          className="font-heading text-2xl font-medium"
          style={{ color: "#F9F6F4" }}
        >
          Corki
        </span>
        {col.tagline && (
          <p
            className="text-sm font-body leading-relaxed max-w-[200px]"
            style={{ color: "#6B6460" }}
          >
            {col.tagline}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {col.heading && (
        <span className="ui-label" style={{ color: "#6B6460" }}>
          {col.heading}
        </span>
      )}
      {col.links && (
        <ul className="flex flex-col gap-2.5">
          {col.links.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  className="text-sm font-body transition-colors duration-200"
                  style={{ color: "#A39B95" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F9F6F4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#A39B95";
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm font-body transition-colors duration-200"
                  style={{ color: "#A39B95" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#F9F6F4";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#A39B95";
                  }}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn("w-full", className)}
      style={{ background: "#0D0906" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {footerColumns.map((col, index) => (
            <FooterColumn key={index} col={col as FooterColumn} />
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px mb-8"
          style={{ background: "rgba(123,51,70,0.15)" }}
        />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-xs font-body"
            style={{ color: "#6B6460" }}
          >
            © 2026 Corki. Made with wine.
          </p>
          <p
            className="text-xs font-body"
            style={{ color: "#6B6460" }}
          >
            Drink responsibly. Must be of legal drinking age.
          </p>
        </div>
      </div>
    </footer>
  );
}
