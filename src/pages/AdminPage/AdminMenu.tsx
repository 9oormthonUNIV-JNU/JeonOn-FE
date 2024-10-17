import rightArrow from "@/../public/assets/svgs/rightArrow.svg";
import plus from "@/../public/assets/svgs/plus.svg";
import { useNavigate } from "react-router-dom";

type MenuType = {
  feat: string;
  icon: string;
};

const menus: MenuType[] = [
  { feat: "지도", icon: plus },
  { feat: "제휴업체", icon: plus },
  { feat: "게시글 확인", icon: rightArrow },
];

type MenuItemProps = {
  onClick: (feat: string) => void;
};

const MenuItem = ({ onClick }: MenuItemProps) => {
  return (
    <>
      {menus.map((menu) => {
        const featClasses = `flex ml-auto ${
          menu.feat === "게시글 확인" ? "pr-1" : ""
        }`;
        return (
          <div className="w-full flex f flex-row items-center py-5 ">
            <span className="text-white text-xl font-pretendard">
              {menu.feat}
            </span>
            <span className={featClasses} onClick={() => onClick(menu.feat)}>
              <img src={menu.icon} />
            </span>
          </div>
        );
      })}
    </>
  );
};

const AdminMenu = () => {
  const nav = useNavigate();

  const handleButtonClick = (feat: string) => {
    switch (feat) {
      case "지도":
        nav("/admin-page/register-map");
        break;
      case "제휴업체":
        nav("/admin-page/register-affiliate");
        break;
      case "게시글 확인":
        nav("/admin-page/view-post");
        break;
    }
  };
  return (
    <div className="h-full w-full min-h-screen flex flex-col">
      <div className="flex justify-center items-center">
        <h1 className="text-main text-4xl font-cafe24">안내</h1>
      </div>
      <div className="flex flex-col mt-3 ml-7 mr-7">
        <MenuItem onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default AdminMenu;
