import { FaSpinner } from "react-icons/fa6";

export const LoadingSpinner = () => {
  return (
    <div className="flex h-32 w-full items-center justify-center gap-4 text-heading">
      <FaSpinner size={20} className="animate-spin" />
      <p className="text-md">Loading</p>
    </div>
  );
};
