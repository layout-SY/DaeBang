import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';

// staleTime Infinite는 모든 캐시가 영원히 fresh한 것으로 간주됩니다.
// gcTime Infinity는 캐시가 제거되지 않도록 설정합니다.
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity, // 1000 * 60 * 30 (30분) 으로 설정하면 30분이 지나면 캐시가 만료됩니다.
            gcTime: Infinity, // 1000 * 60 * 30 (30분) 으로 설정하면 30분마다 캐시가 제거됩니다.
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <AppRoutes />
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
