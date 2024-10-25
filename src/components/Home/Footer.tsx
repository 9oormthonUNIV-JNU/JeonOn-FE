import instagram from '@/../public/assets/svgs/instagram.svg';
import github from '@/../public/assets/svgs/github.svg';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="px-4 flex justify-between items-center">
      <div className="text-xs font-normal text-white">
        ©JeonOn. All rights reserved.
      </div>
      <div className="flex justify-center items-center gap-1">
        <div
          onClick={() => navigate('https://www.instagram.com/cnu_festival/')}
        >
          <img src={instagram} alt="instagram" />
        </div>
        <div>
          <img src={github} alt="github" />
        </div>
      </div>
    </div>
  );
}
