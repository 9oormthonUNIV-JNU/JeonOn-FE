// import favorites from '@/../public/assets/svgs/favorites.svg';
import bookmark from '@/../public/assets/svgs/bookmark.svg';
import { getContents } from '@/api/contents';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function Contents() {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['contents'],
    queryFn: getContents,
  });

  console.log(data);

  const items = [{ id: '1' }, { id: '2' }, { id: '3' }];
  return (
    <div className="h-screen overflow-hidden">
      <h1 className="text-[#0F0] text-[35px] text-center font-bold mb-10">
        콘텐츠
      </h1>
      <div className="flex flex-col justify-center items-center gap-5 px-5">
        {items.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="w-full h-24 bg-white rounded-2xl px-5 py-3"
            onClick={(e) => {
              console.log(e.currentTarget);
              navigate(`/contents/${e.currentTarget.id}`);
            }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl">제목</h3>
              <div>
                <img src={bookmark} alt="favorites" />
              </div>
            </div>
            <div>
              <span className="text-xs font-normal">
                본문내용본문내용 본문내용 본문내용
              </span>
            </div>
            <div className="flex justify-end items-end">
              <span className="text-[10px]">2024-01-01</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
