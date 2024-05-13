"use client";
import { useAppProvider } from "@/providers/app-provider"
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
        setHeaderTitle("Task Center");
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
        <div className="my-12 mx-10 rounded-xl border-2 border-border bg-sidebar px-10 py-12">
            {/* <Header startPoints={startPoints} endPoints={endPoints} />
            <TaskSection refetchBasePoints={refetchBasePoints} /> */}
            <div>
              <h1 className="text-xl font-bold">Task Center</h1>
              <h6 className="text-sm">Complete various tasks to earn OC points!</h6>
            </div>
            <div className="flex items-center mt-4 mb-8 space-x-10 py-0.5 border-b-2 text-primary font-semibold">
              <button className={`${tab == "active-tasks" ? "underline underline-offset-8" : "opacity-50"}`} onClick={() => setTab("active-tasks")}>Active Tasks</button>
              <button className={`${tab == "referral-bonus" ? "underline underline-offset-8" : "opacity-50"}`} onClick={() => setTab("referral-bonus")}>Referral Bonus</button>
              <button className={`${tab == "leaderboard" ? "underline underline-offset-8" : "opacity-50"}`} onClick={() => setTab("leaderboard")}>Leaderboard</button>
            </div>
            {
              tab == "active-tasks" ? 
              <ActiveTasks />
              : tab == "leaderboard" ?
              <Leaderboard />
              : tab == "referral-bonus" ?
              <ReferralBonus /> : null
            }
        </div>
    )
}
