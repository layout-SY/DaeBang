import './App.css';
import SiseList from './components/SiseList';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
]);

// 임시 라우팅임
// 스타일 관련 부분은 나중에 분리 할 수도 있음
function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
