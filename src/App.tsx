import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './AppRoutes';

// 기본적으로 모든 데이터가 캐시되도록 설정합니다
// 모든 데이터가 영원히 fresh한 것으로 간주됩니다.
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AppRoutes />
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
