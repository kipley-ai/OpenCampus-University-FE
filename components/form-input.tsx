import React from "react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength?: number;
  isRequired?: boolean;
  errorMessage?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  value,
  className,
  onChange,
  placeholder,
  maxLength = 100,
  isRequired = false,
  errorMessage,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium lg:text-sm">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={cn(
          "my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm",
          className,
        )}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </div>
  );
};

interface FormTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
  maxLength?: number;
  isRequired?: boolean;
  errorMessage?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  maxLength = 100,
  isRequired = false,
  errorMessage,
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium lg:text-sm">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className="my-1 w-full rounded-lg border-2 border-border bg-transparent text-xs lg:text-sm"
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
      {errorMessage && <p className="text-xs text-red-400">{errorMessage}</p>}
    </div>
  );
};
