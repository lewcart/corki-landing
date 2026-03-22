import { NextRequest, NextResponse } from "next/server";
import { PKPass } from "passkit-generator";
import fs from "fs";
import path from "path";
import crypto from "crypto";

function missingVars(): string[] {
  const required = [
    "APPLE_TEAM_ID",
    "APPLE_PASS_TYPE_ID",
    "APPLE_PASS_CERT",
    "APPLE_PASS_KEY",
    "APPLE_WWDR_CERT",
  ];
  return required.filter((v) => !process.env[v]);
}

function loadImage(filename: string): Buffer {
  const imgPath = path.join(process.cwd(), "public", "wallet", filename);
  return fs.readFileSync(imgPath);
}

export async function GET(req: NextRequest) {
  const missing = missingVars();
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Apple Wallet not configured", missing },
      { status: 503 }
    );
  }

  try {
    const teamId = process.env.APPLE_TEAM_ID!;
    const passTypeId = process.env.APPLE_PASS_TYPE_ID!;
    const signerCert = Buffer.from(process.env.APPLE_PASS_CERT!, "base64");
    const signerKey = Buffer.from(process.env.APPLE_PASS_KEY!, "base64");
    const wwdr = Buffer.from(process.env.APPLE_WWDR_CERT!, "base64");
    const keyPassphrase = process.env.APPLE_PASS_KEY_PASSPHRASE;

    const serialNumber = crypto.randomUUID();

    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: passTypeId,
      teamIdentifier: teamId,
      serialNumber,
      organizationName: "Corki",
      description: "Corki Promo Pass — First Month Free",
      logoText: "Corki",
      foregroundColor: "rgb(249, 246, 244)",
      backgroundColor: "rgb(18, 13, 10)",
      labelColor: "rgb(212, 148, 74)",
      coupon: {},
      barcode: {
        message: "https://getcorki.com",
        format: "PKBarcodeFormatQR",
        messageEncoding: "iso-8859-1",
        altText: "getcorki.com",
      },
    };

    const pass = new PKPass(
      {
        "pass.json": Buffer.from(JSON.stringify(passJson)),
        "icon.png": loadImage("icon.png"),
        "icon@2x.png": loadImage("icon@2x.png"),
        "icon@3x.png": loadImage("icon@3x.png"),
        "logo.png": loadImage("logo.png"),
        "logo@2x.png": loadImage("logo@2x.png"),
        "strip.png": loadImage("strip.png"),
        "strip@2x.png": loadImage("strip@2x.png"),
      },
      {
        wwdr,
        signerCert,
        signerKey,
        ...(keyPassphrase ? { signerKeyPassphrase: keyPassphrase } : {}),
      }
    );

    pass.type = "coupon";

    pass.primaryFields.push({
      key: "offer",
      label: "OFFER",
      value: "First Month Free",
    });

    pass.secondaryFields.push({
      key: "code",
      label: "PROMO CODE",
      value: process.env.PROMO_CODE ?? "CORKIFRIEND",
    });

    pass.backFields.push(
      {
        key: "description",
        label: "ABOUT CORKI",
        value:
          "Your AI wine companion. Ask anything about wine, scan any label, manage your cellar. Download on the App Store.",
      },
      {
        key: "website",
        label: "WEBSITE",
        value: "https://getcorki.com",
      }
    );

    const buffer = await pass.getAsBuffer();
    // Copy into a fresh ArrayBuffer so Response accepts it (avoids Buffer<ArrayBufferLike> mismatch)
    const arrayBuffer = buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="corki.pkpass"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (err) {
    console.error("Apple Wallet pass generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate pass" },
      { status: 500 }
    );
  }
}
