import Image from "next/image";
import OpenCampusLogo from "@/components/logo/OC Logo.svg";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Image
        className=""
        src={OpenCampusLogo}
        width={40}
        height={40}
        alt="open-campus-logo"
      />
      <h1 className="font-mikado text-xl font-bold text-primary">
        Open Campus
      </h1>
    </div>
  );
}
