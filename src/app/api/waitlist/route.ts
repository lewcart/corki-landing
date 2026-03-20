import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS waitlist_signups (
    id        SERIAL PRIMARY KEY,
    email     TEXT NOT NULL UNIQUE,
    source    TEXT,
    referrer  TEXT,
    signed_up TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`;

// POST /api/waitlist — public email capture
export async function POST(req: NextRequest) {
  let email: string;
  let source: string | undefined;
  let referrer: string | undefined;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
    source = body.source;
    referrer = body.referrer;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 422 });
  }

  try {
    const sql = getDb();
    await sql.query(CREATE_TABLE_SQL);

    await sql`
      INSERT INTO waitlist_signups (email, source, referrer)
      VALUES (${email}, ${source ?? null}, ${referrer ?? null})
      ON CONFLICT (email) DO NOTHING
    `;

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Waitlist signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// GET /api/waitlist — admin export (protected)
export async function GET(req: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || req.headers.get("x-admin-key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sql = getDb();
    await sql.query(CREATE_TABLE_SQL);

    const rows = await sql`
      SELECT id, email, source, referrer, signed_up
      FROM waitlist_signups
      ORDER BY signed_up DESC
    `;

    const format = req.nextUrl.searchParams.get("format");
    if (format === "csv") {
      const csv = [
        "id,email,source,referrer,signed_up",
        ...rows.map(
          (r) =>
            `${r.id},"${r.email}","${r.source ?? ""}","${r.referrer ?? ""}","${r.signed_up}"`
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
