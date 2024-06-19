"use client";

import Logo from "@/components/ui/logo";
import AvatarWithStatus from "@/components/ui/avatar-with-status";
import { StaticImageData } from "next/image";

interface HeaderProps {
  profileImage: StaticImageData | string;
}

const Header = ({ profileImage }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b-2 border-border px-6 py-4">
      <Logo />
      <div className="flex items-center gap-4">
        <AvatarWithStatus image={profileImage} status="away" />
      </div>
    </header>
  );
};

export default Header;
