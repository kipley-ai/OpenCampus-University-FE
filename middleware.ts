import { NextRequest, NextResponse } from "next/server";
import { SUBDOMAINS } from "./utils/constants";
import { isTokenExpired } from "./utils/utils";
import { getToken } from "next-auth/jwt";

const PUBLIC_FILE = /\.(.*)$/; // Files

const EDUCATOR_URLS = ["/educator-platform"];

function checkEducatorURLS(url: string) {
  for (const u of EDUCATOR_URLS) {
    if (url.startsWith(u)) return true;
  }

  return false;
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (
    PUBLIC_FILE.test(url.pathname) ||
    url.pathname.includes("_next") ||
    url.pathname.includes("api")
  )
    return;

  const hostname = req.headers.get("host");
  const subDomain =
    process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
      ? hostname?.replace(`.knowledgefi.xyz`, "")
      : hostname?.replace(`.localhost:3000`, "");

  if (SUBDOMAINS.includes(subDomain!) && url.pathname === "/") {
    url.pathname = "/chatbot/Yat-Siu-1d7a4ecf-bcf6-44da-bf05-92225aec8a03";
    if (process.env.NEXT_PUBLIC_ENV_DEV === "0") {
      url.pathname = "/chatbot/Yat-Siu-385a77e2-360b-4402-bf51-01ebde1a6d2c";
    }
    return NextResponse.rewrite(url);
  }

  if (
    process.env.NODE_ENV === "production" &&
    checkEducatorURLS(url.pathname) &&
    hostname ===
      process.env
        .NEXT_PUBLIC_APP_URL!.replace("https://", "")
        .replace("http://", "")
  ) {
    if (url.pathname === "/" || url.pathname === "/dashboard") {
      return NextResponse.redirect(
        process.env.NEXT_PUBLIC_EDUCATOR_PLATFORM_URL! +
          "/educator-platform/new",
      );
    }
    return NextResponse.redirect(
      process.env.NEXT_PUBLIC_EDUCATOR_PLATFORM_URL! + "/" + url.pathname,
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!dashboard|login|onboarding).*)"],
};
