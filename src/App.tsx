import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SiseList from './components/Sise/SiseList';
import MainPage from './pages/MainPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
    },
]);

// 임시 라우팅임
function App() {
    return <RouterProvider router={router} />;
}

export default App;
