"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetToken } from "@/hooks/api/auth";
import { useCreateUser } from "@/hooks/api/user";
import { parseJWT } from "@/utils/utils";
import { useAppProvider } from "@/providers/app-provider";

export default function Login() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { data, isPending, error } = useGetToken(code);

  const router = useRouter();

  const { mutate } = useCreateUser();

  const { setSession } = useAppProvider();

  useEffect(() => {
    if (isPending) {
      return;
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

    const user = parseJWT(id_token);

    console.log("user :>> ", user);

    const backendUser = {
      wallet_addr: user.eth_address,
      user_id: user.user_id,
      edu_username: user.edu_username,
    };

    if (user !== null && user !== undefined) {
      if ("eth_address" in user) {
        user["address"] = user["eth_address"];
        delete user["eth_address"];
      }

      mutate(backendUser, {
        onSuccess: () => {
          localStorage.setItem("token", access_token);
          localStorage.setItem("session", JSON.stringify(user));
          setSession(user);
        },
        onError: (error) => {
          console.error("Error:", error);
        },
        onSettled: () => {
          router.push("/dashboard");
        },
      });
    }
  }, [data, isPending, error, mutate, router]);

  if (isPending) {
    return <div>Logging in...</div>;
  }

  return <div>Redirecting to dashboard...</div>;
}
