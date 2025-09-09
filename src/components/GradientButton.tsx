"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Import the base shadcn Button

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const GradientButton = React.forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "w-full py-6 text-lg rounded-full text-white",
          "bg-gradient-to-r from-pink-500 to-orange-500",
          "shadow-lg shadow-pink-500/50",
          "transition-all duration-300 ease-in-out",
          "hover:from-orange-500 hover:to-pink-500 hover:shadow-xl hover:shadow-orange-500/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
GradientButton.displayName = "GradientButton";

export { GradientButton };