import { Metadata } from "next";
import QRCode from "qrcode";
import { WalletButtons } from "@/components/ui/wallet-buttons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Save to Wallet — Corki",
  description:
    "Save your Corki promo pass to Apple Wallet or Google Wallet and get your first month free.",
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

export default async function PassPage() {
  const appleEnabled = isAppleConfigured();
  const googleEnabled = isGoogleConfigured();

  // Generate QR code (shown only on desktop, but generate server-side)
  const qrDataUrl = await QRCode.toDataURL("https://getcorki.com/pass", {
    width: 180,
    margin: 2,
    color: {
      dark: "#F9F6F4",
      light: "#1E1511",
    },
  });

  const promoCode = process.env.PROMO_CODE ?? "CORKIFRIEND";
  const walletsAvailable = appleEnabled || googleEnabled;

  return (
    <main className="min-h-dvh flex items-center justify-center bg-dark-base px-6 py-16">
      <div className="max-w-sm w-full flex flex-col items-center gap-8 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/CorkiLogo72White.png"
            alt="Corki"
            width={56}
            height={56}
            className="rounded-xl"
          />
          <p
            className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#D4944A" }}
          >
            Your AI Wine Companion
          </p>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-cream leading-tight">
            Save your promo pass
          </h1>
          <p className="font-[family-name:var(--font-body)] text-smoke text-base leading-relaxed">
            Tap below to add a Corki pass to your wallet — your discount code lives right on your phone.
          </p>
        </div>

        {/* Promo code callout */}
        <div
          className="w-full rounded-2xl px-6 py-4"
          style={{
            background: "rgba(212,148,74,0.08)",
            border: "1px solid rgba(212,148,74,0.25)",
          }}
        >
          <p
            className="font-[family-name:var(--font-body)] text-xs font-semibold tracking-[0.15em] uppercase mb-1"
            style={{ color: "#D4944A" }}
          >
            Promo Code
          </p>
          <p className="font-[family-name:var(--font-heading)] text-2xl text-cream tracking-widest">
            {promoCode}
          </p>
          <p className="font-[family-name:var(--font-body)] text-smoke text-sm mt-1">
            First month free
          </p>
        </div>

        {/* Wallet buttons — client component with platform detection */}
        {walletsAvailable ? (
          <WalletButtons appleEnabled={appleEnabled} googleEnabled={googleEnabled} />
        ) : (
          <p className="font-[family-name:var(--font-body)] text-smoke text-sm">
            Wallet passes coming soon!
          </p>
        )}

        {/* QR code — shown only on desktop via CSS (always rendered server-side) */}
        {walletsAvailable && (
          <div className="hidden md:flex flex-col items-center gap-3">
            <p className="font-[family-name:var(--font-body)] text-smoke text-sm">
              Scan with your phone to save to Wallet
            </p>
            <div
              className="rounded-2xl p-3"
              style={{ background: "#1E1511", border: "1px solid rgba(194,123,46,0.2)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="QR code — scan to save Corki pass to Wallet"
                width={180}
                height={180}
                className="rounded-xl"
              />
            </div>
          </div>
        )}

        {/* App store fallback */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-[family-name:var(--font-body)] text-smoke text-sm">
            Or download the app directly
          </p>
          <Link
            href="https://apps.apple.com/app/corki"
            className="font-[family-name:var(--font-body)] text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ color: "#D4944A" }}
          >
            Download on the App Store →
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="font-[family-name:var(--font-body)] text-warm-gray text-sm hover:text-smoke transition-colors"
        >
          ← Back to Corki
        </Link>
      </div>
    </main>
  );
}
