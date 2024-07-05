export const handleLogin = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TERMINAL3_URL}/authorize?` +
        new URLSearchParams({
          response_type: "code",
          scope: "openid",
          client_id: "3kG6UNvSppAH5uKpA3pLg6tqdLVMSK1B",
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
          state: "/",
          new_session: "true",
        }),
      {
        method: "GET",
        redirect: "follow",
      },
    );

    if (response.redirected) {
      window.location.href = response.url;
    } else {
      console.log("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
