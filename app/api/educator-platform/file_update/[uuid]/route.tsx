import { NextResponse } from "next/server";
import { educatorPlatformHeader } from "../../../utils";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { uuid } = data;
    const baseUrl = `${process.env.NEXT_EDUCATOR_BE_URL}/api_v1/files/update/${uuid}`;
    const headers = await educatorPlatformHeader();
    
    // console.log("Attempting to create/update file at URL:", baseUrl);
    // console.log("Headers:", headers);
    // console.log("Request data:", data);

    const res = await axios(baseUrl, {
      method: "POST",
      headers,
      data,
    });

    // console.log("Response status:", res.status);
    // console.log("Response data:", res.data);

    return NextResponse.json(res.data);
  } catch (error) {
    // console.error("Error creating/updating file:", error);
    if (axios.isAxiosError(error)) {
      // console.error("Response data:", error.response?.data);
      // console.error("Response status:", error.response?.status);
      // console.error("Request URL:", error.config?.url);
      // console.error("Request headers:", error.config?.headers);
    }
    return NextResponse.json(
      { 
        error: "Failed to create/update course", 
        details: error instanceof Error ? error.message : String(error),
        responseData: axios.isAxiosError(error) ? error.response?.data : undefined,
        responseStatus: axios.isAxiosError(error) ? error.response?.status : undefined
      },
      { status: 500 }
    );
  }
}