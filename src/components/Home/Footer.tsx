import instagram from '@/../public/svgs/instagram.svg';
import goorm from '@/../public/svgs/goorm.svg';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="px-4 flex flex-col justify-center items-center mb-5 bg-transparent">
      <div className="text-sm font-normal text-white">
        ©JeonOn. All rights reserved.
      </div>
      <div className="text-[10px] font-normal text-white mb-5">
        ©2024 In collaboration with 전딧불이.
      </div>
      <div className="flex justify-center items-center gap-7">
        <div
          onClick={() => {
            window.open('https://www.instagram.com/cnu_festival/', '_blank');
          }}
        >
          <img src={instagram} alt="instagram" />
        </div>
        <div onClick={() => navigate('/jeonOn-introduce')}>
          <img src={goorm} alt="goorm" />
        </div>
      </div>
    </div>
  );
}
