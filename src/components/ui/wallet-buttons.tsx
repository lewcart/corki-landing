"use client";

import { useState } from "react";

type Platform = "ios" | "android" | "desktop" | null;

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

interface WalletButtonsProps {
  /** Whether Apple Wallet API is configured (503 check done server-side) */
  appleEnabled: boolean;
  /** Whether Google Wallet API is configured (503 check done server-side) */
  googleEnabled: boolean;
}

export function WalletButtons({ appleEnabled, googleEnabled }: WalletButtonsProps) {
  const [platform] = useState<Platform>(() => {
    if (typeof window === "undefined") return null;
    return detectPlatform();
  });

  // Don't render until we know the platform (avoids flicker)
  if (platform === null) return null;
  if (!appleEnabled && !googleEnabled) return null;

  const showApple = appleEnabled && (platform === "ios" || platform === "desktop");
  const showGoogle = googleEnabled && (platform === "android" || platform === "desktop");

  if (!showApple && !showGoogle) return null;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {showApple && (
        <a
          href="/api/wallet/apple"
          className="block transition-opacity hover:opacity-80 active:opacity-60"
          aria-label="Add to Apple Wallet"
        >
          {/* Official Apple Wallet badge dimensions: 120×40 */}
          <img
            src="https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/downloads/add-to-apple-wallet-badge.svg"
            alt="Add to Apple Wallet"
            width={160}
            height={54}
            style={{ height: 54, width: "auto" }}
          />
        </a>
      )}

      {showGoogle && (
        <a
          href="/api/wallet/google"
          className="block transition-opacity hover:opacity-80 active:opacity-60"
          aria-label="Save to Google Wallet"
        >
          {/* Official Google Wallet badge */}
          <img
            src="https://wallet.google.com/intl/en_us/images/logos/googlepay/save-to-google-wallet-button-with-logo.svg"
            alt="Save to Google Wallet"
            width={220}
            height={54}
            style={{ height: 54, width: "auto" }}
          />
        </a>
      )}
    </div>
  );
}
