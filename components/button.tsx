import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

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
        className={cn("max-md:text-xs text-sm border-2 border-primary font-medium rounded-full px-2 md:px-3 py-1 hover:bg-primary hover:text-container disabled:bg-[#B8BABE] disabled:text-[#909295] disabled:border-0", className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn("max-md:text-xs text-sm text-primary border-2 border-primary font-medium rounded-full px-2 md:px-3 py-1 hover:bg-primary hover:text-container disabled:bg-[#B8BABE] disabled:text-[#909295] disabled:border-0", className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
