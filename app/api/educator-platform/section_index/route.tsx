import { NextResponse } from "next/server";
import { axiosAPI, constructHeader, educatorPlatformHeader } from "../../utils";

export async function POST(req: Request) {
  const data = await req.json();
  const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/section/index`;
  const res = await axiosAPI(baseUrl, {
    method: "POST",
    headers: educatorPlatformHeader(),
    data,
  });

  const response = await res.data;

  return NextResponse.json(response);
}
