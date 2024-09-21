import { Outlet, useNavigate } from 'react-router-dom';
import Hamburger from './Home/Hamburger';
import back from '@/../public/assets/svgs/back.svg';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="bg-black">
      <div className="h-12 flex justify-between items-center px-5 pt-5">
        {pathname === '/' ? (
          <div></div>
        ) : (
          <div onClick={() => navigate(-1)}>
            <img src={back} alt="backArrow" />
          </div>
        )}

        <Hamburger />
      </div>
      <Outlet />
    </div>
  );
}
