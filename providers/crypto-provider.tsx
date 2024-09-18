"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, arbitrumSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";
import {
  okxWallet,
  trustWallet,
  phantomWallet,
  oneKeyWallet,
  ledgerWallet,
  bitKeepWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useAxios } from "@/hooks/useAxios";
import { useAppProvider } from "./app-provider";
import { defineChain } from "viem";

export const eduChain = defineChain({
  id: 656476,
  name: "Open Campus Codex Sepolia",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
    public: { http: ["https://open-campus-codex-sepolia.drpc.org"] },
  },
  network: "Open Campus Codex",
  blockExplorers: {
    default: {
      name: "Open Campus Blockscout",
      url: "https://opencampus-codex.blockscout.com",
    },
  },
});

const { chains, publicClient } = configureChains(
  [base, arbitrumSepolia, eduChain],
  [publicProvider()],
);

const projectId = "f53ae5cdc0007d6f85bd532c0edf4d3d";

const { wallets } = getDefaultWallets({
  appName: "KIP Protocol",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "More",
    wallets: [
      okxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      phantomWallet({ chains }),
      oneKeyWallet({ chains }),
      ledgerWallet({ projectId, chains }),
      bitKeepWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  connectors,
  publicClient,
});

const initialChain = eduChain;

export function CryptoProvider({ children }: React.PropsWithChildren) {
  const [address, setAddress] = useState("");
  const { response, error, loading, sendRequest } = useAxios();
  const [isReady, setIsReady] = useState<boolean>(false);

  const { verifStatus, setVerifStatus } = useAppProvider();

  useEffect(() => {
    setIsReady(true);
  }, []);

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return "x";
    },

    createMessage: ({ nonce, address, chainId }) => {
      setAddress(address);
      return "Welcome to OCU!";
    },

    getMessageBody: ({ message }) => {
      return message;
    },

    verify: async ({ message, signature }) => {
      localStorage.setItem("kip-protocol-signature", signature);

      setVerifStatus("authenticated");
      return true;
    },

    signOut: async () => {
      localStorage.removeItem("kip-protocol-signature");

      setVerifStatus("unauthenticated");
    },
  });

  return (
    <>
      {isReady && (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitAuthenticationProvider
            adapter={authenticationAdapter}
            status={verifStatus}
          >
            <RainbowKitProvider
              chains={chains}
              initialChain={initialChain}
              modalSize="compact"
            >
              {children}
            </RainbowKitProvider>
          </RainbowKitAuthenticationProvider>
        </WagmiConfig>
      )}
    </>
  );
}
