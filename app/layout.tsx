"use client";

import "./css/style.css";

import localFont from "next/font/local";
import Theme from "../providers/theme-provider";
import AppProvider from "../providers/app-provider";
import NextAuthProvider from "../providers/session-provider";
import OCConnectWrapper from "../providers/oc-connect-wrapper";

import "@rainbow-me/rainbowkit/styles.css";
import { RQProviders } from "@/providers/react-query-provider";
import { CryptoProvider } from "@/providers/crypto-provider";
import { useEffect, useState } from "react";

const mikado = localFont({
  src: [
    {
      path: "../public/fonts/HVD Fonts  MikadoLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HVD Fonts  MikadoRegular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HVD Fonts  MikadoMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HVD Fonts  MikadoBold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mikado",
});

const poppins = localFont({
  src: [
    {
      path: "../public/fonts/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opts, setOpts] = useState({
    redirectUri: "",
    referralCode: "",
  });

  useEffect(() => {
    setOpts({
      ...opts,
      redirectUri: `${window!.location.origin}/redirect`,
    });
  }, []);

  return (
    <html lang="en">
      <body
        className={`${mikado.variable} ${poppins.variable} font-poppins text-slate-600 antialiased dark:text-slate-400`}
      >
        <RQProviders>
          <Theme>
            <AppProvider>
              <NextAuthProvider>
                <CryptoProvider>
                  <OCConnectWrapper
                    opts={opts}
                    sandboxMode={
                      process.env.NEXT_PUBLIC_OC_CONNECT_SANDBOX_MODE === "1"
                    }
                  >
                    {children}
                  </OCConnectWrapper>
                </CryptoProvider>
              </NextAuthProvider>
            </AppProvider>
          </Theme>
        </RQProviders>
      </body>
    </html>
  );
}
