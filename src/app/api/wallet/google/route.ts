import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function missingVars(): string[] {
  const required = [
    "GOOGLE_ISSUER_ID",
    "GOOGLE_CLASS_ID",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_SERVICE_ACCOUNT_KEY",
  ];
  return required.filter((v) => !process.env[v]);
}

function base64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf.toString("base64url");
}

function signJwt(payload: object, privateKey: string): string {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(payload));
  const unsigned = `${header}.${body}`;
  const sig = crypto
    .sign("RSA-SHA256", Buffer.from(unsigned), privateKey)
    .toString("base64url");
  return `${unsigned}.${sig}`;
}

export async function GET(_req: NextRequest) {
  const missing = missingVars();
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Google Wallet not configured", missing },
      { status: 503 }
    );
  }

  try {
    const issuerId = process.env.GOOGLE_ISSUER_ID!;
    const classId = process.env.GOOGLE_CLASS_ID!;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
    const serviceAccountKey = Buffer.from(
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY!,
      "base64"
    ).toString("utf-8");

    // Parse the service account JSON key
    const keyJson = JSON.parse(serviceAccountKey);
    const privateKey: string = keyJson.private_key ?? serviceAccountKey;

    const objectId = `${issuerId}.corki-pass-${Date.now()}`;
    const promoCode = process.env.PROMO_CODE ?? "CORKIFRIEND";

    const genericObject = {
      id: objectId,
      classId: `${issuerId}.${classId}`,
      genericType: "GENERIC_TYPE_UNSPECIFIED",
      hexBackgroundColor: "#120D0A",
      logo: {
        sourceUri: {
          uri: "https://getcorki.com/CorkiLogo72White.png",
        },
        contentDescription: {
          defaultValue: { language: "en-US", value: "Corki logo" },
        },
      },
      cardTitle: {
        defaultValue: { language: "en-US", value: "Corki" },
      },
      subheader: {
        defaultValue: { language: "en-US", value: "OFFER" },
      },
      header: {
        defaultValue: { language: "en-US", value: "First Month Free" },
      },
      textModulesData: [
        {
          id: "promoCode",
          header: "PROMO CODE",
          body: promoCode,
        },
        {
          id: "about",
          header: "ABOUT CORKI",
          body: "Your AI wine companion. Ask anything about wine, scan any label, manage your cellar.",
        },
      ],
      linksModuleData: {
        uris: [
          {
            uri: "https://getcorki.com",
            description: "Visit Corki",
            id: "website",
          },
        ],
      },
      barcode: {
        type: "QR_CODE",
        value: "https://getcorki.com",
        alternateText: "getcorki.com",
      },
    };

    const now = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      iss: serviceAccountEmail,
      aud: "google",
      origins: ["https://getcorki.com"],
      iat: now,
      typ: "savetowallet",
      payload: {
        genericObjects: [genericObject],
      },
    };

    const token = signJwt(jwtPayload, privateKey);
    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    return NextResponse.redirect(saveUrl);
  } catch (err) {
    console.error("Google Wallet pass generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate Google Wallet pass" },
      { status: 500 }
    );
  }
}
