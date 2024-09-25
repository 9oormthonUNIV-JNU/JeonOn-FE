import { Modal } from "@/components/ui/modal";

interface SignInModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SignInModal({ isOpen, setIsOpen }: SignInModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="'전대미문'을 더 재미있게 즐겨보세요!"
      description=""
    >
      <form className="mt-4 flex flex-col items-center">
        <input
          type="nickname"
          placeholder="닉네임"
          className="block w-[80%] max-w-xs p-2 mb-2 border border-gray-300 text-xs rounded-full"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="block w-[80%] max-w-xs p-2 mb-2 border border-gray-300 text-xs rounded-full"
        />
        <button
          type="submit"
          className="mt-3 w-[50%] max-w-[200px] py-1.5 bg-black text-white rounded-lg text-xs hover:bg-blue-600"
        >
          사용하기
        </button>
      </form>
    </Modal>
  );
}
