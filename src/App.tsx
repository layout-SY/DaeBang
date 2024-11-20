import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';
import Layout from './components/Layout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            path="/:category"
                            element={
                                <p>
                                    원룸 시세 :category를 useParam으로 가져올 수
                                    있음.
                                </p>
                            }
                        />
                        <Route path="/bookmark" element={<p>북마크</p>} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
