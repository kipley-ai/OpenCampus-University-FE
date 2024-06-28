import abi from "./abi.json";
import { ethers } from "ethers";
import { getSigner } from "..";

export async function getKipTokenContract() {
  const contractAddress = process.env.NEXT_PUBLIC_EDU_COIN_CONTRACT_ADDRESS!;
  const signer = await getSigner();
  const contractWrite = new ethers.Contract(contractAddress, abi, signer);

  return { contractWrite };
}

export async function balanceOf() {
  const signer = await getSigner();
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.balanceOf(signer.address);
}

export async function allowance() {
  const signer = await getSigner();
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.allowance(
    signer.address,
    process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS!,
  );
}

export async function approve(value: BigInt) {
  const { contractWrite } = await getKipTokenContract();
  return await contractWrite.approve(
    process.env.NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS!,
    value,
  );
}
