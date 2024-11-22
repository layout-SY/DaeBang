import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';
import Layout from './components/Layout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SiseList2 from './components/SiseList2';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path=":category" element={<SiseList2 />} />
                        <Route path="/bookmark" element={<p>북마크</p>} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
