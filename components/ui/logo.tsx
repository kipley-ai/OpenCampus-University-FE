import Image from "next/image";
import OpenCampusLogo from "@/components/logo/open-campus-logo.svg"

export default function Logo() {
  return (
    <Image
      className="w-[170px] h-[30px] lg:w-[282px] lg:h-[50px]"
      src={OpenCampusLogo}
      width={282}
      height={50}
      alt="open-campus-logo"
    />
  );
}
