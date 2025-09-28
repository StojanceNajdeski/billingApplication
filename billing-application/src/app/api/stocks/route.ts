import pool from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const updates = await req.json();

    for (const item of updates) {
      await pool.query(
        `
    INSERT INTO stocks (unique_id, product_name, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (unique_id)
    DO UPDATE SET quantity = EXCLUDED.quantity
    `,
        [item.id, item.productName, item.quantity]
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Грешка при update:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
