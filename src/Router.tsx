import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

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
    ],
  },
]);

export default router;
