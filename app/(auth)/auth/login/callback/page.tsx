import { redirect, useSearchParams } from "next/navigation";
import { use } from "react";

// const getToken = async (code: string) => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_TERMINAL3_URL}/token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "authorization_code",
//           code: code,
//           client_id: process.env.TERMINAL3_CLIENT_ID,
//           client_secret: process.env.TERMINAL3_CLIENT_SECRET,
//           redirect_uri: process.env.NEXT_PUBLIC_TERMINAL3_REDIRECT_URI,
//         }),
//       },
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// export default function Callback() {
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code");

//   const token = use(getToken(code));
//   localStorage.setItem("token", token.access_token);
//   redirect("/dashboard");
// }
