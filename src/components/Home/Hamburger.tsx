import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import hamburger from '@/../public/assets/svgs/hamburger.svg';
// import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

// type Checked = DropdownMenuCheckboxItemProps['checked'];

export default function Hamburger() {
  //   const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  //   const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  //   const [showPanel, setShowPanel] = useState<Checked>(false);
  const navigate = useNavigate();
  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-white">
            <img src={hamburger} alt="hamburger" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36 mr-2 mt-2">
          <DropdownMenuCheckboxItem>MY</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>안내</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>타임테이블</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>부스</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>타임캡슐</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onClick={() => navigate('/feedback')}>
            피드백
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem disabled>관리자</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
