import React from "react";

const items = [
  {
    id: 1,
    content: (
      <>
        <span aria-label="5 stars">⭐⭐⭐⭐⭐</span>
        <span className="ml-3 text-smoke">
          &ldquo;Finally, a wine app that actually talks back.&rdquo;
        </span>
      </>
    ),
  },
  {
    id: 2,
    content: (
      <>
        <span aria-hidden="true">📱</span>
        <span className="ml-2 text-smoke font-medium">iOS</span>
        <span className="ml-1.5 text-warm-gray">·</span>
        <span className="ml-1.5 text-smoke">Coming soon</span>
      </>
    ),
  },
  {
    id: 3,
    content: (
      <>
        <span className="text-smoke italic">
          &ldquo;It&rsquo;s like texting a wine friend&rdquo;
        </span>
        <span className="ml-2 text-warm-gray text-sm">Early user</span>
      </>
    ),
  },
  {
    id: 4,
    content: (
      <>
        <span aria-hidden="true">🔒</span>
        <span className="ml-2 text-smoke">No account required to start</span>
      </>
    ),
  },
  {
    id: 5,
    content: (
      <>
        <span className="text-smoke">
          <span className="text-amber font-semibold">$5.99</span>
          <span> / month</span>
        </span>
        <span className="ml-1.5 text-warm-gray">·</span>
        <span className="ml-1.5 text-smoke">Cancel anytime</span>
      </>
    ),
  },
];

function Divider() {
  return (
    <span
      aria-hidden="true"
      className="flex-shrink-0 w-px h-4 bg-[rgba(123,51,70,0.25)] mx-6 hidden sm:block"
    />
  );
}

function MarqueeDivider() {
  return (
    <span
      aria-hidden="true"
      className="flex-shrink-0 w-px h-3 bg-[rgba(123,51,70,0.3)] mx-5"
    />
  );
}

export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="relative bg-cream border-y border-[rgba(123,51,70,0.12)] py-5 overflow-hidden"
    >
      {/* Desktop: static row */}
      <div className="hidden md:flex items-center justify-center flex-wrap gap-y-3 px-8 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <React.Fragment key={item.id}>
            <div className="flex items-center text-sm font-[family-name:var(--font-body)] text-[#120D0A]">
              {item.content}
            </div>
            {i < items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: marquee */}
      <div className="md:hidden relative">
        {/* Fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10"
          style={{
            background:
              "linear-gradient(to right, #F9F6F4 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10"
          style={{
            background:
              "linear-gradient(to left, #F9F6F4 0%, transparent 100%)",
          }}
        />

        <div className="flex overflow-hidden">
          <div
            className="flex items-center flex-nowrap"
            style={{
              animation: "social-proof-marquee 28s linear infinite",
              willChange: "transform",
            }}
          >
            {/* Double the items so the loop is seamless */}
            {[...items, ...items].map((item, i) => (
              <React.Fragment key={`${item.id}-${i}`}>
                <div className="flex items-center text-sm font-[family-name:var(--font-body)] text-[#120D0A] whitespace-nowrap px-1">
                  {item.content}
                </div>
                <MarqueeDivider />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes social-proof-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
