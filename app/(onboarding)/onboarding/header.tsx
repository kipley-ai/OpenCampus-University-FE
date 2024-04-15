"use client";

import { useAccount } from "wagmi";
import Logo from "@/components/ui/logo";
import ThemeSwitcher from "@/components/theme-switcher";
import AvatarWithStatus from "@/components/ui/avatar-with-status";

const Header = () => {
  const { isConnected } = useAccount();

  return (
    <header className="flex items-center justify-between border-b-2 border-border px-6 py-4">
      <Logo />
      <div className="flex items-center gap-4">
        {/* <ThemeSwitcher /> */}
        {isConnected ? <AvatarWithStatus image="" status="away" /> : null}
      </div>
    </header>
  );
};

export default Header;
