"use client";
import { useState } from "react";
import { KF_TITLE } from "@/utils/constants";
import Image from "next/image";
import Credit from "./credit";
import Dashboard from "./dashboard";
import Deposit from "./deposit";
import Earning from "./earning";
import Withdraw from "./withdraw";
import CreatorOverview from "./creator";

export default function ManageAccount() {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <div className="flex flex-col bg-container">
      <title>{KF_TITLE + "Manage Account"}</title>
      <ul className="mb-2 flex w-full gap-6 border-b-2 border-secondary text-sm font-semibold dark:border-border xs:gap-12 xl:hidden">
        <li
          onClick={() => setSelectedPage("dashboard")}
          className={`relative top-[1px] cursor-pointer ${selectedPage === "dashboard" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
        >
          Account
        </li>
        <li
          onClick={() => setSelectedPage("creator")}
          className={`relative top-[1px] cursor-pointer ${selectedPage === "creator" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
        >
          Creator
        </li>
        <li
          onClick={() => setSelectedPage("deposit")}
          className={`relative top-[1px] cursor-pointer ${selectedPage === "deposit" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
        >
          Deposit
        </li>
        <li
          onClick={() => setSelectedPage("credit")}
          className={`relative top-[1px] cursor-pointer ${selectedPage === "credit" ? "border-b-2 border-primary text-primary" : "text-secondary hover:brightness-50 dark:text-heading"}`}
        >
          Credit
        </li>
      </ul>
      <div className="mt-2 flex bg-container xl:mt-4">
        <div className="mr-8 hidden h-min w-1/4 flex-col rounded-2xl border border-border bg-box px-4 py-6 font-medium xl:flex">
          {/* Account Information Section */}
          <div
            className={`flex cursor-pointer px-3 py-3 ${selectedPage == "dashboard" ? "text-primary" : "text-secondary-text hover:text-primary"}`}
            onClick={() => setSelectedPage("dashboard")}
          >
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.37149 0.667968L8.37143 0.667907C7.98993 0.287735 7.47894 0.0750031 6.94263 0.0750031L2.34375 0.075C1.22871 0.075 0.325 0.978709 0.325 2.09375L0.3252 13.9063C0.3252 15.0213 1.22891 15.925 2.34395 15.925H10.2188C11.3338 15.925 12.2375 15.0213 12.2375 13.9062V5.36987C12.2375 4.8337 12.0262 4.32263 11.6476 3.94409L8.37149 0.667968ZM10.8792 4.70937L10.8795 4.70967C10.9629 4.79163 11.0234 4.88972 11.0668 4.99688H7.75781C7.51472 4.99688 7.31563 4.79778 7.31563 4.55469V1.24599C7.42245 1.29054 7.5204 1.35057 7.6031 1.43325C7.6031 1.43325 7.6031 1.43325 7.60311 1.43325L10.8792 4.70937ZM11.1531 13.9063C11.1531 14.4213 10.7338 14.8406 10.2188 14.8406H2.34375C1.82873 14.8406 1.40937 14.4213 1.40937 13.9063V2.09375C1.40937 1.57873 1.82873 1.15938 2.34375 1.15938H6.23125V4.55469C6.23125 5.39749 6.91501 6.08125 7.75781 6.08125H11.1531V13.9063ZM3.27813 8.49219C3.27813 8.79051 3.522 9.03438 3.82031 9.03438H8.74219C9.04051 9.03438 9.28438 8.79051 9.28438 8.49219C9.28438 8.19387 9.04051 7.95 8.74219 7.95H3.82031C3.522 7.95 3.27813 8.19387 3.27813 8.49219ZM3.82031 9.91875C3.522 9.91875 3.27813 10.1626 3.27813 10.4609C3.27813 10.7593 3.522 11.0031 3.82031 11.0031H8.74219C9.04168 11.0031 9.28438 10.7604 9.28438 10.4609C9.28438 10.1614 9.04043 9.91875 8.74219 9.91875H3.82031ZM3.82031 11.8875C3.522 11.8875 3.27813 12.1314 3.27813 12.4297C3.27813 12.728 3.522 12.9719 3.82031 12.9719H8.74219C9.04168 12.9719 9.28438 12.7291 9.28438 12.4297C9.28438 12.1302 9.04043 11.8875 8.74219 11.8875H3.82031Z"
                strokeWidth="0.1"
              />
            </svg>

            <h3 className="ml-3 text-sm">Account Info</h3>
          </div>
          {/* Creator Overview Section */}
          <div
            className={`flex cursor-pointer px-3 py-3 ${selectedPage == "creator" ? "text-primary" : "text-secondary-text hover:text-primary"}`}
            onClick={() => setSelectedPage("creator")}
          >
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.37149 0.667965L8.37143 0.667904C7.98993 0.287732 7.47894 0.075 6.94263 0.075H2.34375C1.22871 0.075 0.325 0.978709 0.325 2.09375L0.3252 13.9063C0.3252 15.0213 1.22891 15.925 2.34395 15.925H10.2188C11.3338 15.925 12.2375 15.0213 12.2375 13.9062V5.36987C12.2375 4.8337 12.0262 4.32263 11.6476 3.94409L8.37149 0.667965ZM10.8792 4.70937L10.8795 4.70967C10.9629 4.79162 11.0234 4.88972 11.0668 4.99687H7.75781C7.51472 4.99687 7.31563 4.79778 7.31563 4.55469V1.24598C7.42245 1.29054 7.5204 1.35057 7.6031 1.43324C7.6031 1.43325 7.6031 1.43325 7.60311 1.43325L10.8792 4.70937ZM3.87031 14.8406V14.3984C3.87031 13.6109 4.5093 12.9719 5.29688 12.9719H7.26562C8.0535 12.9719 8.69219 13.6106 8.69219 14.3984V14.8406H3.87031ZM11.1531 13.9062C11.1531 14.4213 10.7338 14.8406 10.2188 14.8406H9.77656V14.3984C9.77656 13.0118 8.65229 11.8875 7.26562 11.8875H5.29688C3.91021 11.8875 2.78594 13.0118 2.78594 14.3984V14.8406H2.34375C1.82873 14.8406 1.40937 14.4213 1.40937 13.9062V2.09375C1.40937 1.57873 1.82873 1.15937 2.34375 1.15937H6.23125V4.55469C6.23125 5.39749 6.91501 6.08125 7.75781 6.08125H11.1531V13.9062ZM6.28125 6.96562C5.16775 6.96562 4.2625 7.87087 4.2625 8.98438C4.2625 10.0979 5.16618 11.0031 6.28125 11.0031C7.39629 11.0031 8.3 10.0994 8.3 8.98438C8.3 7.86931 7.39473 6.96562 6.28125 6.96562ZM6.28125 9.91875C5.76623 9.91875 5.34688 9.4994 5.34688 8.98438C5.34688 8.46935 5.76623 8.05 6.28125 8.05C6.79627 8.05 7.21562 8.46935 7.21562 8.98438C7.21562 9.49936 6.79508 9.91875 6.28125 9.91875Z"
                strokeWidth="0.1"
              />
            </svg>

            <h3 className="ml-3 text-sm">Creator Overview</h3>
          </div>
          <div
            className={`flex cursor-pointer px-3 py-3 ${selectedPage == "deposit" ? "text-primary" : "text-secondary-text hover:text-primary"}`}
            onClick={() => setSelectedPage("deposit")}
          >
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0625 0.125H1.0375C0.602575 0.125 0.25 0.477575 0.25 0.912499V13.7172C0.252901 13.9257 0.334472 14.1254 0.478375 14.2764L1.96675 15.7568C2.03784 15.8333 2.13795 15.8762 2.24237 15.875H2.47075C2.57517 15.8762 2.67528 15.8333 2.74637 15.7568L4.18749 14.3C4.26019 14.2258 4.35926 14.1833 4.46312 14.1819C4.5668 14.1842 4.66556 14.2265 4.73874 14.3L6.16412 15.7253C6.23521 15.8018 6.33531 15.8447 6.43974 15.8435H6.66811C6.77254 15.8447 6.87264 15.8018 6.94374 15.7253L8.37699 14.3C8.44968 14.2258 8.54875 14.1833 8.65261 14.1819C8.75078 14.1881 8.84325 14.2301 8.91249 14.3L10.3379 15.7253C10.409 15.8018 10.5091 15.8447 10.6135 15.8435H10.8419C10.9463 15.8447 11.0464 15.8018 11.1175 15.7253L12.6216 14.3C12.7671 14.1533 12.8491 13.9553 12.85 13.7487V0.912499C12.85 0.477575 12.4974 0.125 12.0625 0.125ZM9.30622 6.42499C9.52369 6.42499 9.69997 6.2487 9.69997 6.03124V5.24374C9.69997 5.02628 9.52369 4.84999 9.30622 4.84999H3.79373C3.57627 4.84999 3.39998 5.02628 3.39998 5.24374V6.03124C3.39998 6.2487 3.57627 6.42499 3.79373 6.42499H9.30622ZM6.94373 9.57499C7.16119 9.57499 7.33748 9.3987 7.33748 9.18124V8.39374C7.33748 8.17628 7.16119 7.99999 6.94373 7.99999H3.79373C3.57627 7.99999 3.39998 8.17628 3.39998 8.39374V9.18124C3.39998 9.3987 3.57627 9.57499 3.79373 9.57499H6.94373ZM10.7552 13.922L11.275 13.4022V1.69999H1.82501V13.3865L2.36051 13.922L3.32913 12.9533C3.47581 12.8079 3.67379 12.7258 3.88038 12.725H5.02225C5.22885 12.7258 5.42682 12.8079 5.5735 12.9533L6.55 13.9298L7.56587 12.9533C7.71449 12.8059 7.91568 12.7238 8.125 12.725H9.2275C9.43409 12.7258 9.63207 12.8079 9.77875 12.9533L10.0465 13.2211L10.1725 13.3471L10.7552 13.922Z"
              />
            </svg>

            <h3 className="ml-3 text-sm">Deposit History</h3>
          </div>
          {/* Credit Usage */}
          <div
            className={`flex cursor-pointer px-3 py-3 ${selectedPage == "credit" ? "text-primary" : "text-secondary-text hover:text-primary"}`}
            onClick={() => setSelectedPage("credit")}
          >
            <svg
              width="13"
              height="16"
              viewBox="0 0 13 16"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.82031 4.1125H8.74219C9.04051 4.1125 9.28438 3.86863 9.28438 3.57031C9.28438 3.272 9.04051 3.02813 8.74219 3.02813H8.06173C8.20963 2.74887 8.3 2.43338 8.3 2.09375C8.3 0.978709 7.39629 0.075 6.28125 0.075C5.16621 0.075 4.2625 0.978709 4.2625 2.09375C4.2625 2.43332 4.35229 2.74881 4.50056 3.02813H3.82031C3.522 3.02813 3.27813 3.272 3.27813 3.57031C3.27813 3.86863 3.522 4.1125 3.82031 4.1125ZM6.28125 1.15937C6.79627 1.15937 7.21562 1.57873 7.21562 2.09375C7.21562 2.60877 6.79627 3.02813 6.28125 3.02813C5.76623 3.02813 5.34688 2.60877 5.34688 2.09375C5.34688 1.57877 5.76742 1.15937 6.28125 1.15937ZM10.2188 2.04375C9.91908 2.04375 9.67656 2.28627 9.67656 2.58594C9.67656 2.8857 9.92052 3.12812 10.2188 3.12812C10.7338 3.12812 11.1531 3.54688 11.1531 4.0625V13.9062C11.1531 14.4219 10.7338 14.8406 10.2188 14.8406H2.34375C1.82871 14.8406 1.40937 14.4219 1.40937 13.9062V4.0625C1.40937 3.54688 1.82871 3.12812 2.34375 3.12812C2.64342 3.12812 2.88594 2.88561 2.88594 2.58594C2.88594 2.28626 2.64329 2.04375 2.34375 2.04375C1.23024 2.04375 0.325 2.94962 0.325 4.0625V13.9062C0.325 15.0191 1.23024 15.925 2.34375 15.925H10.2188C11.3323 15.925 12.2375 15.0191 12.2375 13.9062V4.0625C12.2375 2.94962 11.3323 2.04375 10.2188 2.04375ZM2.53984 8C2.53984 8.43521 2.89292 8.78828 3.32812 8.78828C3.76365 8.78828 4.11641 8.43519 4.11641 8C4.11641 7.56449 3.76364 7.21172 3.32812 7.21172C2.89299 7.21172 2.53984 7.56319 2.53984 8ZM3.32812 10.1648C2.89293 10.1648 2.53984 10.5176 2.53984 10.9531C2.53984 11.3883 2.89292 11.7414 3.32812 11.7414C3.76365 11.7414 4.11641 11.3883 4.11641 10.9531C4.11641 10.5164 3.76487 10.1648 3.32812 10.1648ZM9.72656 7.45781H5.78906C5.49075 7.45781 5.24687 7.70168 5.24687 8C5.24687 8.29823 5.4893 8.54219 5.78906 8.54219H9.72656C10.0249 8.54219 10.2688 8.29832 10.2688 8C10.2688 7.70168 10.0249 7.45781 9.72656 7.45781ZM9.72656 10.4109H5.78906C5.49075 10.4109 5.24687 10.6548 5.24687 10.9531C5.24687 11.2514 5.4893 11.4953 5.78906 11.4953H9.72656C10.0262 11.4953 10.2688 11.2528 10.2688 10.9531C10.2688 10.6534 10.0248 10.4109 9.72656 10.4109Z"
                strokeWidth="0.1"
              />
            </svg>

            <h3 className="ml-3 text-sm">Credit Usage</h3>
          </div>
        </div>
        {selectedPage === "credit" ? (
          <Credit />
        ) : selectedPage === "creator" ? (
          <CreatorOverview />
        ) : selectedPage === "dashboard" ? (
          <Dashboard />
        ) : selectedPage === "deposit" ? (
          <Deposit />
        ) : selectedPage === "earning" ? (
          <Earning />
        ) : selectedPage === "withdraw" ? (
          <Withdraw />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
