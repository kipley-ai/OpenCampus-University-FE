import { NextResponse } from "next/server";
import { educatorPlatformHeader } from "../../utils";
import axios from "axios";

export async function POST(req: Request) {
  const data = await req.json();
  const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/course/index`;
  const res = await axios.post(baseUrl, data, {
    headers: educatorPlatformHeader(),
  });

  const response = await res.data;

  return NextResponse.json(response);
}
