import { NextResponse } from "next/server";
import { useParams } from "next/navigation";
import axios from "axios";

export async function POST(req: Request) {
  const { id } = useParams();
  const url = `${process.env.EDUCATOR_API_URL}/api_v1/course/fetch/${id}`;

  const res = await axios.post(url, {
    headers: {
      "x-api-key": process.env.EDUCATOR_API_KEY,
    },
  });
  return NextResponse.json(res.data);
}
