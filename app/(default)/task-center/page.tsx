"use client";
import { useAppProvider } from "@/providers/app-provider";
import { useEffect, useState } from "react";
import { useTaskBasePoint } from "@/hooks/api/task";
import Header from "./header";
import TaskSection from "./task-rewards";
import ActiveTasks from "./active-tasks";
import Leaderboard from "./leaderboard";
import ReferralBonus from "./referral-bonus";

export default function TaskCenter() {
  const [tab, setTab] = useState<string>("active-tasks"); // active-tasks, leaderboard, referral-bonus
  const { setHeaderTitle } = useAppProvider();

  useEffect(() => {
    document.title = "Task Center";
  });

  const [startPoints, setStartPoints] = useState<number>(0);
  const [endPoints, setEndPoints] = useState<number>(0);

  const { data, refetch: refetchBasePoints } = useTaskBasePoint();

  useEffect(() => {
    if (data?.data?.base_point) {
      setStartPoints(endPoints);
      setEndPoints(data.data.base_point);
    }
  }, [data?.data?.base_point]);

  return (
    <div className="mt-2 max-w-[1100px] rounded-2xl border-2 border-border bg-sidebar px-3 pb-10 pt-3 md:p-10 xl:mt-4">
      <div>
        <h1 className="text-xl font-bold">Task Center</h1>
        <h6 className="text-sm font-medium text-body">
          Complete various tasks to earn OCU Credits!
        </h6>
      </div>
      <div className="mb-8 mt-4 flex items-center space-x-10 border-b-2 text-sm font-semibold text-primary">
        <button
          className={`${tab == "active-tasks" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("active-tasks")}
        >
          Active Tasks
        </button>
        {/* <button
          className={`${tab == "referral-bonus" ? "border-b-2 border-primary" : "opacity-50 hover:text-body hover:opacity-100"}`}
          onClick={() => setTab("referral-bonus")}
        >
          Referral Bonus
        </button> */}
        {/* <button className={`${tab == "leaderboard" ? "underline underline-offset-8" : "opacity-50"}`} onClick={() => setTab("leaderboard")}>Leaderboard</button> */}
      </div>
      {tab == "active-tasks" ? (
        <ActiveTasks />
      ) : tab == "leaderboard" ? (
        <Leaderboard />
      ) : tab == "referral-bonus" ? (
        <ReferralBonus />
      ) : null}
    </div>
  );
}
