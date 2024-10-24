import * as React from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui에서 가져온 Button
import { cn } from "@/lib/utils";

export interface WhiteBorderBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const WhiteBorderBtn = React.forwardRef<HTMLButtonElement, WhiteBorderBtnProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "bg-transparent border border-white text-white text-[15px] font-semibold font-['Noto Sans KR'] rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

WhiteBorderBtn.displayName = "WhiteBorderBtn";

export { WhiteBorderBtn };
