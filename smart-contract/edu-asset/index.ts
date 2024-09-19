import abi from "./abi.json";
import { ethers } from "ethers";
import { getSigner } from "..";
import { v4 as uuidv4 } from "uuid";

const SFT_ADDRESS = "0x74c944103c5c67a25ee1fe249434a2bfc9250e66"

export async function getContract() {
  const contractAddress = process.env.NEXT_PUBLIC_EDU_CHAIN_ASSETS_PROXY_ADDRESS!;
  const signer = await getSigner();
  const contractWrite = new ethers.Contract(contractAddress, abi, signer);

  return { contractWrite };
}

export async function createAsset(amount: number, retriveURI: string, reference_id: string) {
  const signer = await getSigner();
  const { contractWrite } = await getContract();

  const PRICE_TOKEN = process.env.NEXT_PUBLIC_EDU_COIN_CONTRACT_ADDRESS!; 
  const price = BigInt(amount * 1e18);
  const referenceIdBytes = ethers.encodeBytes32String(reference_id.slice(0, 31),);
  const WL_needed = false

  return await contractWrite.createAsset(
    SFT_ADDRESS,
    signer.address,
    retriveURI,
    PRICE_TOKEN,
    price,
    referenceIdBytes,
    WL_needed
  );
}
