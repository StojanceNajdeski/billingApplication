import { getUsers } from "@/app/lib/userService";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}
