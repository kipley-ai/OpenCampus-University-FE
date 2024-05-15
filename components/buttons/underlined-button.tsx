interface UnderlinedButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const UnderlinedButton = ({
  children,
  className,
  ...props
}: UnderlinedButtonProps) => {
  return (
    <button
      className={`text-xs font-medium text-primary underline underline-offset-2 transition-all hover:text-[#1016BC] hover:underline-offset-4 disabled:text-[#909295] xl:text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
