import { getTimeStringLocal } from "@/lib/string";
import { PaginationController } from "@/components/pagination-2/controller";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg";
import { useDepositHistory } from "@/hooks/api/user";
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

export default function Deposit() {
  return (
    <>
      <div className="flex w-full flex-col rounded-2xl border border-border bg-box px-4 py-8 md:px-10 xl:w-5/6">
        <h1 className="text-xl font-bold text-primary">Deposit History</h1>
        <ContentListComponent />
      </div>
    </>
  );
}

const ContentListComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { isPending, isError, error, data, isFetching } = useDepositHistory(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const {
    deposit_history_data: deposits,
    deposit_history_count: depositCount,
  } = data?.data?.data;

  const totalPages = Math.ceil(depositCount / pageSize);

  if (depositCount > 0) {
    return (
      <div className="flex flex-col">
        <div className="w-full overflow-x-auto">
          <table className="my-4 min-w-full divide-y divide-border rounded-xl">
            <thead className="bg-transparent">
              <tr>
                <th
                  scope="col"
                  className="py-5 pr-2 text-left text-sm font-semibold text-body"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-2 py-5 text-left text-sm font-semibold text-body"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-2 py-5 text-left text-sm font-semibold text-body"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-2 py-5 text-left text-sm font-semibold text-body"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-2 py-5 text-left text-sm font-semibold text-body"
                >
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-transparent">
              {deposits?.map((deposit: any, index: number) => {
                return (
                  <tr key={index} className="">
                    <td className="whitespace-nowrap py-4 pr-2 font-medium text-heading">
                      {deposit.description}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 font-medium text-heading">
                      {`${deposit.pay_amount} ${deposit.pay_currency}`}
                    </td>
                    <td className="whitespace-nowrap px-2 py-4 font-medium text-gray-500">
                      {getTimeStringLocal(new Date(deposit.created_at))}
                    </td>
                    {/* <td
										className={`${
											deposit.status == "Expired"
												? "text-red-500"
												: "text-green-400"
										} px-2 py-4 whitespace-nowrap`}
									>
										{deposit.status}
									</td> */}
                    <td
                      className={`${
                        deposit.pay_status ? "text-green-400" : "text-red-500"
                      } whitespace-nowrap px-2 py-4 font-medium`}
                    >
                      {deposit.pay_status ? "Paid" : "Expired"}
                    </td>
                    <td>
                      <Link href="#">
                        <div className="flex pl-1 text-primary hover:cursor-pointer hover:text-primary-dark">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.625 1.8125V6.40625H18.2188L13.625 1.8125ZM14.1992 15.5938H8.45703C8.14121 15.5938 7.88281 15.8521 7.88281 16.168C7.88281 16.4838 8.14121 16.7422 8.45703 16.7422H14.1992C14.5163 16.7422 14.7734 16.4851 14.7734 16.168C14.7734 15.8509 14.515 15.5938 14.1992 15.5938ZM14.1992 13.2969H8.45703C8.14121 13.2969 7.88281 13.5553 7.88281 13.8711C7.88281 14.1869 8.14121 14.4453 8.45703 14.4453H14.1992C14.5163 14.4453 14.7734 14.1882 14.7734 13.8711C14.7734 13.554 14.515 13.2969 14.1992 13.2969ZM14.1992 11H8.45703C8.14121 11 7.88281 11.2584 7.88281 11.5742C7.88281 11.89 8.14121 12.1484 8.45703 12.1484H14.1992C14.515 12.1484 14.7734 11.89 14.7734 11.5742C14.7734 11.2584 14.515 11 14.1992 11Z"
                              fill="currentColor"
                            />
                            <path
                              opacity="0.4"
                              d="M13.625 6.40625V1.8125H6.16016C5.20875 1.8125 4.4375 2.58375 4.4375 3.53516V18.4648C4.4375 19.4159 5.20875 20.1875 6.16016 20.1875H16.4961C17.4475 20.1875 18.2188 19.4163 18.2188 18.4648V6.40625H13.625ZM14.1992 16.7422H8.45703C8.14121 16.7422 7.88281 16.4838 7.88281 16.168C7.88281 15.8521 8.14121 15.5938 8.45703 15.5938H14.1992C14.5163 15.5938 14.7734 15.8509 14.7734 16.168C14.7734 16.4851 14.515 16.7422 14.1992 16.7422ZM14.1992 14.4453H8.45703C8.14121 14.4453 7.88281 14.1869 7.88281 13.8711C7.88281 13.5553 8.14121 13.2969 8.45703 13.2969H14.1992C14.5163 13.2969 14.7734 13.554 14.7734 13.8711C14.7734 14.1882 14.515 14.4453 14.1992 14.4453ZM14.1992 12.1484H8.45703C8.14121 12.1484 7.88281 11.89 7.88281 11.5742C7.88281 11.2584 8.14121 11 8.45703 11H14.1992C14.515 11 14.7734 11.2584 14.7734 11.5742C14.7734 11.89 14.515 12.1484 14.1992 12.1484Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <PaginationController
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    );
  }

  return (
    <div className="mt-8">
      <NoData />
    </div>
  );
};

export const NoData = () => {
  return (
    <div className="mb-16 mt-1 flex flex-col items-center justify-center gap-4">
      <Image src="/images/money.svg" width={77} height={77} alt={"No Data"} />
      <p className="font-semibold lowercase text-primary">No data yet</p>
    </div>
  );
};
