import { NextResponse } from "next/server";
import { axiosAPI, constructHeader } from "../../utils";

export async function POST(req: Request) {
  try {
    const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/category/index`;
    const res = await axiosAPI(baseUrl, {
      method: "POST",
      headers: await constructHeader(req.headers),
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
