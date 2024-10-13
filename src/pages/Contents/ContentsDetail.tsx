import bookmark from '@/../public/assets/svgs/guide/bookmark.svg';
// import favorites from '@/../public/assets/svgs/guide/favorites.svg';
import divideLine from '@/../public/images/divideLine.png';
import { getContentsDetail } from '@/api/contents';

import GuideCarousel from '@/components/guide/GuideCarousel';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function ContentsDetail() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['contents', id],
    queryFn: () => getContentsDetail(id),
  });

  console.log(data);
  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10">
        콘텐츠
      </h1>
      <div className="px-6">
        <div className="mb-1 flex justify-between items-center">
          <h1 className="text-white text-3xl">제목</h1>
          <div>
            <img src={bookmark} alt="favorites" />
          </div>
        </div>
        <div className="mb-3">
          <span className="text-white text-xs">2024-01-01</span>
        </div>

        <GuideCarousel />

        <div>
          <img src={divideLine} alt="divide-line" />
        </div>
      </div>
    </div>
  );
}
