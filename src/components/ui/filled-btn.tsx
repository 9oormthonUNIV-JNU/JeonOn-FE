import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const FilledBtn = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // 고정된 스타일은 유지
          "w-[99px] h-[34px] p-2.5 bg-[#0F0] rounded-full border border-[#0F0] text-center text-black text-[15px] font-semibold leading-[15px] font-['Noto Sans KR']",
          className // 외부에서 전달받은 클래스 적용
        )}
        {...props}
      >
        {children} {/* 내부 내용은 children으로 대체 */}
      </button>
    );
  }
);

FilledBtn.displayName = "FilledBtn";

export { FilledBtn };
