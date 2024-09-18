import { ethers } from "ethers";
import abi from "./abi.json";
import { getSigner } from "..";
import { v4 as uuidv4 } from "uuid";

const APP_ID = 1000000001;
const APP_WALET = "0x6e3bbb13330102989ac110163e4c649d0bb88777";
const TOKEN = "0xeeb926a6acbecaa7765b20ea05827e042a14eb5d";

export async function getEduContract() {
  const contractAddress = process.env.NEXT_PUBLIC_EDU_PAYMENT_PROXY_ADDRESS!;

  const signer = await getSigner();
  const contractWrite = new ethers.Contract(contractAddress, abi, signer);

  return { contractWrite };
}

export async function topup(amount: number) {
  const signer = await getSigner();

  const { contractWrite } = await getEduContract();
  const reference_id = uuidv4();
  const referenceIdBytes = ethers.encodeBytes32String(
    reference_id.slice(0, 31),
  );
  const formattedAmount = BigInt(amount * 1e18);

  return await contractWrite.topup(
    APP_ID,
    APP_WALET,
    signer.address,
    TOKEN,
    formattedAmount,
    referenceIdBytes,
  );
}
