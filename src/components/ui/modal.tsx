import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import close from '@/../public/assets/svgs/close.svg';

export interface ModalProps extends React.ComponentPropsWithoutRef<typeof Dialog.Root> {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;  // 모달 열림 상태 추가
  onClose: () => void;  // 모달 닫기 함수 추가
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ title, description, children, isOpen, onClose, ...props }, ref) => {
    return (
      <Dialog.Root open={isOpen} onOpenChange={onClose} {...props}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content
            ref={ref}
            className={cn(
              "fixed top-1/2 left-1/2 w-[400px] transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg",
              "w-[90%] max-w-md",  // 기본 너비를 90%로 설정, 최대 너비를 400px로 제한
              "sm:max-w-lg",  // 작은 화면일 때 최대 너비 600px로
              "lg:max-w-xl"   // 더 큰 화면에서는 최대 768px로 설정
            )}
          >
            <Dialog.Title className="text-center font-lite text-xs font-bold">{title}</Dialog.Title>
            {description && (
              <Dialog.Description className="mb-4 text-sm text-gray-500">
                {description}
              </Dialog.Description>
            )}
            <div className="modal-body">{children}</div>
            <Dialog.Close asChild>
              <button className="absolute top-3 right-3">
                <img src={close} alt="close"></img>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

Modal.displayName = "Modal";
