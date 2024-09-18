"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useLogin } from "@/utils/auth";

export default function LoginButton() {
  const handleLogin = useLogin();

  return <button onClick={handleLogin}>Login</button>;
}
