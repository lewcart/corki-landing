import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corki - Personalised Cellar Manager",
  description:
    "Ask anything about wine. Scan any label. Get a real answer.",
  metadataBase: new URL("https://getcorki.com"),
  openGraph: {
    title: "Corki - Personalised Cellar Manager",
    description:
      "Ask anything about wine. Scan any label. Get a real answer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corki - Personalised Cellar Manager",
    description:
      "Ask anything about wine. Scan any label. Get a real answer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} antialiased bg-dark-base`}
      >
        {children}
      </body>
    </html>
  );
}
