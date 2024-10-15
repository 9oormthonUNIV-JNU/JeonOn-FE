import { useIsFetching } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  const isFetching = useIsFetching();
  const display = isFetching ? 'inherit' : 'none';

  // 로딩중 스핀바 띄우기
  return (
    <div
      style={{
        position: 'absolute',
        display,
        zIndex: 999,
        top: '45%',
        left: '45%',
      }}
    >
      <Loader2 color="white" className="h-10 w-10 animate-spin" />
    </div>
  );
}
