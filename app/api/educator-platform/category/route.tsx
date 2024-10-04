import { NextResponse } from "next/server";
import { axiosAPI, constructHeader, educatorPlatformHeader } from "../../utils";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/category/index`;
    const res = await axios(baseUrl, {
      method: "POST",
      headers: educatorPlatformHeader(),
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
