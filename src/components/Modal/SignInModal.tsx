import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface SignInModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginSuccess: () => void; // 로그인 성공 시 호출할 콜백
}

export default function SignInModal({
  isOpen,
  setIsOpen,
  onLoginSuccess,
}: SignInModalProps) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 로그인 성공 처리
    if (nickname && password) {
      // 간단한 조건: 닉네임과 비밀번호가 모두 입력된 경우
      onLoginSuccess(); // 로그인 성공 콜백 호출
      setIsOpen(false); // 로그인 모달 닫기
    } else {
      alert("닉네임과 비밀번호를 입력하세요."); // 입력하지 않으면 경고
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="flex flex-col items-center justify-center w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogTitle className="mb-4 text-center text-xs">
          <br />
          '전대미문'을 더 재미있게 즐겨보세요!
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* 닉네임 입력 */}
          <div className="w-full flex flex-col items-center">
            <Label htmlFor="nickname" className="sr-only">
              닉네임
            </Label>
            <Input
              id="nickname"
              type="text"
              placeholder="닉네임"
              className="mb-2 block w-[80%] max-w-xs p-2 border border-gray-300 text-xs rounded-full"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)} // 닉네임 업데이트
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="w-full flex flex-col items-center mb-4">
            <Label htmlFor="password" className="sr-only">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="block w-[80%] max-w-xs p-2 border border-gray-300 text-xs rounded-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 비밀번호 업데이트
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="mt-3 w-[50%] max-w-[150px] py-1.5 bg-black text-white rounded-lg text-xs hover:bg-blue-600"
          >
            사용하기
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
