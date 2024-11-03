import { Outlet, useNavigate } from 'react-router-dom';
import Hamburger from './Home/Hamburger';
import back from '@/../public/assets/svgs/back.svg';
import searchIcon from '@/../public/assets/svgs/search_green.svg';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지가 변경될 때마다 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, [location]);

  const boothDetails = new RegExp('/booth/\\d+$');

  // 검색 버튼이 활성화되어야 하는 경로
  const isSearchEnabled =
    location.pathname === '/booth' || boothDetails.test(location.pathname);

  return (
    <div className="bg-black w-full">
      <div className="h-12 flex justify-between items-center px-5 pt-5">
        {location.pathname === '/' ? (
          <div></div>
        ) : (
          <div
            onClick={() => {
              if (location.pathname.startsWith('/guide/')) {
                console.log(1);
                return navigate('/guide', { state: { key: false } });
              }
              navigate(-1);
            }}
          >
            <img src={back} alt="backArrow" />
          </div>
        )}

        <div className="flex items-center">
          {/* 검색 버튼이 특정 경로에서만 활성화 */}
          {isSearchEnabled && (
            <div onClick={() => navigate('/booth/search')} className="mr-3">
              <img src={searchIcon} alt="searchIcon" />
            </div>
          )}

          <Hamburger />
        </div>
      </div>

      <Outlet />
    </div>
  );
}
