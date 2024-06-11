import { useTaskList, useTakeTask, useCompleteTask } from "@/hooks/api/task";
import { useState, useEffect } from "react";
import { TaskData } from "@/lib/types";
import { getRemainingTimeString } from "@/lib/date";
import Toast from "@/components/toast";
import Image from "next/image";
import Banner01 from "@/public/images/banner-tasks-1.png";
import Banner02 from "@/public/images/banner-tasks-2.png";
import OC100 from "@/public/images/oc-100.svg";
import Button from "@/components/button";
import XIcon from "@/public/images/X-icon.svg";
import CheckIcon from "@/public/images/check-icon-3.svg";

const TaskCard = ({
  data,
  setToastErrorOpen,
  setToastSuccessOpen,
  setToastMessage,
  refetch,
  refetchBasePoints,
}: {
  data: TaskData;
  setToastErrorOpen: (value: boolean) => void;
  setToastSuccessOpen: (value: boolean) => void;
  setToastMessage: (message: string) => void;
  refetch: () => void;
  refetchBasePoints: () => void;
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(!!data.is_completed);
  const isTaken: boolean = !!data.is_taken;

  const [taskStatus, setTaskStatus] = useState<string>(
    isCompleted ? "Completed" : isTaken ? "Verify" : "Go",
  );

  // console.log(data.task_name, isCompleted, taskStatus)

  useEffect(() => {
    if (
      data.task_end_time !== null &&
      getRemainingTimeString(data.task_end_time, data.task_frequency) ===
        "Task has ended"
    ) {
      setIsCompleted(true);
      setTaskStatus("Ended");
    }
  }, [data.task_end_time]);

  const { mutate: takeTask } = useTakeTask();
  const { mutate: completeTask } = useCompleteTask();

  const handleButton = () => {
    if (taskStatus?.toLowerCase() === "go") {
      takeTask({ task_id: data.task_id });
      const url = window.location.origin + "/chatbot/" + data.task_link;
      window.open(url, "_blank");
      refetch();
      setTaskStatus("Verify");
    } else if (taskStatus?.toLowerCase() === "verify") {
      completeTask(
        { taken_id: data.taken_id },
        {
          onSuccess: (data) => {
            console.log("data :>> ", data.data);
            if (data.data.status === "error") {
              setToastErrorOpen(true);
              setTimeout(() => {
                setToastErrorOpen(false);
              }, 3000);
              refetch();
            } else {
              setToastSuccessOpen(true);
              setTimeout(() => {
                setToastSuccessOpen(false);
              }, 3000);
              refetch();
              refetchBasePoints();
              setIsCompleted(true);
              setTaskStatus("Completed");
            }
          },
          onError: (error) => {
            console.log("error :>> ", error);
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex w-2/3 flex-row gap-5">
        <svg
          className="mt-2 h-[10px] w-[9px] shrink-0"
          width="9"
          height="10"
          viewBox="0 0 9 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4.5" cy="5.21436" r="4.5" fill="#141BEB" />
        </svg>
        <div className="flex flex-col space-y-3">
          <span className="text-base font-medium md:text-lg">
            {data.task_name}
          </span>
        </div>
      </div>
      {isCompleted && taskStatus !== "Ended" ? (
        <div className="flex w-1/4 flex-row items-center justify-center space-x-2 md:w-1/6">
          <Image src={CheckIcon} alt="CheckIcon" width={20} />
          <span className="text-sm font-medium text-[#00BF99]">
            +{data.task_reward_amount} OCU Credits
          </span>
        </div>
      ) : (
        <Button
          onClick={handleButton}
          disabled={taskStatus === "Ended"}
          className={`w-1/4 rounded-lg py-2 md:w-1/6`}
        >
          <p>
            {taskStatus === "Verify"
              ? "Verify"
              : taskStatus === "Ended"
                ? "Ended"
                : `+${data.task_reward_amount} OCU Credits`}
          </p>
        </Button>
      )}
    </div>
  );
};

export const ActiveTasks = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<TaskData[]>([]);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    data: listData,
    isSuccess,
    refetch,
    isPlaceholderData,
  } = useTaskList({
    page: pageNum,
    page_size: pageSize,
    sort_by: "created",
  });

  useEffect(() => {
    if (isSuccess) {
      if (pageNum === 1) {
        setTaskList(listData.task_data);
        return;
      }

      if (
        listData.task_data.length > 0 &&
        taskList[taskList.length - 1].task_id !==
          listData.task_data[listData.task_data.length - 1].task_id
      )
        setTaskList([...taskList, ...listData.task_data]);
    }
  }, [isSuccess, isPlaceholderData]);

  if (isSuccess) {
    console.log("listData.data :>> ", listData);
  }

  return (
    <div className="space-y-7">
      <div
        className="flex flex-row items-center justify-between rounded-xl bg-cover bg-left bg-no-repeat p-6 text-white md:pl-6 md:pr-10"
        style={{
          backgroundImage: `url(${Banner01.src})`,
        }}
      >
        <div className="flex flex-col space-y-5 max-md:w-2/3">
          <Image src={OC100} alt="OC100" />
          <h1 className="text-sm font-bold xl:text-xl">
            Vote for your favorite creator on OC100 to earn daily OCU Credits!
          </h1>
        </div>
        <div className="flex w-1/5 flex-col items-center space-y-3 max-md:w-1/3">
          <Button
            onClick={() => {}}
            disabled={false}
            className="w-full rounded-xl py-4"
          >
            <p className="text-sm font-semibold xl:text-lg">
              Vote for Cohort 1
            </p>
          </Button>
          <span className="xl:text-md text-center text-sm">03 March 2024</span>
        </div>
      </div>
      <div
        className="flex items-center justify-between gap-3 rounded-xl bg-cover bg-center bg-no-repeat p-6 text-white md:pl-6 md:pr-10"
        style={{
          backgroundImage: `url(${Banner02.src})`,
        }}
      >
        <div className="flex flex-wrap items-center gap-3 max-md:w-1/2">
          <Image src={OC100} alt="OC100" width={100} />
          <Image src={XIcon} alt="XIcon" width={50} />
          <h1 className="text-base xl:text-xl">
            Like and retweet this tweet regarding OC 100
          </h1>
        </div>
        <div className="flex w-1/3 flex-col items-center space-y-3 md:w-1/5">
          <Button
            onClick={() => {}}
            disabled={false}
            className="w-full rounded-xl py-4"
          >
            <p className="text-sm font-semibold xl:text-lg">+10 OCU Credits</p>
          </Button>
          <span className="xl:text-md text-center text-sm">
            29 February 2024
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-10">
        <Toast
          type="success"
          open={toastSuccessOpen}
          setOpen={setToastSuccessOpen}
        >
          Task completed successfully!
        </Toast>
        <Toast type="error" open={toastErrorOpen} setOpen={setToastErrorOpen}>
          Verification failed. Please finish the task and try again.
        </Toast>
        {taskList &&
          taskList.map((task, index) => (
            <TaskCard
              key={index}
              data={task}
              setToastMessage={setToastMessage}
              refetch={refetch}
              refetchBasePoints={() => {}}
              setToastSuccessOpen={setToastSuccessOpen}
              setToastErrorOpen={setToastErrorOpen}
            />
          ))}
      </div>
      <div className="flex flex-row justify-center space-x-5 text-primary">
        {listData?.task_data?.length ? (
          <span
            className="cursor-pointer font-medium underline underline-offset-4 hover:opacity-50"
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
          >
            Load more
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ActiveTasks;
