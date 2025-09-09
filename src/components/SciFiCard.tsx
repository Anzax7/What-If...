"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card"; // Import the base shadcn Card

interface SciFiCardProps extends React.ComponentPropsWithoutRef<typeof Card> {}

const SciFiCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  SciFiCardProps
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "rounded-[20px] border border-indigo-600 bg-gray-900/70 shadow-lg shadow-indigo-500/30 backdrop-blur-sm", // Base styles
      "transition-all duration-300 ease-in-out", // Smooth transitions
      "hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/50", // Hover effects
      className
    )}
    {...props}
  />
));
SciFiCard.displayName = "SciFiCard";

export { SciFiCard };