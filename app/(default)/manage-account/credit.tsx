import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useCreditUsage } from "@/hooks/api/user";
import { PaginationController } from "@/components/pagination-2/controller";
import { keepPreviousData } from "@tanstack/react-query";

export default function Credit() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { isPending, isError, error, data, isFetching } = useCreditUsage(
    {
      page: currentPage,
      page_size: pageSize,
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

  const { credit_usage_data: creditData, credit_usage_count: creditCount } =
    data.data.data;

  const totalPages = Math.ceil(creditCount / pageSize);

  return (
    <div className="flex w-full xl:w-5/6 flex-col rounded-2xl border border-border bg-box px-4 md:px-10 py-8">
      <h1 className="text-xl font-bold text-primary">Credit Usage</h1>
      <table className="mx-3 my-4 w-full text-left">
        <thead>
          <tr className="border-b border-border text-sm text-body">
            <th className="py-5 font-semibold">Title</th>
            <th className="py-5 font-semibold">Credit</th>
            <th className="py-5 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {creditData.map((credit: any, index: number) => {
            const isPositive = credit.credit_amount > 0;
            return (
              <tr key={index} className="text-md">
                <td className="py-5 font-medium text-heading">
                  {credit.product_name}
                </td>
                <td
                  className={`${
                    isPositive ? "!text-green-500" : "!text-red-400"
                  } py-5 font-semibold`}
                >
                  {(isPositive ? "+" : "") + credit.credit_amount}
                </td>
                <td className="py-5 font-medium text-gray-500">
                  {credit.created_at?.replace("T", " ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col items-center">
        <div
          className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
        >
          <FaSpinner size={20} className="animate-spin" />
          <p className="text-md text-gray-300">Loading</p>
        </div>
        <PaginationController
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
