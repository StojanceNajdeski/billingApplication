import pool from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { tableId, billData, totalAmount, waiterUsername } = await req.json();

    const result = await pool.query(
      `INSERT INTO bills (table_id, bill_data, total_amount, waiter_username)
 VALUES ($1, $2, $3, $4) RETURNING *;`,
      [tableId, JSON.stringify(billData), totalAmount, waiterUsername]
    );

    return NextResponse.json(
      {
        message: "Сметката е успешно затворена.",
        bill: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Грешка при зачувување на сметката:", error);
    return NextResponse.json(
      { error: "Грешка при зачувување на сметката." },
      { status: 500 }
    );
  }
}
