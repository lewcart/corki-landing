import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureBadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "pro";
  className?: string;
}

export function FeatureBadge({
  children,
  icon,
  variant = "default",
  className,
}: FeatureBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full ui-label",
        variant === "default" && [
          "bg-burgundy/15 text-burgundy-light border border-burgundy/20",
        ],
        variant === "pro" && [
          "border",
          "text-amber-light",
        ],
        className
      )}
      style={
        variant === "pro"
          ? {
              background: "rgba(194,123,46,0.12)",
              borderColor: "rgba(194,123,46,0.3)",
              boxShadow: "0 0 12px rgba(194,123,46,0.15)",
            }
          : undefined
      }
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
