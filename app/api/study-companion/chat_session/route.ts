import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  const headers = await constructHeader(req.headers);
  console.log(headers);
  const data = await req.json();
  const url = `${process.env.API_URL}/study-companion/chat_session`;

  const res = await axiosAPI(url, {
    method: "POST",
    headers,
    data,
  });

  return NextResponse.json(res.data);
}