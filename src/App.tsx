import { RouterProvider } from 'react-router-dom';
import router from './Router';
import RQProvider from './components/ReactQueryProvider';

function App() {
  return (
    <RQProvider>
      <RouterProvider router={router} />
    </RQProvider>
  );
}

export default App;
