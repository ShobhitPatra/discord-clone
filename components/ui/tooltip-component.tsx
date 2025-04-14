"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipComponentProps {
  side: "right" | "left" | "bottom" | "top";
  onClickAction?: () => void;
  label: string | React.ReactNode;
  content: string;
}

const TooltipComponent = ({
  side,
  label,
  content,
  onClickAction,
}: TooltipComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={onClickAction}>{label}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipComponent;
