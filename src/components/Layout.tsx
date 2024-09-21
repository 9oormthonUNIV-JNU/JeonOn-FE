import { Outlet } from 'react-router-dom';
import Hamburger from './Home/Hamburger';

export default function Layout() {
  return (
    <div className="bg-black">
      <div className="h-14 flex justify-end items-center px-5">
        <Hamburger />
      </div>
      <Outlet />
    </div>
  );
}
