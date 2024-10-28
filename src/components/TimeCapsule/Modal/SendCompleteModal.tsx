
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

        <div className="text-center text-xs mb-3">
          오늘 시점으로 한 달 후 메일로 보내드릴게요.
          <br />
          <span className="block mt-2 font-normal">
            <span className="font-cafe24">"전대미문"</span>
            에서 행복한 추억 가득 채워보세요!
          </span>
        </div>

        <DialogClose asChild>
          <button
            className="px-10 py-1 bg-white text-black rounded-full border border-2 border-black text-sm hover:bg-blue-600"
            onClick={handleConfirm}
          >
            네
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
