import './App.css';
import SiseList from './components/SiseList';
import Map from './components/Map';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Map />,
    },
]);

// 임시 라우팅임
function App() {
    return <RouterProvider router={router} />;
}

export default App;
