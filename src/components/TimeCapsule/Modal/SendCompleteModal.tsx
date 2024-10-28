
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface SendCompleteModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  onConfirm: () => void;
}

export default function SendCompleteModal({
  isOpen,
  setIsOpen,
  onConfirm,
}: SendCompleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    setIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setIsOpen()}>
      <DialogContent className="flex flex-col items-center justify-center w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogTitle className="mb-4 text-center text-lg font-bold">
          추억 등록 완료!
        </DialogTitle>

        <div className="text-center text-sm mb-6">
          오늘 시점으로 한 달 후 메일로 보내드릴게요.
          <br />
          <span className="block mt-2">
            '전대미문'에서 행복한 추억 가득 채워보세요!
          </span>
        </div>

        <DialogClose asChild>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg text-xs hover:bg-blue-600"
            onClick={handleConfirm}
          >
            네
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
