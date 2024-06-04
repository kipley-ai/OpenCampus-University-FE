import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { token } = data;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_TERMINAL3_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    return NextResponse.error();
  }

  return NextResponse.json(res.data);
}
