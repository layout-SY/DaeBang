import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SiseList2 from './components/SiseList2';
import Home from './components/Home';

// 라우팅은 여기서 설정합니다.
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Layout />}>
            {/* 현재 홈페이지는 내용이 없고 바로 /onetwo로 리다이렉트 됩니다. */}
            <Route path="/" element={<Home />} />
            <Route path=":category" element={<SiseList2 />} />
            <Route
                path="/bookmark"
                element={<p style={{ width: '330px' }}>북마크</p>}
            />
        </Route>
    </Routes>
);

export default AppRoutes;
