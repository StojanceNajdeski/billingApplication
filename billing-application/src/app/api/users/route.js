import { NextResponse } from "next/server";
import {pool} from "../../lib/db"

export async function GET() {
    try{
        const {rows} = await pool.query(`SELECT * FROM users`);
        return NextResponse.json(rows)
    } catch (error) {
        console.error(`Error fetching users:`, error);
        return NextResponse.json({error: `Failed to fetch users`}, {status: 500})
    }
}