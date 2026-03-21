import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  billingNote?: string;
  features: PricingFeature[];
  highlighted?: boolean;
  ctaText: string;
  ctaHref?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  billingNote,
  features,
  highlighted = false,
  ctaText,
  ctaHref = "#",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1",
        className
      )}
      style={
        highlighted
          ? {
              background:
                "linear-gradient(160deg, rgba(30,21,17,0.95) 0%, rgba(18,13,10,0.98) 100%)",
              border: "1px solid rgba(194,123,46,0.35)",
              boxShadow:
                "0 0 0 1px rgba(194,123,46,0.1), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(194,123,46,0.08)",
            }
          : {
              background:
                "linear-gradient(160deg, rgba(30,21,17,0.6) 0%, rgba(18,13,10,0.7) 100%)",
              border: "1px solid rgba(123,51,70,0.2)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            }
      }
    >
      {highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full ui-label text-dark-base"
          style={{
            background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
            boxShadow: "0 4px 14px rgba(194,123,46,0.4)",
          }}
        >
          Best Value
        </div>
      )}

      {/* Plan name */}
      <div className="mb-1">
        <span className="ui-label text-smoke">{name}</span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-1.5 mb-1">
        <span
          className="font-heading text-4xl font-medium"
          style={{ color: highlighted ? "#D4944A" : "#F9F6F4" }}
        >
          {price}
        </span>
        {period && (
          <span className="text-smoke text-sm mb-1.5 font-body">{period}</span>
        )}
      </div>
      {billingNote && (
        <p className="text-xs font-body" style={{ color: "#6B6460" }}>
          {billingNote}
        </p>
      )}

      <div
        className="h-px my-5"
        style={{ background: "rgba(123,51,70,0.2)" }}
      />

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span
              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={
                feature.included
                  ? {
                      background: highlighted
                        ? "rgba(194,123,46,0.2)"
                        : "rgba(123,51,70,0.2)",
                    }
                  : {
                      background: "rgba(255,255,255,0.05)",
                    }
              }
            >
              {feature.included ? (
                <Check
                  className="w-2.5 h-2.5"
                  style={{ color: highlighted ? "#D4944A" : "#9C4B61" }}
                />
              ) : (
                <X className="w-2.5 h-2.5 text-warm-gray" />
              )}
            </span>
            <span
              className="text-sm font-body leading-snug"
              style={{
                color: feature.included ? "#A39B95" : "#6B6460",
              }}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={ctaHref}
        className={cn(
          "block w-full text-center py-3.5 rounded-xl text-sm font-medium font-body transition-all duration-200",
          "hover:opacity-90 active:scale-[0.98]"
        )}
        style={
          highlighted
            ? {
                background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
                color: "#120D0A",
                boxShadow: "0 4px 20px rgba(194,123,46,0.35)",
              }
            : {
                background: "rgba(123,51,70,0.25)",
                border: "1px solid rgba(123,51,70,0.3)",
                color: "#F9F6F4",
              }
        }
      >
        {ctaText}
      </a>
    </div>
  );
}
