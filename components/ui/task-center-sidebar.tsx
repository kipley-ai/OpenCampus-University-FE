import "./task-center-sidebar.css";
import Image from "next/image";
import TaskCenterImage from "public/images/task-center-sidebar-dark.svg";
import TaskCenterLightImage from "public/images/task-center-sidebar-light.svg";
import Link from "next/link";
import Button from "@/components/button";
import { useTheme } from "next-themes";

export default function TaskCenterSideBar() {
  const { theme } = useTheme();

  return (
    <div className="rainbow relative mx-5 flex flex-col items-center gap-4 px-1 py-8">
      {theme === "dark" ? (
        <Image src={TaskCenterImage} alt="Task Center" />
      ) : (
        <Image src={TaskCenterLightImage} alt="Task Center" />
      )}
      <Link href={"/task-center"} className="w-9/12">
        <Button className="w-full">Task Center</Button>
      </Link>
    </div>
  );
}
