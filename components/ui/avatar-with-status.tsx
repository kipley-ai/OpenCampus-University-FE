import React, { useState, useRef, useEffect } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useDisconnect, useAccount } from "wagmi";
import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAppProvider } from "@/providers/app-provider";

type StatusType = "online" | "busy" | "away" | "offline";

interface AvatarWithStatusProps {
  image: string | StaticImageData;
  status: StatusType;
}

const AvatarWithStatus: React.FC<AvatarWithStatusProps> = ({
  image,
  status,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { user } = useAppProvider();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="group flex cursor-pointer items-center gap-1 xs:gap-2"
      >
        {image === "" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 338 338"
            className="size-6 fill-[#181B1F] dark:fill-heading dark:group-hover:brightness-50 md:size-8"
          >
            <path d="m169,.5a169,169 0 1,0 2,0zm0,86a76,76 0 11-2,0zM57,287q27-35 67-35h92q40,0 67,35a164,164 0 0,1-226,0" />
          </svg>
        ) : (
          <Image
            src={image}
            width={33}
            height={33}
            alt="Avatar"
            className="size-6 rounded-full md:size-8"
          />
        )}
        <span className="flex items-center gap-0 text-[9px] font-medium group-hover:underline xs:gap-1 xs:text-xs sm:gap-2 sm:text-[0.8rem]">
          {user.eth_address && `${user.eth_address.slice(0, 6)}...${user.eth_address.slice(-6)}`}
          <IoMdArrowDropdown />
        </span>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 z-50 mt-2 w-36 rounded-md bg-container py-2 text-[9px] shadow-xl xs:w-48 xs:text-xs sm:text-[0.8rem]">
          <Link
            href="/manage-account"
            className="mx-2 block flex rounded-md px-2 py-2 hover:bg-secondary"
          >
            <svg
              className="mr-2 size-3 sm:size-4"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_393_1338)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 10.8344C6.77834 10.8344 4.16667 13.4461 4.16667 16.6677V18.3344C4.16667 18.7946 3.79357 19.1677 3.33333 19.1677C2.8731 19.1677 2.5 18.7946 2.5 18.3344V16.6677C2.5 12.5256 5.85786 9.16772 10 9.16772C14.1421 9.16772 17.5 12.5256 17.5 16.6677V18.3344C17.5 18.7946 17.1269 19.1677 16.6667 19.1677C16.2064 19.1677 15.8333 18.7946 15.8333 18.3344V16.6677C15.8333 13.4461 13.2217 10.8344 10 10.8344Z"
                  fill="#7C878E"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 9.16756C11.8409 9.16756 13.3333 7.67518 13.3333 5.83423C13.3333 3.99328 11.8409 2.5009 10 2.5009C8.15905 2.5009 6.66667 3.99328 6.66667 5.83423C6.66667 7.67518 8.15905 9.16756 10 9.16756ZM10 10.8342C12.7614 10.8342 15 8.59565 15 5.83423C15 3.0728 12.7614 0.834229 10 0.834229C7.23858 0.834229 5 3.0728 5 5.83423C5 8.59565 7.23858 10.8342 10 10.8342Z"
                  fill="#7C878E"
                />
              </g>
              <defs>
                <clipPath id="clip0_393_1338">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0 0.000976562)"
                  />
                </clipPath>
              </defs>
            </svg>
            Manage Account
          </Link>
          <div className="mx-4 border-t border-border"></div>
          <button
            className="mx-2 block flex w-44 rounded-md px-2 py-2 hover:bg-secondary"
            onClick={(e) => {
              e.preventDefault();
              localStorage.setItem("kip-protocol-signature", "");
              localStorage.setItem("token", "");
              signOut();
              disconnect();
            }}
          >
            <svg
              className="mr-2 size-3 sm:size-4"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.19095 12.5015C9.65086 12.4841 10.0378 12.8429 10.0551 13.3028C10.0943 14.3396 10.1492 15.0964 10.2033 15.6389C10.2565 16.1732 10.5791 16.4947 11.0287 16.5497C11.559 16.6145 12.3069 16.6676 13.3333 16.6676C14.3597 16.6676 15.1076 16.6145 15.6378 16.5497C16.0873 16.4948 16.41 16.1731 16.4632 15.6387C16.5636 14.6316 16.6666 12.8916 16.6666 10.0009C16.6666 7.11021 16.5636 5.37024 16.4632 4.36312C16.41 3.82867 16.0873 3.50703 15.6378 3.45209C15.1076 3.38728 14.3597 3.33423 13.3333 3.33423C12.3069 3.33423 11.5589 3.38727 11.0287 3.45208C10.5791 3.50705 10.2565 3.82854 10.2033 4.36287C10.1492 4.90544 10.0943 5.66218 10.0551 6.699C10.0378 7.15891 9.65086 7.51766 9.19095 7.5003C8.73104 7.48294 8.37228 7.09603 8.38964 6.63612C8.42982 5.57193 8.48678 4.78042 8.54483 4.19766C8.66688 2.97252 9.52105 1.95731 10.8265 1.79773C11.4342 1.72345 12.2506 1.66756 13.3333 1.66756C14.416 1.66756 15.2324 1.72345 15.8401 1.79774C17.1457 1.95734 17.9997 2.97302 18.1217 4.19792C18.2291 5.27646 18.3333 7.07462 18.3333 10.0009C18.3333 12.9272 18.2291 14.7253 18.1217 15.8039C17.9997 17.0288 17.1457 18.0444 15.8401 18.204C15.2324 18.2783 14.416 18.3342 13.3333 18.3342C12.2506 18.3342 11.4342 18.2783 10.8265 18.2041C9.52105 18.0445 8.66688 17.0293 8.54483 15.8041C8.48678 15.2214 8.42982 14.4299 8.38964 13.3657C8.37228 12.9057 8.73104 12.5188 9.19095 12.5015Z"
                fill="#7C878E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.00588 12.3284C6.33132 12.6538 6.33132 13.1815 6.00588 13.5069C5.68044 13.8323 5.15281 13.8323 4.82737 13.5069L1.9107 10.5902C1.58527 10.2648 1.58527 9.73716 1.9107 9.41172L4.82737 6.49505C5.15281 6.16962 5.68044 6.16962 6.00588 6.49505C6.33132 6.82049 6.33132 7.34813 6.00588 7.67357L4.5118 9.16764H12.5C12.9602 9.16764 13.3333 9.54074 13.3333 10.001C13.3333 10.4612 12.9602 10.8343 12.5 10.8343L4.5118 10.8343L6.00588 12.3284Z"
                fill="#7C878E"
              />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AvatarWithStatus;
