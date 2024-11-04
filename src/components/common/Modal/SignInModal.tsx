import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/login';
import { AxiosError } from 'axios';

interface SignInModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLoginSuccess?: () => void;
}

export default function SignInModal({
  isOpen,
  setIsOpen,
  onLoginSuccess,
}: SignInModalProps) {
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  // 로그인 요청 처리
  const loginMutation = useMutation<{ token: string }, Error, void>({
    mutationFn: async () => {
      const response = await login(nickname, password);
      setError('');
      return response.data;
    },
    onSuccess: () => {
      setIsOpen(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
        if (error.response?.data?.error?.error_fields.nickname) {
          setError(error.response.data.error.error_fields.nickname);
        }
        if (error.response?.data?.error?.error_fields.password) {
          setError(error.response?.data?.error?.error_fields.password);
        } else {
          if (error.response?.data.error.message === '중복된 사용자입니다.') {
            setError('중복된 닉네임입니다.');
          }
        }
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="flex flex-col items-center justify-center w-[80%] max-w-[600px] mx-auto rounded-xl">
        <DialogTitle className="mb-4 mt-6 text-center text-xs">
          <span className="font-cafe24 text-main text-sm">'전대미문'</span>을 더
          재미있게 즐겨보세요!
        </DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full flex flex-col items-center">
            <Label htmlFor="nickname" className="sr-only">
              닉네임
            </Label>
            <Input
              minLength={2}
              maxLength={20}
              required
              id="nickname"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mb-2 block w-[90%] max-w-xs p-2 border border-gray-500 text-xs rounded-full"
            />
          </div>

          <div className="w-full flex flex-col items-center mb-2">
            <Label htmlFor="password" className="sr-only">
              비밀번호
            </Label>
            <Input
              minLength={8}
              maxLength={16}
              required
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-[90%] max-w-xs p-2 border border-gray-500 text-xs rounded-full"
            />
          </div>
          {error !== '' ? (
            <span className="text-[10px] text-[#F92D2D]">{error}</span>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-[35%] max-w-[150px] py-1.5 bg-white text-black border border-black rounded-lg text-xs hover:bg-black hover:text-white"
          >
            사용하기
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
