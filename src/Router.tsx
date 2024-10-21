import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Feedback from "./pages/Feedback";
import TimeCapsule from "./pages/TimeCapsule";
import Guide from "./pages/Guide/Guide";
import GuideDetail from "./pages/Guide/GuideDetail";
import TimeTable from "./pages/TimeTable";
import Booth from "./pages/Booth";
import MyPage from "./pages/Mypage/MyPage";
import Favorites from "./pages/Mypage/Favorites";
import Announcement from "./pages/Mypage/Announcement";
import Affiliation from "./pages/Mypage/Affiliation";
import RegisterAffiliate from "./pages/AdminPage/RegisterAffilate";
import RegisterMap from "./pages/AdminPage/RegisterMap";
import Contents from "./pages/Contents/Contents";
import ContentsDetail from "./pages/Contents/ContentsDetail";
import ViewFeedback from "./pages/AdminPage/ViewFeedback";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/time-capsule",
        element: <TimeCapsule />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/guide",
        element: <Guide />,
      },
      {
        path: "/guide/:id",
        element: <GuideDetail />,
      },
      {
        path: "/contents",
        element: <Contents />,
      },
      {
        path: "/contents/:id",
        element: <ContentsDetail />,
      },
      {
        path: "/booth",
        element: <Booth />,
      },
      {
        path: "/time-table",
        element: <TimeTable />,
      },
      {
        path: "/my-page",
        element: <MyPage />,
      },
      {
        path: "/my-page/favorites",
        element: <Favorites />,
      },
      {
        path: "/my-page/favorites/announcement",
        element: <Announcement />,
      },
      {
        path: "/my-page/favorites/affiliate",
        element: <Affiliation />,
      },
      {
        path: "/admin-page/register-map",
        element: <RegisterMap />,
      },
      {
        path: "/admin-page/register-affiliate",
        element: <RegisterAffiliate />,
      },
      {
        path: "/admin-page/view-feedback",
        element: <ViewFeedback />,
      },
    ],
  },
]);

export default router;
