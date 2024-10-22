import favorites from '@/../public/assets/svgs/favorites.svg';
import bookmark from '@/../public/assets/svgs/bookmark.svg';

import { getContents } from '@/api/contents';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { formatDateToYYYYMMDD } from '@/utils/dateStr';

type TContent = {
  title: string;
  created_at: string;
  id: number;
  bookmark: boolean;
  description: string;
};

export default function Contents() {
  const navigate = useNavigate();

  const { data } = useQuery<TContent[]>({
    queryKey: ['contents'],
    queryFn: getContents,
  });

  console.log(data);

  return (
    <div className="h-screen overflow-x-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10 font-cafe24">
        콘텐츠
      </h1>
      <div className="flex flex-col justify-center items-center gap-5 px-5">
        {data?.map((item: TContent) => (
          <div
            key={item.id}
            id={item.id.toString()}
            className="w-full h-24 bg-main-guide rounded-2xl px-5 py-3 border border-[#0F0]"
            onClick={(e) => {
              navigate(`/contents/${e.currentTarget.id}`);
            }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl text-[#0F0]">{item.title}</h3>
              <div>
                {item?.bookmark ? (
                  <img src={favorites} alt="favorites" />
                ) : (
                  <img src={bookmark} alt="bookmark" />
                )}
              </div>
            </div>
            <div>
              <span className="text-xs font-normal text-white">
                {item.description}
              </span>
            </div>
            <div className="flex justify-end items-end">
              <span className="text-[10px] text-white">
                {formatDateToYYYYMMDD(item.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
