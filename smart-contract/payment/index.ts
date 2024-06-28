import abi from "./abi.json";
import { Contract, ethers } from "ethers";
import { getSigner } from "..";
import { useAppProvider } from "@/providers/app-provider";

const CONTRACT_APP_ID = 1000000002;
const APP_WALLET = "0x5dad4Da07C11219d901F1F80e685ebFf7477c1CC";

export async function getContract() {
  const contractAddress = process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS!;
  const signer = await getSigner();
  const contractWrite = new ethers.Contract(contractAddress, abi, signer);

  return { contractWrite };
}

export async function topup(amount: number, sessionAddress: string) {
  const signer = await getSigner();
  const { contractWrite } = await getContract();
  return await contractWrite.topup(
    CONTRACT_APP_ID,
    APP_WALLET,
    signer.address,
    process.env.NEXT_PUBLIC_EDU_COIN_CONTRACT_ADDRESS,
    BigInt(amount * 1e18),
    ethers.zeroPadValue(sessionAddress, 32),
  );
}
