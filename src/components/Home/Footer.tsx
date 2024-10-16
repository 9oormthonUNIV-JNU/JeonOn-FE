import instagram from '@/../public/assets/svgs/instagram.svg';
import github from '@/../public/assets/svgs/github.svg';

export default function Footer() {
  return (
    <div className="px-4 flex justify-between items-center">
      <div className="text-xs font-normal text-white">
        ©JeonOn. All rights reserved.
      </div>
      <div className="flex justify-center items-center gap-1">
        <div>
          <img src={instagram} alt="instagram" />
        </div>
        <div>
          <img src={github} alt="github" />
        </div>
      </div>
    </div>
  );
}
