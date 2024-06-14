import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("access_token", "", {
    httpOnly: true,
    maxAge: -1,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ success: true });
}
