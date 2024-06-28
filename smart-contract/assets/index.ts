import abi from "./abi.json";
import { ethers } from "ethers";
import { getSigner } from "..";

export async function getContract() {
  const contractAddress = process.env.NEXT_PUBLIC_ASSETS_CONTRACT_ADDRESS!;
  const signer = await getSigner();
  const contractWrite = new ethers.Contract(contractAddress, abi, signer);

  return { contractWrite };
}

export async function createAsset(sftId: string, sessionAddress: string) {
  const signer = await getSigner();
  const { contractWrite } = await getContract();

  return await contractWrite.createAsset(
    process.env.NEXT_PUBLIC_SFT_CONTRACT_ADDRESS,
    signer.address,
    `${process.env.NEXT_PUBLIC_APP_URL}/nft/${sftId}`,
    process.env.NEXT_PUBLIC_EDU_COIN_CONTRACT_ADDRESS,
    BigInt(1e15),
    ethers.zeroPadValue(sessionAddress, 32),
    false,
  );
}
