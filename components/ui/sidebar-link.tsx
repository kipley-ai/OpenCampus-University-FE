import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function SidebarLink({ children, href }: SidebarLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      className={`mt-1 block flex items-center gap-3 rounded-md p-2 text-sm font-medium leading-none ${
        pathname === href
          ? "text-primary"
          : "text-secondary-text truncate transition duration-150 hover:bg-secondary hover:text-primary"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
