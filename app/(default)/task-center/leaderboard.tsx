import { StaticImageData } from "next/image";
import { useUserDetail } from "@/hooks/api/user";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Oval from "@/components/oval";
import Box from "@/public/images/box.svg";
import BackgroundPattern from "@/components/background/grid-opencampus-3.svg";

export const Leaderboard = () => {
  // replace this array with the actual data later
  const myArray: { name: string, points: number }[] = [
    { name: "John", points: 1000 },
    { name: "Alice", points: 750 },
    { name: "Bob", points: 500 },
    { name: "Charlie", points: 250 },
    { name: "David", points: 100 }
  ];

  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    "",
  );
  const { data: twitterSession, status: twitterStatus } = useSession();
  const { isConnected } = useAccount();
  const { refetch: refetchUserDetail } = useUserDetail();

  useEffect(() => {
    let sub = true;

    const handleUserDetail = async () => {
      const { data } = await refetchUserDetail();
      if (data?.data) {
        setProfileImage(data.data.data.profile_image || "");
        if (
          twitterStatus == "authenticated" &&
          data.data.data.profile_image == ""
        ) {
          setProfileImage(twitterSession?.user?.image || "");
        }
      }
    };

    if (isConnected && sub) {
      handleUserDetail();
    }

    return () => {
      sub = false;
    };
  }, [isConnected, twitterStatus]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row mb-5 justify-between space-x-10">
        <div className="flex flex-col items-center justify-center py-8 border-2 rounded-xl font-medium bg-container w-1/3 text-center">
          <Image src={profileImage} width={55} height={55} alt="Avatar" className="rounded-full" />
          <p className="text-primary text-lg font-semibold my-2">{twitterSession?.user?.name}</p>
          <p>Your weekly rank: 1st</p>
          <p>Total OC points: 1,000</p>
        </div>
        <div className="flex flex-col justify-center py-8 pl-20 border rounded-xl bg-container w-1/3 font-semibold space-y-3">
          <p className="">Tiers</p>  
          {
            ["gold", "silver", "bronze"].map((color, index) => (
              <div key={index} className="flex flex-row items-center space-x-3 w-full">
                <Oval color={color}/>
                <span className="text-primary">{color === "gold" ? "Top 100" : color === "silver" ? "Top 101-499" : color === "bronze" ? "Top 500-1,000" : ""}</span>
              </div>
            ))
          }
        </div>
        <div className="flex flex-col items-center justify-center border rounded-xl w-1/3 py-5 px-10 text-center space-y-1 text-sm bg-primary text-white"
        style={{backgroundImage: `url(${BackgroundPattern.src})`, backgroundSize: "100% 100%"}}>
          <Image src={Box} alt="Box" />
          <p className="font-semibold">Top 100 will share in a pool of 100,000 OC Points!</p>
          <p className="opacity-50">Next distribution will happen in 3 days, 8 hours, 17 minutes</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold mb-1">CURRENT WEEK'S RANK</p>
        <div className="flex flex-col space-y-10">
          {
            myArray.map((item, index) => (
            <div className="flex flex-row justify-between px-5 py-4 border-2 items-center rounded-xl font-semibold">
              <div className="flex flex-row space-x-8 items-center justify-center">
                <span className="text-primary w-[30px]">{index + 1}{index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}</span>
                <Image
                    src={profileImage}
                    width={55}
                    height={55}
                    alt="Avatar"
                    className="rounded-full"
                />
                <span>{item.name}</span>
              </div>
              <span className="text-primary">{item.points} OC points</span>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Leaderboard;