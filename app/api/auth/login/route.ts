import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();
  const { access_token } = data;

  try {
    if (!access_token) {
      return NextResponse.json(
        { error: "No access token provided" },
        { status: 400 },
      );
    }

    cookies().set("access_token", access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return NextResponse.json(
      { error: "Error fetching tokens" },
      { status: 500 },
    );
  }
}
