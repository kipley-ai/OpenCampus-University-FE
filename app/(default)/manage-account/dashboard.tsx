import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import TwitterIcon from "@/components/icon/twitter.svg";
import ThemeSwitcher from "@/components/theme-switcher";
import Switcher from "@/components/switcher";
import AvatarDefault from "public/images/avatar-default-02.svg";
import { chartColors } from "@/components/charts/chartjs-config";
import SignOutIcon from "@/public/images/sign-out.svg";

import { useUpdateUserAPI, useUserDetail } from "@/hooks/api/user";
import { profile } from "console";
import { useAccount } from "wagmi";
import { useCreditBalance } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import ModalTopUp from "@/components/modal-top-up";
import { signIn, signOut, useSession } from "next-auth/react";
import { uploadFile } from "@/utils/utils";
import { SecondaryButton } from "@/components/button";
import { LoadMoreSpinner } from "@/components/load-more";
import { useQueryClient } from "@tanstack/react-query";

export default function AccountSettings() {
  const queryClient = useQueryClient()
  const { mutate: mutateUpdateUser, isPending: isLoadingUpdateUser,  } = useUpdateUserAPI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<any>(AvatarDefault);

  const { data: twitterSession, status: twitterStatus } = useSession();

  const { modalTopUp, setModalTopUp, user } = useAppProvider();
  const { data: userDetail, isLoading } = useUserDetail();
  const address = userDetail?.data?.data.wallet_addr;

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (userDetail?.data) {
      setProfileImage(userDetail.data.data.profile_image || AvatarDefault);
      if (twitterStatus == "authenticated") {
        let userProfileImage = null;
        let userUsername = null;
        let userTwitterLink = null;

        if (!userDetail.data.data.profile_image) {
          setProfileImage(twitterSession?.user?.image);
          userProfileImage = twitterSession?.user?.image;
        }

        if (!userDetail.data.data.username) {
          userUsername = twitterSession?.user?.username;
        }

        if (!userDetail.data.data.twitter_link) {
          userTwitterLink = twitterSession?.user?.username;
        }

        if (userTwitterLink) {
          mutateUpdateUser({
            profile_image: userProfileImage,
            username: userUsername!,
            twitter_link: userTwitterLink!,
          }, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["user-detail"] });
            }
          });
        }
      }
    }
  }, [twitterStatus, userDetail]);

  const handleProfileImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file, (uploadedFile: string) => {
        setProfileImage(uploadedFile);
        mutateUpdateUser({
          profile_image: uploadedFile,
        }, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-detail"] });
          }
        });
      });
    }
  };

  return (
    <div className="flex w-5/6 flex-col rounded-2xl border border-border bg-box px-10 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">Account Information</h1>
        {/* <DateFilterComponent /> */}
      </div>
      <hr className="my-4 border border-border" />
      {/* Profile Picture */}
      <h2 className="text-sm font-medium">Profile</h2>
      <div className="my-4 flex items-center justify-between">
        <div className="relative flex items-center">
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="relative"
          >
            <Image
              src={profileImage}
              width={50}
              height={50}
              alt="Profile Image"
              className="rounded-full transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-sm font-semibold text-heading opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4274 1.51321L10.1026 2.83799L13.6609 6.39627L14.9857 5.07149C15.67 4.38721 15.67 3.27867 14.9857 2.59438L13.9073 1.51321C13.223 0.828929 12.1144 0.828929 11.4302 1.51321H11.4274ZM9.48405 3.45658L3.10377 9.83959C2.81911 10.1243 2.61109 10.4773 2.49613 10.8633L1.52718 14.1561C1.45875 14.3887 1.52171 14.6378 1.69141 14.8075C1.86111 14.9772 2.11019 15.0402 2.34011 14.9745L5.63289 14.0055C6.01883 13.8906 6.37192 13.6825 6.65658 13.3979L13.0423 7.01486L9.48405 3.45658Z"
                  fill="#00EDBE"
                />
              </svg>
              <p className="ml-1 text-primary">Edit</p>
            </div>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleProfileImage}
          />
          <div className="items-between ml-4">
            <p className="font-medium">
              {user.eth_address?.substring(0, 11) +
                "..." +
                user.eth_address?.substring(user.eth_address.length - 11)}
            </p>
          </div>
        </div>
        <Link href="/manage-account">
          <SecondaryButton>
            <span> View Profile</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.00065 0.333984L5.82565 1.50898L10.4757 6.16732H0.333984V7.83398H10.4757L5.82565 12.4923L7.00065 13.6673L13.6673 7.00065L7.00065 0.333984Z" />
            </svg>
          </SecondaryButton>
        </Link>
      </div>
      {/* <div className="spinner-container"> */}
      {isLoadingUpdateUser && <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
        <LoadMoreSpinner />
      </div>}
      <hr className="mb-4 border border-border" />
      {/* Connected Account */}
      <h2 className="text-sm font-medium">Connected Account</h2>
      <div className="my-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Placeholder for Twitter icon SVG */}
          <svg
            width="43"
            height="43"
            viewBox="0 0 43 43"
            className="size-[50px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="43" height="43" rx="21.5" fill="#222325" />
            <path
              d="M10.8017 11.8252L18.9913 22.7524L10.75 31.6366H12.6048L19.8201 23.8583L25.6498 31.6366H31.9618L23.3114 20.0948L30.9823 11.8252H29.1275L22.4826 18.9889L17.1137 11.8252H10.8017ZM13.5293 13.1886H16.4291L29.2337 30.2731H26.334L13.5293 13.1886Z"
              fill="white"
            />
          </svg>
          {userDetail?.data.data.twitter_link ? (
            <p className="ml-4 font-medium">
              Twitter X{" "}
              <span className="text-[#898989]">
                (@{userDetail?.data.data.twitter_link})
              </span>
            </p>
          ) : (
            <button
              className="ml-4"
              onClick={() => {
                signIn("twitter", { callbackUrl: "/manage-account" });
              }}
            >
              <p className="font-medium text-primary hover:underline">
                Connect Twitter Account
              </p>
            </button>
          )}
        </div>
        {userDetail?.data.data.twitter_link ? (
          <SecondaryButton
            onClick={() => {
              mutateUpdateUser({
                twitter_link: "",
              }, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["user-detail"] });
                }
              });
              signOut();
            }}
          >
            <span>Disconnect</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.00065 0.333984L5.82565 1.50898L10.4757 6.16732H0.333984V7.83398H10.4757L5.82565 12.4923L7.00065 13.6673L13.6673 7.00065L7.00065 0.333984Z" />
            </svg>
          </SecondaryButton>
        ) : null}
      </div>
      <hr className="my-4 border border-border" />
      <h2 className="mb-4 text-sm font-medium">Settings</h2>
      <div className="flex items-center justify-between">
        <div className="ml-3 flex gap-6">
          <ThemeSwitcher />
          <h3 className="font-medium">Theme</h3>
        </div>
        <div className="w-48">
          <Switcher
            texts={["Light", "Dark"]}
            mode={theme == "dark" ? 1 : 0}
            setWhich={(index: number) => {
              setTheme(index == 0 ? "light" : "dark");
            }}
            fullWidth
          />
        </div>
      </div>
      <hr className="my-4 border border-border" />
      {/* User Overview */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-medium">User Overview</h2>
        <div className="flex gap-6">
          <div className="w-1/2 space-y-2 rounded-xl border border-border bg-container px-16 py-8">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.23 19.7C8.05 18.82 9.3 18.89 10.02 19.85L11.03 21.2C11.84 22.27 13.15 22.27 13.96 21.2L14.97 19.85C15.69 18.89 16.94 18.82 17.76 19.7C19.54 21.6 20.99 20.97 20.99 18.31V7.04C21 3.01 20.06 2 16.28 2H8.72C4.94 2 4 3.01 4 7.04V18.3C4 20.97 5.46 21.59 7.23 19.7Z"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 13L15.5 7"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.4945 13H15.5035"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.49451 7.5H9.50349"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex items-center">
              <h4 className="mr-1 text-[16px] font-semibold">
                OC Points Balance
              </h4>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                  fill="#EFEFEF"
                />
              </svg>
            </div>
            <h4 className="text-4xl font-semibold text-primary">
              {userDetail?.data.data.credit_balance}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
