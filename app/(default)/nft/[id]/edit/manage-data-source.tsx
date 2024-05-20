// ManageDataSources.jsx
import { useState, useEffect } from "react";
import CheckIcon from "public/images/check-icon-2.svg";
import ArrowIcon from "public/images/arrow-3-icon.svg";
import Image from "next/image";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useNftDetail } from "@/hooks/api/nft";
import { useParams } from "next/navigation";
import { useKBDetail, useKBItem, useDeleteKBItem } from "@/hooks/api/kb";
import Link from "next/link";
import { KBItem } from "@/lib/types";
import { PaginationController } from "@/components/pagination-2/controller";
import { keepPreviousData } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

const ManageDataSources = () => {
  const [checkHeader, setCheckHeader] = useState(false);
  const [checkRow, setCheckRow] = useState<boolean[]>([]);
  const deleteItemAPI = useDeleteKBItem();

  const { id } = useParams();

  const nftDetail = useNftDetail({
    sft_id: id as string,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  const {
    isPending,
    isError,
    error,
    data,
    isFetching,
    refetch: kbItemReftech,
    status,
  } = useKBItem(
    {
      kb_id: nftDetail.data?.data.data.kb_id as string,
      page: currentPage,
      page_size: pageSize,
    },
    keepPreviousData,
  );

  useEffect(() => {
    if (status === "success") {
      let temp = data?.data.data.kb_item_data.map(() => false);
      setCheckRow(temp);
    }
  }, [data?.data.data.kb_item_data]);

  const handleCheckRow = (index: number) => {
    let temp = [...checkRow];
    temp[index] = !temp[index];
    setCheckRow(temp);
  };

  const handleCheckAll = () => {
    let temp = [...checkRow];
    temp = temp.map(() => !checkHeader);
    setCheckRow(temp);
    setCheckHeader(!checkHeader);
  };

  const handleDelete = () => {
    const selectedIndexes = checkRow.reduce((acc: number[], value, index) => {
      if (value) {
        acc.push(index);
      }
      return acc;
    }, []);
    const selectedItem = selectedIndexes.map(
      (index) => data?.data.data.kb_item_data[index].item_name!!,
    );

    deleteItemAPI.mutate(
      {
        kb_id: nftDetail.data?.data.data.kb_id!!,
        items_name: selectedItem,
      },
      {
        onSuccess: () => {
          kbItemReftech();
        },
      },
    );
  };

  const kbDetail = useKBDetail({
    kb_id: nftDetail.data?.data.data.kb_id as string,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-gray-300">Loading</p>
      </div>
    );
  }

  if (isError) {
    kbItemReftech();
    return <div>Error: {error.message}</div>;
  }

  const { kb_item_data: kbItemData, kb_item_count: kbItemCount } =
    data.data.data;

  if (kbItemCount >= 0) {
    const totalPages = Math.ceil(kbItemCount / pageSize);

    return (
      <div className="flex flex-col sm:px-6 md:pb-12 lg:px-0">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">
            Manage Data Sources
          </h1>
          {/* Add New Button */}
          <Link href={"/nft/" + id + "/add"}>
            <button
              className="button flex items-center justify-center gap-2 rounded rounded-md px-4 py-1.5"
              type="submit"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="stroke-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h5 className="text-sm leading-none">Add New</h5>
            </button>
          </Link>
        </div>

        {/* Selected count and Delete Button */}
        {checkRow.includes(true) ? (
          <div className="mb-4 mt-0 flex items-center justify-end">
            <div className="flex items-center">
              <span className="mr-4 text-sm">
                {checkRow.filter((value) => value === true).length} selected
              </span>
              <button
                className="flex items-center justify-center rounded-md border-2 border-[#F85C72] bg-transparent px-4 py-1.5 hover:opacity-75"
                type="submit"
                onClick={handleDelete}
              >
                <h5 className="flex-grow text-sm font-semibold text-[#F85C72]">
                  Delete
                </h5>
              </button>
            </div>
          </div>
        ) : (
          <></>
          // <div className="flex items-center justify-end">
          // <div>
          // <button className="flex items-center justify-center rounded-md border-2 border-[#F85C72] bg-transparent py-1.5 px-4 opacity-0">
          //   <h5 className="flex-grow text-sm font-semibold text-[#F85C72]">
          //     Delete
          //   </h5>
          // </button>
          // </div>
          // </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-b border-[#393E44]">
            <thead className="bg-container text-left">
              <tr>
                <th className="px-3 py-7">
                  <div
                    className={`rounded  ${checkHeader ? "bg-primary" : "border-2 border-[#D1D5DB] bg-transparent"} flex h-4 w-4 items-center justify-center`}
                    onClick={() => handleCheckAll()}
                  >
                    <svg
                      width="10"
                      height="9"
                      viewBox="0 0 10 9"
                      className={`${checkHeader ? "fill-container" : "hidden"}`}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3.5 5.375L1.5 3.375L0 4.875L3.5 8.375L10 1.875L8.5 0.375L3.5 5.375Z" />
                    </svg>
                  </div>
                </th>{" "}
                {/* Header Checkbox */}
                <th className="text-sm font-medium">From</th>
                <th className="text-sm font-medium">Type</th>
                <th className="text-sm font-medium">Size</th>
                <th className="text-sm font-medium">Last Updated</th>
                <th className="text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {kbItemData.map((row: KBItem, index: any) => (
                <tr key={index}>
                  <td className="px-3 py-7">
                    <div
                      className={`rounded  ${checkRow[index] ? "bg-primary" : "border-2 border-[#D1D5DB] bg-transparent"} flex h-4 w-4 items-center justify-center`}
                      onClick={() => handleCheckRow(index)}
                    >
                      <svg
                        width="10"
                        height="9"
                        viewBox="0 0 10 9"
                        className={`${checkRow[index] ? "fill-container" : "hidden"}`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3.5 5.375L1.5 3.375L0 4.875L3.5 8.375L10 1.875L8.5 0.375L3.5 5.375Z" />
                      </svg>
                    </div>
                  </td>{" "}
                  {/* Row Checkbox */}
                  <td className="max-w-44 truncate pr-3 text-sm font-medium">
                    {row.item_name}
                  </td>
                  <td className="text-sm font-medium capitalize">
                    {row.item_type}
                  </td>
                  <td className="text-sm font-medium">{row.size}</td>
                  <td className="text-sm font-medium">{row.created_at}</td>
                  <td className="text-sm font-medium">
                    {/* <span
                      className={`inline-flex rounded-full text-left leading-5 ${row.status === "Completed" ? "text-[#BDFF9E]" : "text-[#F85C72]"}`}
                    > */}
                    <span
                      className={`inline-flex rounded-full text-left capitalize leading-5 ${row.status === "completed" ? "text-[#00EDBE]" : "text-[#F85C72]"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-row items-center justify-center space-x-12">
          <div className="flex flex-col items-center">
            {isFetching ? (
              <div className="flex w-full items-center justify-center gap-4">
                <FaSpinner size={20} className="animate-spin" />
                <p className="text-md text-gray-300">Loading</p>
              </div>
            ) : (
              <>
                {kbItemCount === 0 ? (
                  <div className="text-center">
                    <p className="text-lg text-gray-500">
                      Oh, it seems you got no data here. Why not try adding
                      some?
                    </p>
                  </div>
                ) : (
                  <PaginationController
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalPages={Math.ceil(kbItemCount / pageSize)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default ManageDataSources;
