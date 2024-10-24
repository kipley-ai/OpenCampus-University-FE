import Image from "next/image";
import Logo from "@/public/images/open-campus-logo-blue.png";

export default function GrantsHeader() {
  return (
    <header className="-mb-px flex h-12 items-center justify-start rounded-t-md border-b-2 border-border bg-sidebar px-2 md:h-16 md:px-6">
      <Image src={Logo} alt="OCU Logo" width={180} height={180} />
    </header>
  );
}
