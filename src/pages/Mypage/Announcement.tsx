import favorites from '@/../public/assets/svgs/favorites.svg';

export default function Announcement() {
  return (
    <div className="h-screen">
      <div className="mb-8">
        <h1 className="text-[#0F0] text-[35px] text-center font-bold">마이</h1>
        <h3 className="text-xl text-white text-center">즐겨찾기</h3>
      </div>
      <div className="px-5">
        <div className="mb-4">
          <h2 className="text-xl text-white">공지사항 및 프로그램</h2>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-24 bg-white rounded-2xl px-5 py-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl">제목</h3>
              <div>
                <img src={favorites} alt="favorites" />
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
          <div className="w-full h-24 bg-white rounded-2xl px-5 py-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl">제목</h3>
              <div>
                <img src={favorites} alt="favorites" />
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
          <div className="w-full h-24 bg-white rounded-2xl px-5 py-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl">제목</h3>
              <div>
                <img src={favorites} alt="favorites" />
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
        </div>
      </div>
    </div>
  );
}
