import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <button
        className={cn(
          "flex items-center justify-center gap-2 rounded-full border-2 border-primary px-3 py-1 text-sm font-medium text-heading hover:bg-primary hover:text-container disabled:border-0 disabled:bg-[#B8BABE] disabled:text-[#909295] max-md:text-xs",
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full border-2 border-primary px-3 py-1 text-sm font-medium text-heading text-primary hover:bg-primary hover:text-container disabled:border-0 disabled:bg-[#B8BABE] disabled:text-[#909295] max-md:text-xs",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;