import Link from "next/link";
import { WalletButtons } from "@/components/ui/wallet-buttons";

export const metadata = {
  title: "You're Confirmed — Corki",
  description: "Your spot on the Corki waitlist is confirmed.",
};

function isAppleConfigured(): boolean {
  return !!(
    process.env.APPLE_TEAM_ID &&
    process.env.APPLE_PASS_TYPE_ID &&
    process.env.APPLE_PASS_CERT &&
    process.env.APPLE_PASS_KEY &&
    process.env.APPLE_WWDR_CERT
  );
}

function isGoogleConfigured(): boolean {
  return !!(
    process.env.GOOGLE_ISSUER_ID &&
    process.env.GOOGLE_CLASS_ID &&
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  );
}

export default function WelcomePage() {
  const appleEnabled = isAppleConfigured();
  const googleEnabled = isGoogleConfigured();
  const walletsAvailable = appleEnabled || googleEnabled;

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

        {/* Wallet pass CTA — only shown when credentials are configured */}
        {walletsAvailable && (
          <div className="w-full flex flex-col items-center gap-4 pt-2">
            <div
              className="w-full h-px"
              style={{ background: "rgba(194,123,46,0.2)" }}
            />
            <p className="font-[family-name:var(--font-body)] text-smoke text-sm">
              Save a Corki promo pass to your Wallet while you wait
            </p>
            <WalletButtons appleEnabled={appleEnabled} googleEnabled={googleEnabled} />
          </div>
        )}

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
