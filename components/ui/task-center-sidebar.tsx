import Image from "next/image";
import TaskCenterImage from "public/images/join-box.svg";
import Link from "next/link";

export default function TaskCenterSideBar() {
  return (
    <div className="relative flex flex-col items-center">
      <Image src={TaskCenterImage} alt="Task Center" />
      <Link
        href={"/task-center"}
        className="group absolute bottom-12 flex w-[50%] justify-center rounded-full border-2 border-primary bg-transparent px-2 py-2 hover:bg-primary disabled:brightness-50"
      >
        <span className="text-xs font-medium group-hover:text-container">
          Task Center
        </span>
      </Link>
    </div>
  );
}
