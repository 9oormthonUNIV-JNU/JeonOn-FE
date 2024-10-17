import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Feedback from './pages/Feedback';
import TimeCapsule from './pages/TimeCapsule';
import Guide from './pages/Guide/Guide';
import TimeTable from './pages/TimeTable';
import Booth from './pages/Booth';
import MyPage from './pages/Mypage/MyPage';
import Favorites from './pages/Mypage/Favorites';
import MyContents from './pages/Mypage/Contents';
import Affiliation from './pages/Mypage/Affiliation';
import GuideDetail from './pages/Guide/GuideDetail';
import Contents from './pages/Contents/Contents';
import ContentsDetail from './pages/Contents/ContentsDetail';
import MyBooth from './pages/Mypage/MyBooth';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    errorElement: <NotFound />,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/time-capsule',
        element: <TimeCapsule />,
      },
      {
        path: '/feedback',
        element: <Feedback />,
      },
      {
        path: '/guide',
        element: <Guide />,
      },
      {
        path: '/guide/:id',
        element: <GuideDetail />,
      },
      {
        path: '/contents',
        element: <Contents />,
      },
      {
        path: '/contents/:id',
        element: <ContentsDetail />,
      },
      {
        path: '/booth',
        element: <Booth />,
      },
      {
        path: '/time-table',
        element: <TimeTable />,
      },
      {
        path: '/my-page',
        element: <MyPage />,
      },
      {
        path: '/my-page/favorites',
        element: <Favorites />,
      },
      {
        path: '/my-page/favorites/announcement',
        element: <MyContents />,
      },
      {
        path: '/my-page/favorites/affiliate',
        element: <Affiliation />,
      },
      {
        path: '/my-page/favorites/booth',
        element: <MyBooth />,
      },
    ],
  },
]);

export default router;
