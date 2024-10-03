import { NextRequest, NextResponse } from "next/server";
import { axiosAPI, constructHeader, educatorPlatformHeader } from "../../../utils";
import axios from "axios";

export async function POST(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  try {
    const { uuid } = params;
    const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/profile/fetch/${uuid}`;

    const res = await axios(baseUrl, {
      method: "POST",
      headers: educatorPlatformHeader(),
    });

    return NextResponse.json(res.data);

  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}