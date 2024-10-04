import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  const { uuid } = params;
  const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/section/fetch/${uuid}`;
  
  const res = await axiosAPI(baseUrl, {
    method: "POST",
    headers: await constructHeader(req.headers),
    // No request body is sent
  });

  const response = await res.data;
  return NextResponse.json(response);
}