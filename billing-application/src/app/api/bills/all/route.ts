import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM bills ORDER BY created_at DESC;"
    );
    console.log("Добиени податоци:", rows);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Грешка при добивање на сметките:", error);
    return NextResponse.json(
      { error: "Грешка при добивање на сметките." },
      { status: 500 }
    );
  }
}
