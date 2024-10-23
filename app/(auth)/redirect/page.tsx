"use client";

import { useEffect } from "react";
import { LoginCallBack, useOCAuth } from "@opencampus/ocid-connect-js";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/hooks/api/user";
import { parseJWT } from "@/utils/utils";
import { useAppProvider } from "@/providers/app-provider";

import "../login/logo-spinner.css";

export default function RedirectPage() {
  const router = useRouter();
  const createUser = useCreateUser();
  const queryClient = useQueryClient();
  const { authState } = useOCAuth();
  const { setSession, isEducatorPlatform } = useAppProvider();

  useEffect(() => {
    const { isAuthenticated, idToken, accessToken } = authState;

    if (!isAuthenticated) {
      return;
    }

    const user = parseJWT(idToken);
    const userForBackend = {
      wallet_addr: user.eth_address,
      user_id: user.user_id,
      edu_username: user.edu_username,
    };
    if ("eth_address" in user) {
      user["address"] = user["eth_address"];
      delete user["eth_address"];
    }

    createUser.mutate(userForBackend, {
      onSuccess: async () => {
        localStorage.setItem("id_token", idToken);

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ access_token: accessToken }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData.error);
            return;
          }

          const responseData = await response.json();
          if (responseData.success) {
            setSession(user);
            queryClient.invalidateQueries({ queryKey: ["user-detail"] });
            queryClient.invalidateQueries({ queryKey: ["credit-balance"] });
          }
        } catch (error) {
          console.error("Error during login:", error);
        }
      },
      onError: (error) => {
        console.error("Error:", error);
      },
      onSettled: () => {
        if (isEducatorPlatform) {
          router.push("/");
          return;
        }
        router.push("/dashboard");
      },
    });
  }, [authState]);

  const loginSuccess = () => {
    console.log("Login was successful");
  };

  const loginError = (error: Error) => {
    console.error("Login error:", error);
  };

  function CustomErrorComponent() {
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="56" cy="56" r="52" fill="" />
          <circle
            cx="56"
            cy="56"
            r="54"
            stroke="var(--color-primary)"
            strokeOpacity="0.14"
            strokeWidth="4"
          />
          <path
            d="M104.035 29.2109C97.8339 18.0923 87.974 9.47905 76.1486 4.82349C75.5993 4.60725 74.9836 4.89016 74.7781 5.4435V5.4435C74.5725 5.99684 74.855 6.61103 75.4041 6.82769C86.7528 11.3058 96.2148 19.5777 102.168 30.252C108.121 40.9264 110.186 53.3235 108.032 65.3321C107.928 65.9131 108.302 66.4763 108.881 66.5922V66.5922C109.46 66.7081 110.024 66.3329 110.129 65.752C112.382 53.2445 110.236 40.3295 104.035 29.2109Z"
            stroke="var(--color-primary)"
            strokeWidth="2"
            className="spin-logo"
          />
          <g clipPath="url(#clip0_1324_40833)">
            <path
              d="M55.5703 26.0023C49.6145 26.0751 43.8136 27.8741 38.8975 31.1728C33.9814 34.4715 30.1697 39.1228 27.9418 44.5413C25.714 49.9598 25.1695 55.9035 26.377 61.6248C27.5844 67.3461 30.4897 72.5894 34.7276 76.6949C38.9654 80.8005 44.3465 83.5851 50.1936 84.6982C56.0408 85.8113 62.0931 85.2032 67.5889 82.9506C73.0847 80.698 77.7785 76.9014 81.0799 72.0384C84.3814 67.1754 86.143 61.4633 86.143 55.6207C86.0925 47.7163 82.8431 40.1553 77.1097 34.6009C71.3763 29.0465 63.6285 25.9535 55.5703 26.0023Z"
              fill="#00EDBE"
            />
            <path
              d="M67.6549 44.6672C67.573 43.1861 67.9413 41.7146 68.7131 40.4391H44.0682C43.8473 40.4383 43.6285 40.4802 43.4241 40.5624C43.2197 40.6446 43.0339 40.7655 42.8771 40.9181C42.7204 41.0708 42.5958 41.2522 42.5106 41.4521C42.4253 41.6519 42.381 41.8663 42.3802 42.083V47.2504C42.381 47.4671 42.4253 47.6814 42.5106 47.8813C42.5958 48.0812 42.7204 48.2626 42.8771 48.4153C43.0339 48.5679 43.2197 48.6888 43.4241 48.771C43.6285 48.8532 43.8473 48.8951 44.0682 48.8943H68.7131C67.9413 47.6188 67.573 46.1472 67.6549 44.6662"
              fill="#141BEB"
            />
            <path
              d="M38.5386 55.7026C38.619 57.1837 38.2493 58.6549 37.4763 59.9297H62.1212C62.3421 59.9305 62.5609 59.8886 62.7653 59.8064C62.9697 59.7242 63.1555 59.6033 63.3123 59.4507C63.469 59.298 63.5935 59.1166 63.6788 58.9167C63.7641 58.7168 63.8083 58.5025 63.8091 58.2858V53.1184C63.8083 52.9017 63.7641 52.6873 63.6788 52.4875C63.5935 52.2876 63.469 52.1062 63.3123 51.9535C63.1555 51.8009 62.9697 51.68 62.7653 51.5978C62.5609 51.5156 62.3421 51.4737 62.1212 51.4745H37.4763C38.2481 52.75 38.6164 54.2215 38.5345 55.7026"
              fill="#141BEB"
            />
            <path
              d="M67.6549 66.7369C67.573 65.2558 67.9413 63.7843 68.7131 62.5088H44.0682C43.8473 62.508 43.6285 62.5499 43.4241 62.6321C43.2197 62.7143 43.0339 62.8352 42.8771 62.9878C42.7204 63.1405 42.5958 63.3219 42.5106 63.5218C42.4253 63.7216 42.381 63.936 42.3802 64.1527V69.3201C42.381 69.5368 42.4253 69.7511 42.5106 69.951C42.5958 70.1509 42.7204 70.3323 42.8771 70.485C43.0339 70.6376 43.2197 70.7585 43.4241 70.8407C43.6285 70.9229 43.8473 70.9648 44.0682 70.964H68.7131C67.9413 69.6885 67.573 68.217 67.6549 66.7359"
              fill="#141BEB"
            />
          </g>
          <defs>
            <clipPath id="clip0_1324_40833">
              <rect
                width="61.1465"
                height="59.2357"
                fill="white"
                transform="translate(25 26)"
              />
            </clipPath>
          </defs>
        </svg>
        <h1 className="text-center font-bold text-body dark:text-heading">
          Finishing up and preparing your dashboard...
        </h1>
      </div>
    );
  }

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  );
}
