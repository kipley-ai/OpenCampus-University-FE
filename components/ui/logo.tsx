import Image from "next/image";
import OpenCampusLogo from "@/components/logo/open-campus-logo.svg"

export default function Logo() {
  return (
    // <div className="flex flex-col items-end pl-3">
    //   <h2 className="text-xs font-black tracking-wider text-primary lg:text-sm 2xl:block">
    //     University
    //   </h2>
    //   <h1 className="text-2xl font-black leading-3 tracking-wider text-heading lg:text-[28px] 2xl:block">
    //     Open Campus
    //   </h1>
    // </div>
    <Image
      className="w-[282px] h-[50px]"
      src={OpenCampusLogo}
      width={282}
      height={50}
      alt="open-campus-logo"
    />
  );
}
