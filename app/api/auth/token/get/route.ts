import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const data = await req.json();
  const { code } = data;

  const body = {
    grant_type: "authorization_code",
    code,
    client_id: process.env.TERMINAL3_CLIENT_ID as string,
    client_secret: process.env.TERMINAL3_CLIENT_SECRET as string,
    redirect_uri: `${process.env.NEXTAUTH_URL}/dashboard`,
  };

  const res = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_TERMINAL3_URL}/token`,
    data: new URLSearchParams(body),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return NextResponse.json(res.data);
}
