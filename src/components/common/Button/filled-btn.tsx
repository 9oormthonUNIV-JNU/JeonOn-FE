import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FilledBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "py-1.5 bg-[#0F0] rounded-full border border-[#0F0] text-center text-black text-[15px] font-semibold font-['Noto Sans KR'] whitespace-nowrap",
          "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FilledBtn.displayName = "FilledBtn";

export { FilledBtn };
