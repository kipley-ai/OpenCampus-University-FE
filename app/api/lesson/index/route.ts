import { NextResponse } from "next/server";
import { useParams } from "next/navigation";
import axios from "axios";

export async function POST(req: Request) {
  const url = `${process.env.EDUCATOR_API_URL}/api_v1/lesson/index`;
  const data = await req.json();

  const res = await axios.post(url, data, {
    headers: {
      "x-api-key": process.env.EDUCATOR_API_KEY,
    },
  });
  return NextResponse.json(res.data);
}
