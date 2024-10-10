import { partnersBookmark, partnersBookmarkCancel } from '@/api/guide';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function usePartnersBookmark(partnerId: any) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userAction: 'UNLIKE' | 'LIKE') => {
      if (userAction === 'LIKE') {
        await partnersBookmark(partnerId);
      } else {
        await partnersBookmarkCancel(partnerId);
      }
    },
    onMutate: async (partnerId) => {
      await queryClient.cancelQueries({
        queryKey: ['partners-detail', partnerId],
      });
      const prevDetails = queryClient.getQueryData([
        'partners-detail',
        partnerId,
      ]);

      queryClient.setQueryData(['partners-detail', partnerId], (prev) => {});

      return { prevDetails };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(
        ['partners-detail', partnerId],
        context?.prevDetails,
      );
    },
    onSettled: () => {
      // 쿼리 무효화 또는 리페칭 등의 작업 수행
      queryClient.invalidateQueries({
        queryKey: ['partners-detail', partnerId],
      });
    },
  });
}
