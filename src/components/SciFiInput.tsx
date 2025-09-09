"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"; // Import the base shadcn Input

export interface SciFiInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SciFiInput = React.forwardRef<HTMLInputElement, SciFiInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          "flex h-14 w-full rounded-[30px] border border-indigo-500 bg-gray-900/70 px-4 py-3 text-lg text-white shadow-lg shadow-indigo-500/30 transition-all duration-300",
          "placeholder:text-indigo-300 placeholder:opacity-70",
          "focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-0 focus:shadow-xl focus:shadow-cyan-400/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
SciFiInput.displayName = "SciFiInput";

export { SciFiInput };