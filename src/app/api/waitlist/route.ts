import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { buildConfirmationEmail } from "@/lib/email-template";

function getDb() {
  const url = process.env.STORAGE_DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS waitlist_signups (
    id                SERIAL PRIMARY KEY,
    email             TEXT NOT NULL UNIQUE,
    source            TEXT,
    referrer          TEXT,
    confirmed         BOOLEAN NOT NULL DEFAULT FALSE,
    confirm_token     TEXT,
    privacy_accepted  BOOLEAN NOT NULL DEFAULT FALSE,
    marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
    signed_up         TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

const MIGRATE_SQL = `
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'waitlist_signups' AND column_name = 'confirmed'
    ) THEN
      ALTER TABLE waitlist_signups ADD COLUMN confirmed BOOLEAN NOT NULL DEFAULT FALSE;
      ALTER TABLE waitlist_signups ADD COLUMN confirm_token TEXT;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'waitlist_signups' AND column_name = 'privacy_accepted'
    ) THEN
      ALTER TABLE waitlist_signups ADD COLUMN privacy_accepted BOOLEAN NOT NULL DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'waitlist_signups' AND column_name = 'marketing_consent'
    ) THEN
      ALTER TABLE waitlist_signups ADD COLUMN marketing_consent BOOLEAN NOT NULL DEFAULT FALSE;
    END IF;
  END $$;
`;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://corki.app";
}

// POST /api/waitlist — public email capture
export async function POST(req: NextRequest) {
  let email: string;
  let source: string | undefined;
  let referrer: string | undefined;
  let privacyAccepted: boolean;
  let marketingConsent: boolean;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    source = body.source;
    referrer = body.referrer;
    privacyAccepted = body.privacyAccepted === true;
    marketingConsent = body.marketingConsent === true;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 422 });
  }

  // Privacy policy acceptance is required
  if (!privacyAccepted) {
    return NextResponse.json({ error: "You must accept the Privacy Policy to join the waitlist." }, { status: 422 });
  }

  try {
    const sql = getDb();
    await sql.query(CREATE_TABLE_SQL);
    await sql.query(MIGRATE_SQL);

    const token = crypto.randomUUID();

    // Check if already signed up
    const existing = await sql`
      SELECT confirmed FROM waitlist_signups WHERE email = ${email}
    `;

    if (existing.length > 0 && existing[0].confirmed) {
      // Already confirmed — silently succeed
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (existing.length > 0) {
      // Exists but unconfirmed — update token and resend
      await sql`
        UPDATE waitlist_signups
        SET confirm_token = ${token},
            privacy_accepted = ${privacyAccepted},
            marketing_consent = ${marketingConsent}
        WHERE email = ${email}
      `;
    } else {
      // New signup
      await sql`
        INSERT INTO waitlist_signups (email, source, referrer, confirm_token, privacy_accepted, marketing_consent)
        VALUES (${email}, ${source ?? null}, ${referrer ?? null}, ${token}, ${privacyAccepted}, ${marketingConsent})
      `;
    }

    // Send confirmation email
    const confirmUrl = `${getBaseUrl()}/api/confirm?token=${token}`;
    const resend = getResend();
    await resend.emails.send({
      from: "Corki <noreply@corki.app>",
      to: email,
      subject: "Confirm your spot on the Corki waitlist",
      html: buildConfirmationEmail(confirmUrl, getBaseUrl()),
      text: `Confirm your spot on the Corki waitlist!\n\nClick the link below to confirm your email:\n${confirmUrl}\n\nIf you didn't sign up, you can ignore this email.`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Waitlist signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// GET /api/waitlist — admin export (protected)
export async function GET(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  const providedKey = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key");
  if (!secret || providedKey !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getDb();
    await sql.query(CREATE_TABLE_SQL);

    const rows = await sql`
      SELECT id, email, source, referrer, confirmed, privacy_accepted, marketing_consent, signed_up
      FROM waitlist_signups
      ORDER BY signed_up DESC
    `;

    const format = req.nextUrl.searchParams.get("format");
    if (format === "csv") {
      const csv = [
        "id,email,source,referrer,confirmed,privacy_accepted,marketing_consent,signed_up",
        ...rows.map(
          (r) =>
            `${r.id},"${r.email}","${r.source ?? ""}","${r.referrer ?? ""}",${r.confirmed},${r.privacy_accepted},${r.marketing_consent},"${r.signed_up}"`
        ),
      ].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="waitlist.csv"',
        },
      });
    }

    return NextResponse.json({ count: rows.length, signups: rows });
  } catch (err) {
    console.error("Waitlist export error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
