import Link from "next/link";

export const metadata = {
  title: "You're Confirmed — Corki",
  description: "Your spot on the Corki waitlist is confirmed.",
};

export default function WelcomePage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-base px-6">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(212,148,74,0.2) 0%, rgba(194,123,46,0.1) 100%)",
            border: "1px solid rgba(194,123,46,0.3)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4944A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-3xl text-cream">
          You&apos;re confirmed!
        </h1>

        <p className="text-smoke font-[family-name:var(--font-body)] text-lg leading-relaxed">
          Your spot on the Corki waitlist is locked in.
          <br />
          We&apos;ll let you know the moment Corki is ready.
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-[family-name:var(--font-body)] font-semibold text-sm text-[#120D0A] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0"
          style={{
            background: "linear-gradient(135deg, #D4944A 0%, #C27B2E 100%)",
            boxShadow: "0 4px 24px rgba(194,123,46,0.4), 0 1px 0 rgba(255,255,255,0.12) inset",
          }}
        >
          Back to Corki
        </Link>
      </div>
    </main>
  );
}
