"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetToken } from "@/hooks/api/auth";
import { parseJWT } from "@/utils/utils";

export default function Login() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { data, isPending, error } = useGetToken(code);

  const router = useRouter();

  if (isPending) {
    return <div>Logging in...</div>;
  }

  if (error) {
    console.error("Error:", error);
    return router.push("/dashboard");
  }

  console.log("data :>> ", data);

  const { access_token, id_token } = data?.data;

  if (!access_token || !id_token) {
    console.error("No access token or id token");
    return router.push("/dashboard");
  }

  localStorage.setItem("token", access_token);

  const user = parseJWT(id_token);

  console.log("user :>> ", user);

  // TODO: send user info to backend

  router.push("/dashboard");
}
