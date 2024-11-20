import './App.css';
import Map from './components/Map';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SiseList from './components/Sise/SiseList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Map />,
    },
    {
        path: '/side/sise',
        element: <SiseList lawdCd={11110} />,
    },
]);

// 임시 라우팅임
function App() {
    return <RouterProvider router={router} />;
}

export default App;
