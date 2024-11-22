import './App.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/global';
import Layout from './components/Layout';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SiseList from './components/Sise/SiseList';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/bookmark" element={<p>북마크</p>} />
                        <Route path=":category"></Route>
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
