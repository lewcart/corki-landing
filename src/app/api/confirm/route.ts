import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

function getDb() {
  const url = process.env.STORAGE_DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

// GET /api/confirm?token=xxx — confirm a waitlist email
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const sql = getDb();

    const rows = await sql`
      UPDATE waitlist_signups
      SET confirmed = TRUE, confirm_token = NULL
      WHERE confirm_token = ${token} AND confirmed = FALSE
      RETURNING email
    `;

    if (rows.length === 0) {
      // Token already used or invalid — redirect to welcome anyway
      // (they may have already confirmed)
      return NextResponse.redirect(new URL("/welcome", req.url));
    }

    return NextResponse.redirect(new URL("/welcome", req.url));
  } catch (err) {
    console.error("Confirmation error:", err);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
