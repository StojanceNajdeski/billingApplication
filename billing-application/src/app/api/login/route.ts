import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  //  Finding User
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return NextResponse.json(
      { error: "Не постои таков корисник !" },
      { status: 401 }
    );
  }

  //   Checking password with bcrypt
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Погрешна лозинка !" }, { status: 401 });
  }
  //   Creating JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  //   Sending token as cookie or in body
  const response = NextResponse.json({
    message: "Успешна најава !",
    user: {
      id: user.id,
      username: user.username,
      password: user.password,
      role: user.role,
    },
  });
  response.cookies.set("token", token, { httpOnly: true, path: "/" });
  return response;
}
