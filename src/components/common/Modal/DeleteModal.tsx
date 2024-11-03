import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replace, useNavigate, useParams } from "react-router-dom";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  queryKey,
  id,
  deleteFn,
  queryKeyOptions = null,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: boothId } = useParams();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      deleteFn(id);
    },
    onSuccess: async () => {
      // queryClient.setQueryData([queryKey], (oldData: any) => {
      //   if (!oldData) return [];
      //   return oldData.filter((item: any) => item.id !== id);
      // });

      await queryClient.invalidateQueries(queryKey);

      setIsOpen(false);
      if (queryKey === "guide") {
        return navigate("/guide", { state: { key: false } });
      }
      if (queryKey === "maps") {
        return navigate("/guide");
      }
      if (queryKey === "boothDetail"){
        return navigate(`/booth/${boothId}`);
      }
      if (queryKey === "booth"){
        return navigate("/booth")
      }
      navigate(`/${queryKey}`, { replace: true });
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
      <DialogContent className="flex flex-col items-center justify-center w-[60%] max-w-[600px] mx-auto rounded-xl font-pretendard">
        <DialogTitle className="text-center text-xs mt-2">
          정말 삭제 하시겠습니까?
        </DialogTitle>
        <DialogDescription>
          <button
            type="submit"
            className="text-black border border-black px-8 rounded-full text-[10px]  hover:bg-main hover:border-main hover:text-black"
            onClick={handleDelete}
          >
            네
          </button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
