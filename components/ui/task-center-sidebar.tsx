import Image from "next/image";
import TaskCenterImage from "public/images/join-box-nogrid.svg";
import TaskCenterLightImage from "public/images/join-box-nogrid-light.svg";
import Link from "next/link";
import Button from "@/components/button";
import { useTheme } from 'next-themes';

export default function TaskCenterSideBar() {
  const { theme } = useTheme();

  return (
    <div className="relative flex flex-col items-center">
      {theme === "dark" ? (
        <Image src={TaskCenterImage} alt="Task Center" />
      ) : (
        <Image src={TaskCenterLightImage} alt="Task Center" />
      )}
      <Link
        href={"/task-center"}
      >
        <Button className="absolute bottom-12 inset-x-0 mx-auto w-3/4">
          Task Center
        </Button>
      </Link>
    </div>
  );
}
