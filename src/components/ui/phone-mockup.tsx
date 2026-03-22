import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto",
        "w-[260px] h-[520px] sm:w-[300px] sm:h-[600px]",
        className
      )}
    >
      {/* Phone frame */}
      <div
        className="absolute inset-0 rounded-[3rem] border-[2.5px]"
        style={{
          borderColor: "#2A1F1A",
          background:
            "linear-gradient(145deg, #2A1F1A 0%, #1A1210 50%, #110D0B 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 30px 80px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Side buttons — volume up */}
        <div
          className="absolute rounded-r-sm"
          style={{
            left: "-4px",
            top: "22%",
            width: "3px",
            height: "32px",
            background: "linear-gradient(to right, #1A1210, #2A1F1A)",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Side buttons — volume down */}
        <div
          className="absolute rounded-r-sm"
          style={{
            left: "-4px",
            top: "32%",
            width: "3px",
            height: "32px",
            background: "linear-gradient(to right, #1A1210, #2A1F1A)",
            boxShadow: "-1px 0 2px rgba(0,0,0,0.5)",
          }}
        />
        {/* Side buttons — power */}
        <div
          className="absolute rounded-l-sm"
          style={{
            right: "-4px",
            top: "27%",
            width: "3px",
            height: "48px",
            background: "linear-gradient(to left, #1A1210, #2A1F1A)",
            boxShadow: "1px 0 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* Screen area */}
        <div
          className="absolute overflow-hidden rounded-[2.5rem]"
          style={{
            inset: "6px",
            background: "#0D0906",
          }}
        >
          {/* Dynamic island / notch */}
          <div
            className="absolute left-1/2 -translate-x-1/2 z-10"
            style={{
              top: "10px",
              width: "90px",
              height: "26px",
              background: "#0A0705",
              borderRadius: "13px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          />

          {/* Screen content */}
          <div className="absolute inset-0 overflow-hidden phone-screen">{children}</div>
        </div>

        {/* Frame edge highlights */}
        <div
          className="absolute inset-0 rounded-[3rem] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>
    </div>
  );
}
