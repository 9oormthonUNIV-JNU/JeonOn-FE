import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DeleteModal({
  isOpen,
  setIsOpen,
  queryKey,
  id,
  deleteFn,
}) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      deleteFn(id);
    },
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDelete = async () => {
    deleteMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="flex flex-col items-center justify-center w-[60%] max-w-[600px] mx-auto rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-center text-xs mt-2">
          정말 삭제 하시겠습니까?
        </DialogTitle>
        <DialogDescription>
          <button
            className="text-black border border-black px-8 rounded-full text-[10px]"
            onClick={handleDelete}
          >
            네
          </button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
